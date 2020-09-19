import React from "react";
import { Flex } from "components/common";

interface Props {
  style?: object;
  onClick?: (...xs: any[]) => void;
}

const MediaExpand: React.FC<Props> = ({ style, onClick }) => (
  <Flex alignItems="center" justifyContent="center" style={style} onClick={onClick}>
    <div className="media-expand">
      <style jsx>
        {`
          .media-expand {
            background-image: url(https://www.redditstatic.com/sprite-expando.69EqpDZz3HM.png);
            background-position: 0px -491px;
            background-repeat: no-repeat;
            width: 23px;
            height: 23px;
          }
        `}
      </style>
    </div>
  </Flex>
);

export default MediaExpand;
