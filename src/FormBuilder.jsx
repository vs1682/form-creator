import React from 'react';
import { FormBuilder } from 'cb-react-forms';

const onSubmitForm = data => {
  console.log(data);
}

const items = [
  {
    key: "Header",
    name: "Header Text",
    icon: "fa fa-header"
  },
  {
    key: "Paragraph",
    name: "Paragraph",
    icon: "fa fa-paragraph"
  },
  {
    key: "Dropdown",
    name: "Dropdown",
    icon: "fa fa-caret-square-o-down"
  }
];

const Example = props => (
  <FormBuilder 
    onSubmit={onSubmitForm}
    items={items}
  />
);

export default Example;

