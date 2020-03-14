import styled from 'styled-components';
import { string } from 'prop-types';

const BACKGROUND_COLORS = {
  default: '#d5d5d5',
  primary: '#027aff',
  transparent: 'transparent'
};

const VISUAL_TYPES = {
  PRIMARY: 'primary',
  OUTLINED: 'outlined'
};

const SHAPES = {
  ROUNDED: 'rounded',
  RECTANGULAR: 'rectangular'
};

const getBackgroundColor = (props) => {
  if (props.backgroundColor) {
    return props.backgroundColor;
  }

  switch(props.visualType) {
    case VISUAL_TYPES.PRIMARY: return BACKGROUND_COLORS.primary;
    case VISUAL_TYPES.OUTLINED: return BACKGROUND_COLORS.transparent;
    default: return BACKGROUND_COLORS.default;
  }
}

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  height: 2rem;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border: ${props => props.visualType === VISUAL_TYPES.OUTLINED ? '1px dashed ' + props.color : 'none'};
  border-radius: ${props => props.shape === SHAPES.ROUNDED ? '1rem' : '0.125rem'};
  background-color: ${getBackgroundColor};
  color: ${props => props.color ? props.color : '#ffffff'};
`;

Button.propTypes = {
  backgroundColor: string,
  color: string,
  shape: string,
  visualType: string
};

export default Button;