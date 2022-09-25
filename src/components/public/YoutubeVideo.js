import React from 'react';
import YouTube from 'react-youtube';

export default function YoutubeVideo() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (<YouTube videoId="mMiZ0iTu2dU" opts={opts}/>);
}
