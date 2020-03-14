import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import { saveForm } from '../../actions/forms';

import IconButton from '../core/buttons/icon-button';
import Input from '../core/input/index';
import Divider from '../core/divider';
import FileUploader from '../core/file-uploader';

const ReactGridLayout = WidthProvider(GridLayout);

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

const StyledButtonContainer = styled.div`
  margin: 0 auto;
  width: 120px;
`;

const Fields = {
  input: Input,
  divider: Divider,
  fileUploader: FileUploader,
  checkbox: null,
  text: null,
  table: null
};

class PreviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  onSaveForm = () => {
    const {id, layout} = this.state;

    this.props.saveForm({
      id,
      layout
    });
  }

  getFormElements = () => {
    const formElements = Object.values(this.props.fields).reduce((allFields, field) => {
      const {
        id: currentFieldId,
        type: currentFieldType,
        name,
        label,
        text
      } = field;
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
          h: 2,
          static: true
        };
        
        allFields.push(
          <div
            key={currentFieldId}
            data-grid={fieldLayoutProperties}
          >
            <Field
              id={currentFieldId}
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
        <GridContainer>
          <ReactGridLayout
            className="layout"
            autoSize={false}
            margin={[8, 32]}
            cols={12}
            rowHeight={30}
          >
            {this.getFormElements()}
          </ReactGridLayout>
          <StyledButtonContainer>
            <IconButton
              visualType="primary"
              iconClass="save"
              onClick={this.onSaveForm}
            >
              Save
            </IconButton>
          </StyledButtonContainer>
        </GridContainer>
        <Sidebar>
        </Sidebar>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: state[ownProps.formId]
  };
};

const mapDispatchToProps = {
  saveForm
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm);
