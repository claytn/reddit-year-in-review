/** import environment variables to process.env */
require("dotenv").config();

const R = require("ramda");
const aws = require("aws-sdk");
const snoowrap = require("snoowrap");
const { format } = require("date-fns");

aws.config.update({
  region: "us-east-2",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const db = new aws.DynamoDB({ apiVersion: "2012-08-10" });

const getPopularSubreddits = r =>
  r.getPopularSubreddits({ limit: 5 }).then(subreddits => ({ subreddits }));

const getTopPosts = r => {
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
  const r = new snoowrap({
    userAgent: "firefoxchromesafariie",
    clientId: process.env.REDDIT_CLIENT_ID,
    username: process.env.REDDIT_USERNAME,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    password: process.env.REDDIT_PASSWORD
  });

  Promise.all([getTopPosts(r), getPopularSubreddits(r)])
    .then(updateDynamo(callback))
    .catch(err => {
      console.error("Error in fetching reddit data " + err);
      callback(err);
    });
};
