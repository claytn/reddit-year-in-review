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

const s3 = new aws.S3();

const putRedditData = (type, content) => {
  const time = new Date(Date.now());
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: "reddit-year-in-review",
      Key: `${format(time, "yyyy-MM-d")}/${type}/${format(time, "yyyy-MM-d:k")}.json`,
      Body: JSON.stringify(content),
      ContentType: "application/json"
    }, (err, data) => {
      if (err) {
        console.error(`Error uploading ${type} to s3: ${err}`);
        reject(err);
      } else {
        console.log(`Success uploading ${type} to s3`);
        resolve(data);
      }
    })
  })
}

exports.handler = (event, context, callback) => {
  const r = new snoowrap({
    userAgent: "firefoxchromesafariie",
    clientId: process.env.REDDIT_CLIENT_ID,
    username: process.env.REDDIT_USERNAME,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    password: process.env.REDDIT_PASSWORD
  });

  Promise.all([getTopPosts(r), getPopularSubreddits(r)])
    .then(([topPosts, trendingSubreddits]) => { 
      return Promise.all([
        putRedditData('TopPosts', topPosts),
        putRedditData('TrendingSubreddits', trendingSubreddits) 
      ])
    })
    .catch(err => {
      console.error("Error in fetching and uploading reddit data " + err);
      callback(err);
    });
};
