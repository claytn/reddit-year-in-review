import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { range } from "ramda";

import Layout from "components/Layout";
import { Flex } from "components/common";
import TopPosts from "components/TopPosts";

const validMonth = (x: number) => {
  if (x === NaN) {
    return false;
  }
  return x >= 1 && x <= 12;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const months = range(1, 13);

  const paths = months.map(month => ({
    params: { month: month.toString() },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const monthParam = parseInt(params.month as string);
  const month = validMonth(monthParam) ? monthParam : 1;
  try {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/TopPosts/${month.toLocaleString(
        "en-US",
        {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }
      )}-2020`
    );

    const posts = await res.json();

    return { props: { posts } };
  } catch (err) {
    return { props: { posts: [] } };
  }
};

const MonthPreviews: React.FC<{ posts: any[] }> = ({ posts }) => (
  <Layout page={"top"} footer>
    <Flex p={5} paddingRight={"10%"}>
      <TopPosts posts={posts} />
    </Flex>
  </Layout>
);

export default MonthPreviews;
