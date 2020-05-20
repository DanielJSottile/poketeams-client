import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class SearchBar extends Component {

  static contextType = UserContext;

  
  render() {

    const {handleFilter, validateFilter, filter, filtersort, setFilter, setFilterSort} = this.context;
    return (
      <div className="searchbar">
        <form className="search">
          <div>
            {filter.value && <p className="error">{validateFilter()}</p>}
            <label htmlFor="search">Search:</label>
            <input placeholder="e.g. Pikachu" value={filter.value} onChange={e => setFilter(e.target.value)} type="text" name="search" id="search" />
            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" value={filtersort.value} onChange={e => setFilterSort(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
              <option value="Most Likes">Most Likes</option>
            </select>
            <button type="submit" 
              disabled={validateFilter()} 
              onClick={(e) => {
                e.preventDefault();
                handleFilter();
              }}>Go!</button>
          </div>
        </form>
      </div>
    )
  }
}


