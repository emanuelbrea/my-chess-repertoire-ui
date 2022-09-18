import {Fade, Modal} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


export default function ImageModal({open, handleClose, image}) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open} timeout={500}>
          <img src={image} style={{maxHeight: '90%', maxWidth: '90%', border: '2px solid #769656'}}/>
        </Fade>
      </Modal>
    </>
  );
}

ImageModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  image: PropTypes.string,
};
