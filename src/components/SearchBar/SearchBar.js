import React, { Component } from 'react'

export default class SearchBar extends Component {

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("hey you clicked me");
    const {search, sort} = e.target;

    // some kind of APIservice.getTeams(search.value, sort.hljs-value)
  }

  render() {
    return (
      <div className="searchbar">
        <form 
          className="search"
          onSubmit={this.handleOnSubmit}
        >
          <div>
            <label for="search">Search:</label>
            <input placeholder="e.g. Pikachu" value="" type="text" name="search" id="search" />
            <label for="sort">Sort By:</label>
            <select name="sort" id="sort">
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
            </select>
            <button type="submit">Go!</button>
          </div>
        </form>
      </div>
    )
  }
}


