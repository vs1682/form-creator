import React from 'react';
import styled from 'styled-components';

import FieldControls from '../field-controls';

const StyledInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

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

const Input = (props) => {
  return (
    <>
      {props.configurable && <StyledLabel>Input</StyledLabel>}
      <StyledInputContainer>
        <StyledInput value={props.value} disabled={props.configurable} onChange={props.onChange} />
        {props.configurable && (
          <StyledFieldControlsContainer>
            <FieldControls onEdit={props.onEditField} onDelete={props.onDeleteField} />
          </StyledFieldControlsContainer>
        )}
      </StyledInputContainer>
    </>
  );
}

export default Input;