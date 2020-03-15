import React, { Component } from 'react';
import styled from 'styled-components';
import { func, objectOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentFormId } from '../../actions/forms';
import { changePage } from '../../actions/page';
import { getDateString } from '../../utils';

import IconButton from '../core/buttons/icon-button';

const FormListerContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  color: #ffffff;
  background-color: #027aff;
  padding: 1rem;
`;

const FormList = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 1rem;
`;

const StyledFormHeader = styled.h4`
  margin-bottom: 0;
`;

const StyledDaysContainer = styled.div`
  flex: 1;
  padding: 0.5rem 1rem;
`;

const StyledListItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  margin: 0 -2rem;
  height: 2rem;
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  cursor: pointer;
`;

class FormLister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null
    };
  }

  onSelectDay = dayString => {
    this.setState({ selectedDate: dayString })
  }

  onSelectForm = id => {
    this.props.updateCurrentFormId(id);
    this.props.changePage('preview');
  }

  getFormCreationDates = () => {
    const { selectedDate } = this.state;
    const { forms } = this.props;
    const creationDateMap = {};

    return Object.values(forms).reduce((creationDates, form) => {
      const createAtDate = new Date(form.createdAt);
      const createAtDateString = getDateString(createAtDate);
      const isSelected = selectedDate === createAtDateString;

      if (!creationDateMap[createAtDateString]) {
        creationDateMap[createAtDateString] = true;
        creationDates.push(
          <StyledListItemContainer key={createAtDateString} selected={isSelected} onClick={() => this.onSelectDay(createAtDateString)}>
            {createAtDateString}
          </StyledListItemContainer>
        );
      }

      return creationDates;
    }, []);
  }

  getForms = () => {
    const { selectedDate } = this.state;
    const { forms } = this.props;

    return Object.values(forms).reduce((formsCreatedOnSelectedDate, form) => {
      const createAtDate = new Date(form.createdAt);
      const createAtDateString = getDateString(createAtDate);
      const isCreatedOnSelectedDate = selectedDate === createAtDateString;

      if (isCreatedOnSelectedDate) {
        formsCreatedOnSelectedDate.push(
          <StyledListItemContainer key={form.createdAt} onClick={() => this.onSelectForm(form.id)}>
            {`Form ${formsCreatedOnSelectedDate.length+1}`}
          </StyledListItemContainer>
        );
      }

      return formsCreatedOnSelectedDate;
    }, []);
  }

  render() {
    return (
      <FormListerContainer>
        <Sidebar>
          <IconButton
            iconClass="plus"
            shape="rounded"
            color="#027aff"
            backgroundColor="#ffffff"
            onClick={() => this.props.changePage('create')}
          >
            Create
          </IconButton>
          <StyledFormHeader>Forms</StyledFormHeader>
          <StyledDaysContainer>
            {this.getFormCreationDates()}
          </StyledDaysContainer>
        </Sidebar>
      <FormList>{this.getForms()}</FormList>
      </FormListerContainer>
    );
  }
}

FormLister.propTypes = {
  forms: objectOf(
    shape({
      id: string.isRequired,
      createdAt: number.isRequired
    })
  ).isRequired,
  updateCurrentFormId: func.isRequired,
  changePage: func.isRequired
};

const mapStateToProps = state => {
  return {
    forms: state.formData.forms
  };
};

const mapDispatchToProps = {
  updateCurrentFormId,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLister);
