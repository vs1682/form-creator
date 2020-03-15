import React from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';

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
  border: ${props => props.configurable ? '1px dashed #d5d5d5' : 'none'};
`;

const FileUploader = ({
  configurable,
  label,
  onChange,
  onCopyField,
  onDeleteField,
  onEditField,
  value
}) => {
  const uploaderLabel = configurable
  ? 'File Uploader'
  : label;

  return (
    <>
      {uploaderLabel && <StyledLabel>{uploaderLabel}</StyledLabel>}
      <StyledFileContainer configurable={configurable}>
        <input type="file" value={value} onChange={onChange} disabled={configurable} />
        {configurable && (
          <StyledFieldControlsContainer>
            <FieldControls onCopy={onCopyField} onEdit={onEditField} onDelete={onDeleteField} />
          </StyledFieldControlsContainer>
        )}
      </StyledFileContainer>
    </>
  );
}

FileUploader.propTypes = {
  configurable: bool,
  label: string,
  onCopyField: func,
  onDeleteField: func,
  onEditField: func,
  value: string
};

export default FileUploader;