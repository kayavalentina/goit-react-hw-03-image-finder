import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { MdClose } from 'react-icons/md';
import { Overlay, Wrapper, Image, CloseButton } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKeydown);
  }

  handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  handleEscKeydown = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url, onClose } = this.props;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Wrapper>
          <CloseButton type="button" onClick={onClose}>
            <IconContext.Provider value={{ size: '2em' }}>
              <MdClose />
            </IconContext.Provider>
          </CloseButton>
          <Image src={url} alt="" />
        </Wrapper>
      </Overlay>,
      ModalRoot
    );
  }
}