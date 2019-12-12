const R = require("ramda");
const aws = require("aws-sdk");
const snoowrap = require("snoowrap");
const { format } = require("date-fns");

aws.config.update({
  region: "us-east-2",
  accessKeyId: "AKIAIGN4Z4UA6UN6KLJQ",
  secretAccessKey: "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"
});

const r = new snoowrap({
  userAgent: "/u/bletchley-park",
  clientId: "YODM9LPkHuGXYw",
  clientSecret: "93tH3ZP2kEwDMXtwsJc12y1IBF4",
  username: "bletchley-park",
  password: "PrWVWVE35*a3a0C0zBP^A1Y9LT*Aum@6"
});

const db = new aws.DynamoDB({ apiVersion: "2012-08-10" });

const getPopularSubreddits = () =>
  r.getPopularSubreddits({ limit: 5 }).then(subreddits => ({ subreddits }));

const getTopPosts = () => {
  const mergeRightToLeft = (post, comments) => ({ ...post, comments });

  return r.getTop("all", { time: "day", limit: 3 }).then(postData => {
    const posts = postData.map(post => ({ ...post, _r: undefined }));
    return Promise.all(
      posts.map(post => post.comments.fetchMore({ amount: 5 }))
    )
      .then(postCommentSection =>
        postCommentSection.map(comments =>
          comments.map(comment => ({
            ...comment,
            _r: undefined,
            replies: undefined
          }))
        )
      )
      .then(comments => R.zipWith(mergeRightToLeft, posts, comments));
  });
};

const updateDynamo = callback => ([topPosts, trendingSubreddits]) => {
  db.putItem(
    {
      TableName: "RedditYearInReview",
      Item: {
        Date: { S: format(Date.now(), "yyyy-MM-dd HH:mm") },
        TopPosts: { S: JSON.stringify(topPosts) },
        TrendingSubreddits: {
          S: JSON.stringify(trendingSubreddits)
        }
      }
    },
    (err, data) => {
      if (err) {
        console.error("Error putting item into dynamodb failed: " + err);
        callback(err, null);
      } else {
        console.log("Success putting item into dynamodb");
        callback(null, data);
      }
    }
  );
};

exports.handler = (event, context, callback) => {
  Promise.all([getTopPosts(), getPopularSubreddits()])
    .then(updateDynamo(callback))
    .catch(err => {
      console.error("Error in fetching reddit data " + err);
      callback(err);
    });
};
