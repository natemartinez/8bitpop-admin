import { useState, useEffect } from 'react';
import '../style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ApiData() {
  const [id1, setId1] = useState(null);

  /* 
    Types of data I need:
    - Top 7 profiles on gaming news sources (including indie games)
    - Any news or word on game expos or annoucements
  */
  const getAccountIDs = async () => {
    const options = {
      method: 'GET',
      url: 'https://twitter293.p.rapidapi.com/username/to/id/indiegame_mode',
      headers: {
        'x-rapidapi-key': '1d1e7d6740msh21df59458325f61p13c288jsnfb5d1069b2eb',
        'x-rapidapi-host': 'twitter293.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      //console.log(response.data)
      setId1(response.data.userId);
    } catch (error) {
      console.error(error);
    }
    
  }


  const getTwitterData = async (accountID) => {
    const options = {
      method: 'GET',
      url: 'https://twitter283.p.rapidapi.com/UserTweets',
      params: {
        user_id: accountID,
      },
      headers: {
        'x-rapidapi-key': '1d1e7d6740msh21df59458325f61p13c288jsnfb5d1069b2eb',
        'x-rapidapi-host': 'twitter283.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    getAccountIDs();
  }, []);

  useEffect(() => {
    if(id1 !== null){
      getTwitterData(id1);
    }
  }, [id1]);

  /* 
    What is this component for?
    - Gives me updated data from multiple sources
    - Also displays trending data
    - News connects with my site data, like recent articles and ones that worked and didn't

    For example:
    - Receive data from Twitter about #indiegamedev
      |
      V
    - Cross reference the data from Twitter with Google Trends
  */

  // When I receive data from the API, I need to display it
  // with either map or .forEach in each .data-box

  return (
    <>
      <div className='data-wrapper'>
        <h1 className='text-white'>ApiData</h1>
        <div>
          <Container>
            <Row className='mb-5'>
             <Col>
              <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">Twitter</Dropdown.Item>
                <Dropdown.Item href="#/action-2">News Source 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">News Source 3</Dropdown.Item>
              </DropdownButton>           
             </Col>
            </Row>
  
            <Row className='mt-5'>
             <h2 className='text-center text-white'>Twitter hashtag data</h2>
             <Row xs="auto">
              <Col xs={3} className='d-flex justify-content-center'>
                <Button>#indiegamedev</Button>
              </Col>
              <Col xs={3} className='d-flex justify-content-center'>
                <Button>#gamedev</Button>
              </Col>
              <Col xs={3} className='d-flex justify-content-center'>
                <Button>#retrogaming</Button>
              </Col>          
              <Col xs={3} className='d-flex justify-content-center'>
                <Button>#gaming</Button>
              </Col>          
             </Row>
             <Col className='mt-4'>
              <div className='data-box'>
           
              </div>            
             </Col>
            </Row>  
          </Container>
        </div>
        
      </div>
    </>
  )
}

export default ApiData
