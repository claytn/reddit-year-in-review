import React from "react";
import * as R from "ramda";

interface ExpandViewProps {
  media: { [key: string]: any };
}

const ExpandView: React.FC<ExpandViewProps> = ({ media }) => {
  const redditVideo = R.prop("reddit_video", media);
  const oembed = R.prop("oembed", media);
  if (redditVideo) {
    const { fallback_url } = redditVideo;
    return (
      <iframe
        src={fallback_url}
        style={{ borderWidth: 0, paddingTop: 5, paddingBottom: 5 }}
        width={486}
        height={486}
      />
    );
  } else if (oembed) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: oembed.html }}
        style={{ paddingTop: 5, paddingBottom: 5 }}
      />
    );
  } else {
    console.error("Unknown media type: ", media);
    return <div />;
  }
};

export default ExpandView;
