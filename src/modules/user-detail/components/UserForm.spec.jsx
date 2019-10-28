import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render as renderRtl, fireEvent } from '@testing-library/react';

import UserForm from './UserForm';

describe('UserForm component', () => {
  function render(onSubmit = () => {}) {
    const result = renderRtl(<UserForm onSubmit={onSubmit} />);

    return {
      ...result,
      getFirstNameInput: result.getByLabelText.bind(null, /first name/i),
      getLastNameInput: result.getByLabelText.bind(null, /last name/i),
      getIsFamilyInput: result.getByLabelText.bind(null, /family/i),
      getSaveButton: result.getByText.bind(null, /save/i),
    };
  }

  test('it renders by default', () => {
    const { getFirstNameInput, getLastNameInput, getIsFamilyInput, getSaveButton, queryByTestId } = render();

    const firstName = getFirstNameInput();
    expect(firstName).toBeEmpty();
    expect(firstName).toHaveProperty('placeholder', 'Enter First Name');
    expect(firstName).toBeRequired();
    expect(firstName).toHaveAttribute('maxlength', '30');

    const lastName = getLastNameInput();
    expect(lastName).toBeEmpty();
    expect(lastName).toHaveProperty('placeholder', 'Enter Last Name');

    const family = getIsFamilyInput();
    expect(family).toHaveProperty('checked', false);

    expect(queryByTestId('validation-feedback-first-name')).not.toBeInTheDocument();

    const saveButton = getSaveButton();
    expect(saveButton).toHaveClass('btn-primary');
  });

  describe('when the user clicks the save button', () => {
    describe('and the form is valid', () => {
      test('it calls the onSubmit prop with the formValues', () => {
        const handleSubmit = jest.fn();
        const givenFirstName = 'Ludwig';
        const givenLastName = 'Von Beethoven';
        const givenIsFamily = true;

        const { getFirstNameInput, getLastNameInput, getIsFamilyInput, getSaveButton } = render(handleSubmit);

        const firstNameInput = getFirstNameInput();
        const lastNameInput = getLastNameInput();
        const familyInput = getIsFamilyInput();
        const saveButton = getSaveButton();

        // fill in form
        fireEvent.change(firstNameInput, { target: { value: givenFirstName } });
        fireEvent.change(lastNameInput, { target: { value: givenLastName } });

        // ⚠️ Checkboxes need click to change which inverts current checked,
        // the target checked: false ensures we end up true
        fireEvent.click(familyInput, { target: { checked: false } });

        fireEvent.click(saveButton);

        expect(handleSubmit).toHaveBeenCalledWith({
          firstName: givenFirstName,
          lastName: givenLastName,
          isFamily: givenIsFamily,
        });
      });
    });

    describe('and the form is invalid', () => {
      describe('firstName', () => {
        test('it renders the feedback if empty', () => {
          const handleSubmit = jest.fn();
          const givenFirstName = '';

          const { getFirstNameInput, getSaveButton, getByTestId } = render(handleSubmit);

          const firstNameInput = getFirstNameInput();
          const saveButton = getSaveButton();

          fireEvent.change(firstNameInput, { target: { value: givenFirstName } });
          fireEvent.click(saveButton);

          expect(getByTestId('validation-feedback-first-name')).toHaveTextContent(/is required/i);
          expect(firstNameInput).toHaveClass('is-invalid');

          expect(handleSubmit).not.toHaveBeenCalled();
        });

        test('it renders the feedback if too long', () => {
          const handleSubmit = jest.fn();
          const givenFirstName = 'a'.repeat(31);

          const { getFirstNameInput, getSaveButton, getByTestId } = render(handleSubmit);

          const firstNameInput = getFirstNameInput();
          const saveButton = getSaveButton();

          fireEvent.change(firstNameInput, { target: { value: givenFirstName } });
          fireEvent.click(saveButton);

          expect(getByTestId('validation-feedback-first-name')).toHaveTextContent(/has a maximum length of 30/i);
          expect(firstNameInput).toHaveClass('is-invalid');

          expect(handleSubmit).not.toHaveBeenCalled();
        });
      });
    });
  });
});
