import ReactPlayer from 'react-player/youtube';
import React from 'react';
import PropTypes from 'prop-types';

const EmbedVideo = (props) => {
  return (
    <ReactPlayer url={props.url} controls={true} />
  );
};

export default EmbedVideo;

EmbedVideo.propTypes = {
  url: PropTypes.string,
};
