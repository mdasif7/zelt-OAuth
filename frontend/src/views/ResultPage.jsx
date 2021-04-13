import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResultPage() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = (await axios.get('/api/fetchUser')).data;
        setUserDetails(response);
      } catch (error) {
        console.log('error');
      }
    }

    fetchData();
  }, []);

  return (
    <div className='user-details App-header'>
      User Details:
      <div data-testid="username-id">
        Username: {userDetails && userDetails.login ? userDetails.login : '-'}
      </div>
      <div>
        Email: {userDetails && userDetails.email ? userDetails.email : '-'}
      </div>
      <div>
        Company:{' '}
        {userDetails && userDetails.company ? userDetails.company : '-'}
      </div>
      <div>
        Location:{' '}
        {userDetails && userDetails.location ? userDetails.location : '-'}
      </div>
    </div>
  );
}

export default ResultPage;
