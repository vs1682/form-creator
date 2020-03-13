import React from 'react';
import styled from 'styled-components';

import FieldControls from './field-controls';

const StyledFieldControlsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: -4px;
`;

const StyledLabel = styled.label`
  font-size: 0.75em;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledFileContainer = styled.div`
  width: 100%;
  border: 1px dashed #d5d5d5;
`;

const onChange = e => {
  console.log(e);
}

const Divider = (props) => (
  <>
    {props.configurable && <StyledLabel>File Uploader</StyledLabel>}
    <StyledFileContainer>
      <input type="file" onChange={onChange} disabled={props.configurable} />
      {props.configurable && (
        <StyledFieldControlsContainer>
          <FieldControls onDelete={props.onDeleteField} />
        </StyledFieldControlsContainer>
      )}
    </StyledFileContainer>
  </>
);

export default Divider;