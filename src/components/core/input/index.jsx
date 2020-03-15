import React from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';

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
  const {
    configurable,
    label,
    onChange,
    onCopyField,
    onDeleteField,
    onEditField,
    value
  } = props;

  const inputLabel = configurable
    ? 'Input'
    : label;

  return (
    <>
      {inputLabel && <StyledLabel>{inputLabel}</StyledLabel>}
      <StyledInputContainer>
        <StyledInput value={value} disabled={configurable} onChange={onChange} />
        {configurable && (
          <StyledFieldControlsContainer>
            <FieldControls onCopy={onCopyField} onEdit={onEditField} onDelete={onDeleteField} />
          </StyledFieldControlsContainer>
        )}
      </StyledInputContainer>
    </>
  );
}

Input.propTypes = {
  configurable: bool,
  label: string,
  onChange: func,
  onCopyField: func,
  onDeleteField: func,
  onEditField: func,
  value: string
};

export default Input;