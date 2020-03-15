import React from 'react';
import { connect } from 'react-redux';

import CreateForm from './components/create/index';
import PreviewForm from './components/preview/index';
import Forms from './components/forms/index';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';

const Pages = {
  list: Forms,
  create: CreateForm,
  preview: PreviewForm
};

const App = (props) => {
  const CurrentPage = Pages[props.page];

  return <CurrentPage />;
}

const mapStateToProps = ({ page }) => {
  return {
    page
  };
}

export default connect(mapStateToProps)(App);
