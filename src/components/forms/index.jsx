import React from 'react';
import styled from 'styled-components';

import IconButton from '../core/buttons/icon-button';

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: #027aff;
  padding: 1rem;
`;

const FormList = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 1rem;
`;

const FormListerContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const FormLister = ({}) => (
  <FormListerContainer>
    <Sidebar>
      <IconButton color="#027aff" backgroundColor="#ffffff" iconClass="plus">
        Create
      </IconButton>
    </Sidebar>
    <FormList></FormList>
  </FormListerContainer>
);

export default FormLister;
