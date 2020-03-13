import React from 'react';
import styled from 'styled-components';
import IconButton from '../core/buttons/icon-button';

const SectionHeader = styled.div`
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const StyledControlSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const StyledControlContainer = styled.div`
  margin: 1em 0;
`;

const ControlSection = ({name, controls, onDragStart}) => (
  <StyledControlSection>
    <SectionHeader>{name}</SectionHeader>
    {controls.map(({id, name: ctrlName, ...restProps}) => (
      <StyledControlContainer key={id}>
        <IconButton
          id={id}
          shape="rounded"
          visualType="outlined"
          color="#ffffff"
          draggable={true}
          unselectable="on"
          onDragStart={e => onDragStart(e, id)}
          {...restProps}
        >
          {ctrlName}
        </IconButton>
      </StyledControlContainer>
    ))}
  </StyledControlSection>
);

export default ControlSection;