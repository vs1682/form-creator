import React, { Component } from 'react';
import styled from 'styled-components';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import ControlSection from './control-section';
import IconButton from '../core/buttons/icon-button';
import Input from '../core/input/index';
import Divider from '../core/divider';
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

const Fields = {
  input: Input,
  divider: Divider,
  fileUploader: FileUploader,
  checkbox: null,
  text: null,
  table: null
};

const resizableFieldIds = ['input'];

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemId: null,
      formElements: [],
      layout: [],
      dragging: false
    }
  }

  dragImageRef = null;

  onDragControl = (e, id) => {
    const dragImage = e.target.cloneNode(true);
    // For firefox
    e.dataTransfer.setData('text/plain', '');
    dragImage.style.borderColor = 'black';
    dragImage.style.color = 'black';
    dragImage.style.width = '200px';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-2000px';
    this.dragImageRef = dragImage;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    this.setState({
      currentItemId: id,
      dragging: true
    });
  }

  onDrop = (e) => {
    console.log(e);
    if (this.state.dragging) {
      if(this.dragImageRef) {
        document.body.removeChild(this.dragImageRef);
        this.dragImageRef = null;
      }
  
      this.setState({
        formElements: [...this.state.formElements, this.state.currentItemId],
        currentItemId: null,
        dragging: false
      });
    }
  }

  onLayoutChange = layout => {
    this.setState({ layout: layout });
  }

  onDeleteFormElement = id => {
    console.log(id);
    const formElements = this.state.formElements.filter(e => e !== id);

    this.setState({formElements});
  }

  getFormElements = () => {
    const formElements = this.state.formElements.reduce((allFields, currentFieldId, i) => {
      const Field = Fields[currentFieldId];

      if (!!Field) {
        const fieldLayoutProperties = {
          x: 0,
          y: Infinity,
          w: 12,
          h: 2
        };

        if (!resizableFieldIds.includes(currentFieldId)) {
          fieldLayoutProperties.isResizable = false;
        }
        
        allFields.push(
          <div
            key={currentFieldId+i}
            data-grid={fieldLayoutProperties}
          >
            <Field
              id={currentFieldId+i}
              configurable
              onDeleteField={() => this.onDeleteFormElement(currentFieldId)}
            />
          </div>
        );
      }

      return allFields;
    }, []);

    return formElements;
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
        </GridContainer>
      </Container>
    );
  }
}

export default CreateForm;
