import React, { Component } from 'react';
const legality = require( '../../functions/legality');

export default class SearchBar extends Component {

  state = {
    search: {value: '', touched: false},
    sort: {value: '', touched: false}
  }

  setSearch = (searchval) => {
    this.setState({search: {value: searchval, touched: true}});
  }

  setSort = (sortval) => {
    this.setState({sort: {value: sortval, touched: true}});
  }

  validateSearch = () => {
    let search = this.state.search.value;
    search = search.toString().trim();
    if(!legality.isLegalSpecies(search)){
      return `Must be an 'existing' Pokemon species or form styled via '[species]-[form]'!`
    }
  }

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
            {this.state.search.value && <p className="error">{this.validateSearch()}</p>}
            <label htmlFor="search">Search:</label>
            <input placeholder="e.g. Pikachu" value={this.state.search.value} onChange={e => this.setSearch(e.target.value)} type="text" name="search" id="search" />
            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" value={this.state.sort.value} onChange={e => this.setSort(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
              <option value="Most Likes">Most Likes</option>
            </select>
            <button type="submit" disabled={this.validateSearch()}>Go!</button>
          </div>
        </form>
      </div>
    )
  }
}


