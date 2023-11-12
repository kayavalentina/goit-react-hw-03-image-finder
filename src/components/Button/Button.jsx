import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
