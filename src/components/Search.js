import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


 
function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [param, setParam] = useState('');
  const [url, setUrl] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/v1/vehicles/search`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
 
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
      <InputGroup className="mb-3 d-flex justify-content-center">
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
        <select size="lg" value={param} onChange={event => setParam(event.target.value)}>
            <option value="">Select Option</option>
            <option value="model_name">Model Name</option>
            <option value="brand_name">Brand Name</option>
            <option value="year">Year greater than</option>
            <option value="mileage">Mileage lower than</option>
            <option value="price">Price lower than</option>
          </select>
      <Button
        variant="primary"
        type="button"
        onClick={() =>
          setUrl(`${process.env.REACT_APP_BACKEND_URL}/v1/vehicles/search?${param}=${query}`)
        }
      >
        Search
      </Button>
      </InputGroup>
 
      {isError && <div>Something went wrong ...</div>}
 
      {isLoading ? (
        <div>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <Card>
         <ListGroup variant="flush">
          {data.map(item => (
            <ListGroup.Item key={item.id}>
              <div><strong>Model: </strong>{item.model_name}</div>
              
              <span><strong>Brand: </strong>{item.brand_name}  </span>
              <span><strong>Year: </strong>{item.year}  </span>
              <span><strong>Mileage: </strong>{item.mileage} mi  </span>
              <span><strong>Price: </strong>{currencyFormat(item.price)} </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </Card>
      )}
    </Fragment>
  );
}

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
 
export default Search;