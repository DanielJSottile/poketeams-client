import React, { Component } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

export default class SearchBar extends Component {

  static contextType = GeneralContext;

  
  render() {

    const {handleSearch, validateSearch, search, sort, setSearch, setSort} = this.context;
    return (
      <div className="searchbar">
        <form className="search">
          <div className="search">
            {search.value && <p className="error">{validateSearch()}</p>}
            <label htmlFor="search">Search: <i className="fas fa-search"></i></label>
            <input className="s-input" placeholder="e.g. Pikachu" value={search.value} onChange={e => setSearch(e.target.value)} type="text" name="search" id="search" />
            <label htmlFor="sort">Sort By:<i className="fas fa-sort"></i> </label>
            <select name="sort" id="sort" value={sort.value} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">A - Z</option>
              <option value="rev alphabetical">Z - A</option>
            </select>
            <button type="submit"
              onClick={(e) => {
                handleSearch(e);
              }}>Go <i className="fas fa-exclamation"></i></button>
          </div>
        </form>
      </div>
    )
  }
}


