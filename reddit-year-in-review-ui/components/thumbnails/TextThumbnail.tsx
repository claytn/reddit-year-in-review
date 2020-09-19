import React from "react";
import { Flex } from "components/common";

const TextThumbnail = () => (
  <Flex alignItems="center" justifyContent="center" width="70px" height="70px">
    <div className="text-thumbnail">
      <style jsx>
        {`
          .text-thumbnail {
            background-image: url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png);
            background-position: 0px -448px;
            background-repeat: no-repeat;
            background-size: 70px 856px;
            width: 70px;
            height: 70px;
          }
        `}
      </style>
    </div>
  </Flex>
);

export default TextThumbnail;
