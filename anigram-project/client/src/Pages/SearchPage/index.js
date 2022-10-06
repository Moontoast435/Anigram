import { useState, useEffect } from 'react';
import React from 'react';

const SearchPage = ({setPosts}) => {
  const [searchvalue, setSearchValue] = useState([]);

  const searchHandle = async (e) => {
    let key = e.target.value;
    console.log(key);
    let result = await fetch(
      `http://127.0.0.1:8000/posts/api/post?search=${key}`
    );

    result = await result.json();
    //setSearchValue(result);
    setPosts(result)
    console.log(searchvalue);
    if (result) {
      console.log(result);
      // setPosts(result);
    }
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
