import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import { saveForm } from '../../actions/forms';

import FieldEditor from '../field-editor/index';
import FieldTextEditor from '../field-editor/field-text-editor';
import ControlSection from './control-section';
import IconButton from '../core/buttons/icon-button';
import Input from '../core/input/index';
import Divider from '../core/divider';
import Text from '../core/text';
import FileUploader from '../core/file-uploader';

const ReactGridLayout = WidthProvider(GridLayout);

const layoutControls = [
  {
    id: 'table',
    name: 'Table',
    iconClass: 'arrows-alt'
  }
];

const formControls = [
  {
    id: 'input',
    name: 'Input',
    iconClass: 'arrows-alt'
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    iconClass: 'arrows-alt'
  },
  {
    id: 'fileUploader',
    name: 'File Uploader',
    iconClass: 'arrows-alt'
  },
  {
    id: 'text',
    name: 'Text',
    iconClass: 'arrows-alt'
  },
  {
    id: 'divider',
    name: 'Divider',
    iconClass: 'arrows-alt'
  }
];

const Container = styled.div`
  position; relative;
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  background-color: #027aff;
  padding: 2rem;
`;

const GridContainer = styled.div`
  flex: 1;
  padding: 2.5rem;
`;

const StyledButtonContainer = styled.div`
  margin: 0 auto;
  width: 120px;
`;

const StyledFieldEditorContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 4px #d5d5d5;
`;

const Fields = {
  input: Input,
  divider: Divider,
  fileUploader: FileUploader,
  checkbox: null,
  text: Text,
  table: null
};

const FieldEditors = {
  input: FieldEditor,
  fileUploader: FieldEditor,
  text: FieldTextEditor,
  checkbox: null,
  table: null
};

const resizableFieldTypes = ['input'];
const updatableFieldTypes = ['text'];

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFieldType: null,
      formElements: {},
      dragging: false,
      id: 'form-' + Date.now(),
      fieldEditor: {
        shouldShow: false,
        fieldType: null,
        fieldId: null
      }
    }
  }

  dragImageRef = null;

  onDragControl = (e, id) => {
    const dragImage = e.target.cloneNode(true);

    dragImage.style.borderColor = 'black';
    dragImage.style.color = 'black';
    dragImage.style.width = '200px';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-2000px';
    
    this.dragImageRef = dragImage;
    
    document.body.appendChild(dragImage);

    // For firefox
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    this.setState({
      currentFieldType: id,
      dragging: true
    });
  }

  onDrop = (e) => {
    const { id: formId, dragging, currentFieldType, formElements } = this.state;
    if (dragging) {
      if(this.dragImageRef) {

        // Remove the drag image once field is dropped
        document.body.removeChild(this.dragImageRef);
        this.dragImageRef = null;
      }

      const fieldData = {
        id: formId + '-field-' + currentFieldType + '-' + Date.now(),
        type: currentFieldType,
        name: currentFieldType + Date.now(),
        label: currentFieldType
      };

      if (currentFieldType === 'text') {
        fieldData.text = 'This is some random text. Please edit it through the editor';
      }
  
      this.setState({
        formElements: {...formElements, [fieldData.id]: fieldData},
        currentFieldType: null,
        dragging: false
      });
    }
  }

  onLayoutChange = layouts => {
    const formElements = {...this.state.formElements};
    layouts.forEach(l => {
      formElements[l.i].layout = l;
    });

    this.setState({ formElements });
  }

  onDeleteFormElement = id => {
    const formElements = {...this.state.formElements};

    delete formElements[id];

    this.setState({ formElements });
  }

  onClickEditField = (id, type) => {
    this.setState({
      fieldEditor: {
        shouldShow: true,
        fieldId: id,
        fieldType: type
      }
    });
  }

  onCloseFieldEditor = () => {
    this.setState({
      fieldEditor: {
        shouldShow: false,
        fieldId: null,
        fieldType: null
      }
    });
  }

  onSaveFieldEditor = data => {
    const { fieldEditor, formElements } = this.state;
    const { fieldId } = fieldEditor;
    const fieldData = formElements[fieldId];
    
    this.setState({
      formElements: {
        ...formElements,
        [fieldId]: {
          ...fieldData,
          ...data
        }
      }
    }, this.onCloseFieldEditor);
  }

  onCancelFieldEditor = () => {
    this.onCloseFieldEditor();
  }

  onSaveForm = () => {
    const {id, formElements} = this.state;

    this.props.saveForm({
      id,
      fields: formElements
    });
  }

  getFormElements = () => {
    const formElements = Object.values(this.state.formElements).reduce((allFields, formElement) => {
      const {
        id: currentFieldId,
        type: currentFieldType,
        name,
        label,
        text
      } = formElement;
      const fieldData = {
        name,
        label,
        text
      };
      const Field = Fields[currentFieldType];

      if (!!Field) {
        // Initial layout of the field
        const fieldLayoutProperties = {
          x: 0,
          y: Infinity,
          w: 12,
          h: 2
        };

        // check if the field is resizable
        if (!resizableFieldTypes.includes(currentFieldType)) {
          fieldLayoutProperties.isResizable = false;
        }
        
        allFields.push(
          <div
            key={currentFieldId}
            data-grid={fieldLayoutProperties}
          >
            <Field
              configurable
              id={currentFieldId}
              data={updatableFieldTypes.includes(currentFieldType) && fieldData}
              onDeleteField={() => this.onDeleteFormElement(currentFieldId)}
              onEditField={() => this.onClickEditField(currentFieldId, currentFieldType)}
            />
          </div>
        );
      }

      return allFields;
    }, []);

    return formElements;
  }

  getFieldEditor = () => {
    const { shouldShow, fieldType, fieldId } = this.state.fieldEditor;

    if (shouldShow) {
      const formField = this.state.formElements[fieldId];
      const { name, label, text } = formField;
      const fieldData = {
        name,
        label,
        text
      };
      const FormFieldEditor = FieldEditors[fieldType];

      return shouldShow && (
        <StyledFieldEditorContainer>
          <FormFieldEditor
            title={fieldType}
            fieldData={fieldData}
            onSave={this.onSaveFieldEditor}
            onCancel={this.onCancelFieldEditor}
          />
        </StyledFieldEditorContainer>
      );
    }

    return null;
  }

  render() {
    return (
      <Container>
        <Sidebar>
          <IconButton shape="rounded" color="#027aff" backgroundColor="#ffffff" iconClass="sync">
            Validate
          </IconButton>
          <ControlSection name="Cell layout" controls={layoutControls} onDragStart={this.onDragControl} />
          <ControlSection name="Form components" controls={formControls} onDragStart={this.onDragControl} />
        </Sidebar>
        <GridContainer>
          <ReactGridLayout
            className="layout"
            autoSize={false}
            margin={[8, 32]}
            cols={12}
            rowHeight={30}
            isDraggable={true}
            isDroppable={true}
            onDrop={this.onDrop}
            onLayoutChange={this.onLayoutChange}
            draggableHandle='.fa-arrows-alt'
          >
            {this.getFormElements()}
          </ReactGridLayout>
          <StyledButtonContainer>
            <IconButton
              visualType="primary"
              iconClass="save"
              shape="rounded"
              onClick={this.onSaveForm}
            >
              Save
            </IconButton>
          </StyledButtonContainer>
        </GridContainer>
        {this.getFieldEditor()}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  saveForm
};

export default connect(null, mapDispatchToProps)(CreateForm);
