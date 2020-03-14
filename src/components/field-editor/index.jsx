import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../core/input';
import Button from '../core/buttons/button';


const StyledFieldEditorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;

const StyledHeader = styled.h4`
  margin-top: 0;
`;

const StyledSettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledSingleSettingContainer = styled.div`
  width: 40%;
`;

const StyledInputContainer = styled.div`
  margin-top: 0.5rem;
  height: 32px;
`;

const StyledBtnControlContainers = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

class FieldEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.fieldData.name,
      label: props.fieldData.label
    }
  }

  onChangeInput = (value, inputName) => {
    this.setState({
      [inputName]: value
    }, () => {
      this.props.onChangeInput && this.props.onChangeInput(value, inputName);
    });
  }

  onSave = () => {
    this.props.onSave(this.state);
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { name, label } = this.state;
    const { children, staticField, title } = this.props;

    return (
      <StyledFieldEditorContainer>
        <StyledHeader>{title}</StyledHeader>
        <StyledSettingsContainer>
        {!staticField && (
          <>
            <StyledSingleSettingContainer>
              <div>Name</div>
              <StyledInputContainer>
                <Input value={name} onChange={e => this.onChangeInput(e.target.value, 'name')} />
              </StyledInputContainer>
            </StyledSingleSettingContainer>
            <StyledSingleSettingContainer>
              <div>Label</div>
              <StyledInputContainer>
              <Input value={label} onChange={e => this.onChangeInput(e.target.value, 'label')} />
              </StyledInputContainer>
            </StyledSingleSettingContainer>
          </>
        )}
          {children}
        </StyledSettingsContainer>
        <StyledBtnControlContainers>
          <Button onClick={this.onCancel} >Cancel</Button>
          <Button onClick={this.onSave} visualType="primary">Save</Button>
        </StyledBtnControlContainers>
      </StyledFieldEditorContainer>
    );
  }
}

export default FieldEditor;