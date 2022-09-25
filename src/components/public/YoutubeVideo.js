import React from 'react';
import YouTube from 'react-youtube';

export default function YoutubeVideo() {
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (<YouTube videoId="mMiZ0iTu2dU" opts={opts}
    style={{display: 'flex', justifyContent: 'center', marginTop: 40}}
  />);
}
