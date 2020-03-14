import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';

import FieldControls from './field-controls';

const StyledFieldControlsContainer = styled.div`
  position: absolute;
  top: -16px;
  right: -4px;
`;

const StyledLabel = styled.label`
  font-size: 0.75em;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledDividerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: ${props => props.configurable ? '1px dashed #d5d5d5' : 'none'};
`;

const StyledDivider = styled.div`
  width: 100%;
  border-top: 1px solid #d5d5d5;
`;

const Divider = ({ configurable, onDeleteField }) => (
  <>
    {configurable && <StyledLabel>Divider</StyledLabel>}
    <StyledDividerContainer configurable={configurable}>
      <StyledDivider />
      {configurable && (
        <StyledFieldControlsContainer>
          <FieldControls onDelete={onDeleteField} />
        </StyledFieldControlsContainer>
      )}
    </StyledDividerContainer>
  </>
);

Divider.propTypes = {
  configurable: bool,
  onDeleteField: func
};

export default Divider;