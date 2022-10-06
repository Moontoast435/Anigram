import { useState, useEffect } from 'react';
import React from 'react';

const SearchPage = ({setPosts}) => {
  const [searchvalue, setSearchValue] = useState([]);

  const searchHandle = async (e) => {
    let key = e.target.value;

    let result = await fetch(
      `https://anigram-application.herokuapp.com/posts/api/post?search=${key}`
    );

    result = await result.json();
    //setSearchValue(result);
    setPosts(result)

  };
  return (
    <div className='filter-feed'>
      <input type="text" onChange={searchHandle} />
      {searchvalue.map((searchdata) => (
        <div>
          <h1>{searchdata.description}</h1>
          <img src={searchdata.image_url} />
          <h2>Continue Browsing</h2>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
