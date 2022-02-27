import { useState } from 'react';

const UseForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onFieldChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onFieldChange,
    onFormSubmit,
    values,
    setValues,
  };
};

export default UseForm;
