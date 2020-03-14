import React, { Component } from 'react';
import styled from 'styled-components';

import FieldEditor from './index';

const StyledTextAreaContainer = styled.div`
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 48px;
  border: 1px solid #d5d5d5;
  border-radius: 0.25rem;
`;

class FieldTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.fieldData.name,
      label: props.fieldData.label,
      text: props.fieldData.text
    }
  }

  onChangeInput = (value, inputName) => {
    this.setState({
      [inputName]: value
    });
  }

  onSave = () => {
    this.props.onSave(this.state);
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { title, fieldData, staticField } = this.props;

    return (
      <FieldEditor
        staticField={staticField}
        title={title}
        fieldData={fieldData}
        onChangeInput={this.onChangeInput}
        onSave={this.onSave}
        onCancel={this.onCancel}
      >
        <StyledTextAreaContainer>
          <div>Text</div>
          <StyledTextArea value={this.state.text} onChange={e => this.onChangeInput(e.target.value, 'text')}></StyledTextArea>
        </StyledTextAreaContainer>
      </FieldEditor>
    );
  }
}

export default FieldTextEditor;