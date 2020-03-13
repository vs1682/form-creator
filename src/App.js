import React from 'react';

import CreateForm from './components/create/index';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';

function App() {
  return (
    <div>
      <CreateForm />
      {/* <FormBuilder /> */}
    </div>
  );
}

export default App;
