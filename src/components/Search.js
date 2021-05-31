import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
 
function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [param, setParam] = useState('');
  const [url, setUrl] = useState(
    'http://localhost:3001/api/v1/vehicles/search',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
          console.log(url, query, param)
        const result = await axios(url);
        console.log(result.data)
 
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
        <select value={param} onChange={event => setParam(event.target.value)}>
            <option value="">Select Option</option>
            <option value="model_name">Model Name</option>
            <option value="brand_name">Brand Name</option>
            <option value="year">Year greater than</option>
            <option value="mileage">Mileage lower than</option>
            <option value="price">Price lower than</option>
          </select>
      <button
        type="button"
        onClick={() =>
          setUrl(`http://localhost:3001/api/v1/vehicles/search?${param}=${query}`)
        }
      >
        Search
      </button>
 
      {isError && <div>Something went wrong ...</div>}
 
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <p>{item.model_name} {item.brand_name} {item.year} {item.mileage} {item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
 
export default Search;