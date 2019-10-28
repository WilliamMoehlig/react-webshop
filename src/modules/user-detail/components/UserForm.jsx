import React, { useState } from 'react';
import classnames from 'classnames';
import { func } from 'prop-types';

import Button from '../../../components/Button';

const MAX_LENGTH_FIRSTNAME = 30;

function validateUser(user) {
  const result = {};
  if (!user.firstName) result.firstName = 'is required';
  else if (user.firstName.length > MAX_LENGTH_FIRSTNAME)
    result.firstName = `has a maximum length of ${MAX_LENGTH_FIRSTNAME}`;

  return result;
}

function UserForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({});
  const [validationResult, setValidationResult] = useState({});

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setFormValues(values => ({ ...values, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const result = validateUser(formValues);

    if (Object.keys(result).length === 0) onSubmit(formValues);
    else setValidationResult(result);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="firstName">
          First Name
        </label>
        <div className="col-sm-10">
          <input
            className={classnames('form-control', {
              'is-invalid': validationResult.firstName,
            })}
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            type="text"
            value={formValues.firstName || ''}
            onChange={handleChange}
            required
            maxLength={MAX_LENGTH_FIRSTNAME}
          />
          {validationResult.firstName && (
            <div className="invalid-feedback" data-testid="validation-feedback-first-name">
              {validationResult.firstName}
            </div>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="lastName">
          Last Name
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="lastName"
            placeholder="Enter Last Name"
            name="lastName"
            type="text"
            value={formValues.lastName || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 form-check-label" htmlFor="isFamily">
          Family
        </label>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              id="isFamily"
              name="isFamily"
              type="checkbox"
              checked={formValues.isFamily || false}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

UserForm.propTypes = {
  onSubmit: func.isRequired,
};

export default UserForm;
