import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';

import Button from './button';

const Icon = styled.i`
  margin-right: 0.5rem;
  color: ${props => props.color}
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const IconButton = ({
  iconClass,
  color,
  children,
  ...restProps
}) => (
  <StyledButton color={color} {...restProps}>
    <Icon className={'fas fa-' + iconClass} color={color} />
    {children}
  </StyledButton>
);

IconButton.propTypes = {
  children: node.isRequired,
  color: string,
  iconClass: string.isRequired
};

export default IconButton;