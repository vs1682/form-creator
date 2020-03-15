import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import { number, shape, string, func } from 'prop-types';

import { changePage } from '../../actions/page';

import IconButton from '../core/buttons/icon-button';
import Input from '../core/input/index';
import Divider from '../core/divider';
import FileUploader from '../core/file-uploader';
import Text from '../core/text';

const ReactGridLayout = WidthProvider(GridLayout);

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 2rem;
`;

const StyledDataBox = styled.pre`
  width: 100%;
  height: 40%;
  border: 1px solid black;
  border-radius: 4px;
  overflow: auto;
`;

const GridContainer = styled.div`
  flex: 1;
  padding: 2.5rem;
  border-right: 1px solid black;
`;

const StyledFieldContainer = styled.div``;
const StyledFieldCenteredContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 400px;
`;

const Fields = {
  input: Input,
  divider: Divider,
  fileUploader: FileUploader,
  checkbox: null,
  text: Text,
  table: null
};

const nonCenteredContentFields = ['text'];

class PreviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.form.fields,
      shouldSubmit: false
    }
  }

  onChangeFieldValue = (id, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [id]: {
          ...this.state.fields[id],
          value
        }
      }
    });
  }

  onSubmitForm = () => {
    this.setState({ shouldSubmit: true });
  }

  goToFormList = () => {
    this.props.changePage('list');
  }

  getSubmitData = () => {
    const { fields, shouldSubmit } = this.state;

    if (shouldSubmit) {
      let preFormattedCode = `{\n\n`;
    
      preFormattedCode = Object.values(fields).reduce((code, field) => {
        return field.name ? code + `    ${field.name}: ${field.value}\n` : code;
      }, preFormattedCode);
      preFormattedCode += '\n}';

      console.dir(preFormattedCode);
      return preFormattedCode;
    }

    return '';
  }

  getFormElements = () => {
    const formFieldsData = this.props.form.fields;
    const formElements = Object.values(formFieldsData).reduce((allFields, field) => {
      const { id, type, label, layout, text } = field;
      const Field = Fields[type];

      if (!!Field) {
        // Initial layout of the field
        const fieldLayoutProperties = {
          ...layout,
          static: true
        };

        const Container = nonCenteredContentFields.includes(type)
          ? StyledFieldContainer
          : StyledFieldCenteredContentContainer;
        
        allFields.push(
          <Container
            key={id}
            data-grid={fieldLayoutProperties}
          >
            <Field
              id={id}
              text={text}
              label={label}
              onChange={e => this.onChangeFieldValue(id, e.target.value)}
            />
          </Container>
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
            margin={[8, 8]}
            cols={12}
            rowHeight={48}
          >
            {this.getFormElements()}
          </ReactGridLayout>
          <StyledButtonContainer>
            <IconButton
              visualType="primary"
              iconClass="save"
              onClick={this.onSubmitForm}
            >
              Submit
            </IconButton>
            <IconButton
              visualType="primary"
              iconClass="list-ul"
              onClick={this.goToFormList}
            >
              Go To Form List
            </IconButton>
          </StyledButtonContainer>
        </GridContainer>
        <Sidebar>
          <label>Data</label>
          <StyledDataBox>
            {this.getSubmitData()}
          </StyledDataBox>
        </Sidebar>
      </Container>
    );
  }
}

const formFieldLayoutProptypes = shape({
  i: string.isRequired,
  x: number.isRequired,
  y: number.isRequired,
  w: number.isRequired,
  h: number.isRequired
});

const formFieldPropTypes = shape({
  id: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  layout: formFieldLayoutProptypes
});

PreviewForm.propTypes = {
  form: shape({
    id: string.isRequired,
    fields: shape({
      string: formFieldPropTypes,
    }).isRequired
  }).isRequired,
  changePage: func.isRequired
}

const mapStateToProps = (state) => {
  return {
    form: state.formData.forms[state.formData.currentFormId]
  };
};

const mapDispatchToProps = {
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm);
