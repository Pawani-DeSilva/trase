import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import cx from 'classnames';

import 'styles/components/shared/simple-modal.scss';

function SimpleModal(props) {
  return (
    <ReactModal
      {...props}
      className={cx('c-simple-modal', props.className)}
      overlayClassName="c-simple-modal-overlay"
      ariaHideApp={false}
    />
  );
}

SimpleModal.propTypes = {
  className: PropTypes.string
};

export default SimpleModal;
