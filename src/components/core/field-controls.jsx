import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

const controls = [
  {
    id: 'drag',
    name: 'arrows-alt'
  },
  {
    id: 'copy',
    name: 'copy'
  },
  {
    id: 'edit',
    name: 'edit'
  },
  {
    id: 'delete',
    name: 'trash-alt'
  }
];

const StyledControlContainer = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.75em;
  padding: 0.25rem;
  cursor: pointer;
`;

const StyledFieldControl = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 0.5rem;
  background-color: #d5d5d5;
`;

const FieldControls = (props) => {
  const onClickHandlers = {
    delete: props.onDelete,
    edit: props.onEdit
  };

  return (
    <StyledFieldControl>
      {controls.map(ctrl => (
        <StyledControlContainer
          key={ctrl.name}
          onClick={onClickHandlers[ctrl.id] ? onClickHandlers[ctrl.id] :  () => {}}
        >
          <i className={'fas fa-' + ctrl.name} />
        </StyledControlContainer>
      ))}
    </StyledFieldControl>
  );
}

FieldControls.propTypes = {
  onDelete: func,
  onEdit: func
};

export default FieldControls;