import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import './SearchBar-Public.css';

// Component

const SearchBarPublic = (props: any) => {

  // Set Context

  const GenCon = useContext(GeneralContext);

  const {
    handleSearch,
    validateSearch,
    search,
    sort,
    setSearch,
    setSort,
  } = GenCon;

  // Final Render

  return (
    <div className="searchbar">
      <form className="search">
        <div className="search">
          {search.value && (
            <p className="error-validate shake-horizontal">{validateSearch}</p>
          )}
          <label htmlFor="search">
            Search: <i className="fas fa-search"></i>
          </label>
          <input
            className="s-input"
            placeholder="e.g. Pikachu"
            value={search.value}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
          />
          <label htmlFor="sort">
            Sort By:<i className="fas fa-sort"></i>{' '}
          </label>
          <select
            name="sort"
            id="sort"
            value={sort.value}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A - Z</option>
            <option value="rev alphabetical">Z - A</option>
          </select>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleSearch(e);
            }}
          >
            Go <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarPublic;
