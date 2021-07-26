import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Homepage.css';
function Homepage() {
  return (
    <form className="search-form">
      <label className="search-form-label">
        <span>Search for shops</span>
      </label>
      <input
        type="text"
        id="searc"
        placeholder="Search a local coffee shop's name"
        // name="s"
        className="search-form-input"
      />
      <button className="search-form-button" type="submit">Search</button>
    </form>
  )
}

export default Homepage;
