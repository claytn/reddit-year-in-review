import React from "react";
import * as R from "ramda";

import { Image } from "components/common";

type MediaType = "URL_IMAGE" | "MEDIA_EMBED";

interface ExpandViewProps {
  type: MediaType;
  media?: { [key: string]: any };
  url?: string;
}

const ExpandedView: React.FC<ExpandViewProps> = ({ type, media, url }) => {
  if (type === "URL_IMAGE") {
    return (
      <>
        <Image src={url} className="expanded-image" />
        <style jsx global>
          {`
            .expanded-image {
              max-height: 700px;
              max-width: 500px;
            }
            @media (max-width: 768px) {
              .expanded-image {
                max-height: 600px;
                max-width: 400px;
              }
            }
          `}
        </style>
      </>
    );
  } else if (type === "MEDIA_EMBED") {
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
    }
  } else {
    console.error("Unknown media type: ", media);
    return <div />;
  }
};

export default ExpandedView;
