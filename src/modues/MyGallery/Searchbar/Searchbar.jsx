import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './seafchbar.module.css';

import { FcSearch } from 'react-icons/fc';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;

    console.log(value);
    setSearch(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!search.trim()) {
      return alert(`Enter your query in the search bar`);
    }

    onSubmit(search);

    reset();
  };
  console.log();
  const reset = () => {
    setSearch('');
  };

  return (
    console.log(search, 'tot search'),
    (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>
              <FcSearch />
            </span>
          </button>

          <input
            value={search}
            name="search"
            onChange={handleChange}
            className={css.searchFormiInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  );
};

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
