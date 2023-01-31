import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const initialValues = {
    search: '',
  };

  const handleSubmit = ({ search }, { resetForm }) => {
    if (search.trim() === '') {
      return;
    }
    onSubmit(search);
    resetForm();
  };

  return (
    <div className={css.Searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css.SearchFormBtn}>
            <span className={css.SearchFormBtnLabel}>&#128270;</span>
          </button>
          <Field
            type="text"
            name="search"
            className={css.SearchFormIinput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          ></Field>
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
