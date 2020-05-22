import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class SearchBar extends Component {

  static contextType = UserContext;

  
  render() {

    const {handleSearch, validateSearch, search, sort, setSearch, setSort} = this.context;
    return (
      <div className="searchbar">
        <form className="search">
          <div className="search">
            {search.value && <p className="error">{validateSearch()}</p>}
            <label htmlFor="search">Search: <i className="fas fa-search"></i></label>
            <input placeholder="e.g. Pikachu" value={search.value} onChange={e => setSearch(e.target.value)} type="text" name="search" id="search" />
            <label htmlFor="sort">Sort By:<i className="fas fa-sort"></i> </label>
            <select name="sort" id="sort" value={sort.value} onChange={e => setSort(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
              <option value="Most Likes">Most Likes</option>
            </select>
            <button type="submit" 
              disabled={validateSearch()} 
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}>Go <i className="fas fa-exclamation"></i></button>
          </div>
        </form>
      </div>
    )
  }
}


