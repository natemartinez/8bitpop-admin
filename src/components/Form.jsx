import { useEffect, useState } from 'react';
import '../style.css';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';

function Form() {

  const [data, setData] = useState({});

  const getData = () => {
    //axios.get('http://localhost:1337/api/products', {})
    
  }


  useEffect(() => {
      getData();
  }, [data])

  // The text inputs below should match the ones for Strapi
  return (
    <>
      <div className='form-wrapper'>
        <h2 className='text-white'>Form</h2>
        <input type="text" />
        <input type="text" />
      </div>
    </>
  )
}

export default Form
