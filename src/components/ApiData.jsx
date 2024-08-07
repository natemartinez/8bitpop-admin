import { useState, useEffect } from 'react';
import '../style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loading from './Loading.jsx';


function ApiData() {
  const [accountName, setAccountName] = useState('');
  const [id1, setId1] = useState(null);
  const [showTwitter, setShowTwitter] = useState(false);
  const [tweetArr, setTweetArr] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
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

  /* 
    Types of data I need:
    - Top 7 profiles on gaming news sources (including indie games)
    - Any news or word on game expos or annoucements
  */
  const getTweetIDs = async (account, name) => {
    setShowTwitter(true);
    setDataLoading(true);

    setAccountName(name);
    
    const options = {
      method: 'GET',
      url: 'https://twitter293.p.rapidapi.com/username/to/id/' + account,
      headers: {
        'x-rapidapi-key': '1d1e7d6740msh21df59458325f61p13c288jsnfb5d1069b2eb',
        'x-rapidapi-host': 'twitter293.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      //console.log(response.data)
      setId1(response.data.userId);
      setDataLoaded(true);
    } catch (error) {
      setDataLoading(false);
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
      const tweetsObj = response.data.data.user_result_by_rest_id.result.profile_timeline_v2.timeline.instructions[2];
      displayTweets(tweetsObj.entries);
    } catch (error) {
      console.error(error);
    }

  }

  const displayTweets = (tweets) => {
    let availableTweets = [];

    tweets.forEach(tweet => {
      try {
        if(tweet.content.content.tweet_results !== undefined || tweet.content.content.tweet_results !== null) {
          availableTweets.push(tweet.content.content.tweet_results);
        } else{
          throw new Error('Cant find that tweet');
        }
      } catch(error) {
         console.error(error);
      }
    });
    setTweetArr(availableTweets);
    console.log(availableTweets);
    setDataLoaded(true)
  }

  useEffect(() => {
    if(id1 !== null){
      getTwitterData(id1);
    }
  }, [id1]);



  return (
    <>
      <div className='data-wrapper'>
        <h1 className='text-white'>ApiData</h1>
        <div>
          <Container>
            <Row className='mb-5'>
             <Col>
              <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item >Twitter Accounts</Dropdown.Item>
                <Dropdown.Item href="#/action-2">News Source 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">News Source 3</Dropdown.Item>
              </DropdownButton>           
             </Col>
            </Row>
            <Row className='mt-5'>
             <h2 className='text-center text-white mb-4'>Twitter data</h2>
             <Row xs="auto" className='justify-content-center mt-4'>
              <Col xs={2} className='d-flex justify-content-center'>
                <Button onClick={() => getTweetIDs('indiegame_mode', 'Indie Game Mode')}>Indie Game Mode</Button>
              </Col>
              <Col xs={2} className='d-flex justify-content-center'>
                <Button onClick={() => getTweetIDs('HeinyReimes', 'Heiny Reimes')}>Heiny Reimes</Button>
              </Col>
              <Col xs={2} className='d-flex justify-content-center'>
                <Button onClick={() => getTweetIDs('indiegamedevel', 'Indie Game Devel')}>Indie Game Devel</Button>
              </Col>          
              <Col xs={2} className='d-flex justify-content-center'>
                <Button onClick={() => getTweetIDs('IndieDB', 'IndieDB')}>IndieDB</Button>
              </Col>          
              <Col xs={2} className='d-flex justify-content-center'>
                <Button onClick={() => getTweetIDs('IndieWorldOrder', 'Indie World Order')}>Indie World Order</Button>
              </Col>          
             </Row>
             <Col className='mt-4 info-wrapper'>
             {!showTwitter ? '' :
              <div className='twitter mt-5'>
               {!dataLoaded ? <Loading /> : 
               <>
                <h1 className='text-white mb-4'>{accountName}</h1>
                 <div className='twitter-source'>  
                  {tweetArr.map((tweet, i) => (
                  <div key={i} className='data-box'>
                    <p>{tweet.result.legacy.full_text}</p>
                  </div>
                  ))}
                 </div>
                </>
               }
              </div>
             }                         
             </Col>
            </Row>  
          </Container>
        </div>
        
      </div>
    </>
  )
}

export default ApiData
