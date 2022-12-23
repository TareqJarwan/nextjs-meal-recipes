// Packages
import React from 'react';

// Styles
import classes from '../../styles/SearchBar.module.scss';

function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      className={classes.input}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="search meals"
    />
  );
}

export default SearchBar;
