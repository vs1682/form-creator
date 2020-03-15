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

const FieldControls = ({ onCopy, onDelete, onEdit }) => {
  const onClickHandlers = {
    copy: onCopy,
    delete: onDelete,
    edit: onEdit
  };

  return (
    <StyledFieldControl>
      {controls.map(ctrl => {
        const shouldShowControl = !!onClickHandlers[ctrl.id] || ctrl.id === 'drag';
        return shouldShowControl ? (
          <StyledControlContainer
            key={ctrl.name}
            onClick={onClickHandlers[ctrl.id]}
          >
            <i className={'fas fa-' + ctrl.name} />
          </StyledControlContainer>
        )
        : null;
      })}
    </StyledFieldControl>
  );
}

FieldControls.propTypes = {
  onCopy: func,
  onDelete: func,
  onEdit: func
};

export default FieldControls;