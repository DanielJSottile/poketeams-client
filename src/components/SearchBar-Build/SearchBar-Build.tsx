import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

const SearchBarBuild = (props: any) => {

  const GenCon = useContext(GeneralContext);

  const {handleFilter, validateFilter, filter, filtersort, setFilter, setFilterSort} = GenCon;

    return (
      <div className="searchbar">
        <form className="search">
          <div className="search">
            {filter.value && <p className="error-validate shake-horizontal">{validateFilter}</p>}
            <label htmlFor="search">Search: <i className="fas fa-search"></i></label>
            <input className="s-input" placeholder="e.g. Pikachu" value={filter.value} onChange={e => setFilter(e.target.value)} type="text" name="search" id="search" />
            <label htmlFor="sort">Sort By: <i className="fas fa-sort"></i></label>
            <select name="sort" id="sort" value={filtersort.value} onChange={e => setFilterSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">A - Z</option>
              <option value="rev alphabetical">Z - A</option>
            </select>
            <button type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleFilter();
              }}>Go <i className="fas fa-exclamation"></i></button>
          </div>
        </form>
      </div>
    )
}

export default SearchBarBuild;


