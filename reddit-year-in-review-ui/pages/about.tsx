import React from "react";
import { Box } from "components/common";
import Layout from "components/Layout";

const About: React.FC = () => {
  return (
    <Layout page="about" footer>
      <Box style={{ maxWidth: 500 }} m={5} p={5} flexDirection="column">
        <p>
          Thanks for checking out <a href="">reddityearinreview.com</a>! This site has
          been a side project of mine for the past year, and you're seeing the (hopefully)
          finished product. What you're looking at is an aggregate of daily top posts from
          reddit throughout 2020. My goal with this site was to have an easy way to
          look-back at the year from reddit's perspective. Unfortunately, I picked a year
          that most probably never want to relive. Regardless, I hope you're able to enjoy
          looking back on the start of the decade - the memes, the tragic deaths, the
          viral videos, the movements, the election, and of course, a global pandemic.
        </p>
        <p>
          For more information on the project details you can check out the source code on{" "}
          <a href="https://github.com/claytn">Github</a> or read my blog post about the
          project <a href="https://claytn.dev/reddit-year-in-review/">here</a>.
        </p>
      </Box>
      <style jsx>{`
        p {
          font-family: Verdana, arial, helvetica;
          font-size: 12px;
          display: inline-block;
        }
      `}</style>
    </Layout>
  );
};

export default About;
