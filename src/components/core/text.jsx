import React from 'react';
import styled from 'styled-components';

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
  border: 1px dashed #d5d5d5;
`;

const Text = (props) => (
  <>
    {props.configurable && <StyledLabel>Text</StyledLabel>}
    <StyledTextContainer>
      {props.data.text}
      {props.configurable && (
        <StyledFieldControlsContainer>
          <FieldControls onEdit={props.onEditField} onDelete={props.onDeleteField} />
        </StyledFieldControlsContainer>
      )}
    </StyledTextContainer>
  </>
);

export default Text;