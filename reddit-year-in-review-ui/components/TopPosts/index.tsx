import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Box, Text } from "components/common";
import PostPreview from "./PostPreview";
import { getOrdinalNum } from "utils";
import { IPostPreviewBlock } from "types";

const SingleDayPreviews: React.FC<IPostPreviewBlock> = ({ date, previews }) => {
  /*
    JS Date object is extremely screwed up. Need to replace dashes so it parses date using
    correct time-zone. This hack works, but fix if you have time.
  */
  const d = new Date(`${date}T00:00:00`.replace(/-/g, "/").replace(/T.+/, ""));
  const dayOfMonth = d.getDate();
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const formattedDate = `${month} ${getOrdinalNum(dayOfMonth)}`;

  if (previews.length === 0) {
    return null;
  }

  return (
    <Flex flexDirection="column" mb={8}>
      <Flex my={8}>
        <Text
          borderStyle="solid"
          borderColor="#ff4500"
          borderTop={0}
          borderBottom={0}
          color="#888"
          fontSize={10}
          fontWeight="bold"
          marginLeft={5}
          marginBottom={8}
          px={4}
        >
          {formattedDate}
        </Text>
      </Flex>
      {previews.map(post => (
        <PostPreview {...post} key={post.id} />
      ))}
    </Flex>
  );
};

const TopPosts: React.FC<{ posts: IPostPreviewBlock[] }> = ({ posts, ...props }) => {
  const router = useRouter();
  const { month = "1" } = router.query;
  const monthInt = parseInt(month as string);
  const lastPage = monthInt === 12;

  const navigationButtonStyles = {
    padding: "1px 4px",
    background: "#eee",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    borderRadius: 3,
    fontWeight: 800,
    textDecoration: "none",
    fontFamily: "Verdana,arial,helvetica,sans-serif",
    color: "#369",
    fontSize: 12,
  };

  return (
    <Flex flexDirection="column" {...props}>
      {posts.map(({ date, previews }) => (
        <SingleDayPreviews date={date} previews={previews} key={date} />
      ))}
      {!lastPage && (
        <Flex alignItems="center">
          <Text color="gray" fontSize={12} px={4}>
            view more:{" "}
          </Text>
          <Box>
            {monthInt > 1 && (
              <>
                <Link href={`/month/${monthInt - 1}`}>
                  <a style={navigationButtonStyles}>‹ prev</a>
                </Link>
                <span
                  style={{
                    marginLeft: 7,
                    marginRight: 7,
                    borderLeftWidth: 1,
                    borderLeftColor: "#cccccc",
                    borderLeftStyle: "solid",
                  }}
                />
              </>
            )}
            <Link href={`/month/${monthInt + 1}`}>
              <a style={navigationButtonStyles}>next ›</a>
            </Link>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default TopPosts;
