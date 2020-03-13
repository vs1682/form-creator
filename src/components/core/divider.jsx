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

const StyledDividerContainer = styled.div`
  width: 100%;
  border-top: 1px solid #d5d5d5;
`;

const Divider = (props) => (
  <>
    {props.configurable && <StyledLabel>Divider</StyledLabel>}
    <StyledDividerContainer>
      {props.configurable && (
        <StyledFieldControlsContainer>
          <FieldControls onDelete={props.onDeleteField} />
        </StyledFieldControlsContainer>
      )}
    </StyledDividerContainer>
  </>
);

export default Divider;