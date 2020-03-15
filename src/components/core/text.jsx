import React from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';

import FieldControls from './field-controls';

const StyledFieldControlsContainer = styled.div`
  position: absolute;
  top: 4px;
  right: -4px;
`;

const StyledLabel = styled.label`
  font-size: 0.75em;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledTextContainer = styled.div`
  width: 100%;
  border: ${props => props.configurable ? '1px dashed #d5d5d5' : 'none'};
`;

const Text = ({
  configurable,
  text,
  onCopyField,
  onEditField,
  onDeleteField
}) => (
  <>
    {configurable && <StyledLabel>Text</StyledLabel>}
    <StyledTextContainer configurable={configurable}>
      {text}
      {configurable && (
        <StyledFieldControlsContainer>
          <FieldControls onCopy={onCopyField} onEdit={onEditField} onDelete={onDeleteField} />
        </StyledFieldControlsContainer>
      )}
    </StyledTextContainer>
  </>
);

Text.propTypes = {
  configurable: bool,
  text: string.isRequired,
  onDeleteField: func
};

export default Text;