import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = value.trim();

    if (!searchValue) {
      Notiflix.Notify.info('Please write some value');
    }
    onSubmit(searchValue);
    setValue('');
  };
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.SearchFormInput}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
