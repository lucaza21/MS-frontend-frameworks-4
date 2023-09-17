import React, { useState, useEffect } from 'react'
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function Profile({onLoginComplete}) {

  const [profile, setProfile] = useState(null)

  const navigate = useNavigate();

  const getProfile = async () => {
    const apiUrl = 'https://three-points.herokuapp.com/api/users/6136944fcd79ba24707e2f82';
    const auth_token = JSON.parse(localStorage.getItem('authorization'));
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        }
      });

      if(response.status == 200) {
          const data = await response.json();        
          setProfile(data);
        } else if (response.status == 401) {
          console.log(response.status)
          navigate("/login")
        } else {
          console.log(response.status)
          navigate("/login")
        }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
      getProfile()
  },[])
   

  return (
    <>
    {profile ?
    <div className='flex flex-col items-center justify-between w-2/4 mx-auto my-3 text-center xl:w-1/4 '>
        <div className=''>
            <img src={profile.avatar} className='w-40 h-40 rounded-full shadow-lg' alt="profile"  />
        </div>
        <div>
            <h1 className='text-lg font-semibold'>@{profile.name}</h1>
        </div>
        <div className='p-2'>
            <p>{profile.bio}</p>
        </div>

        <Button type="submit" onClick={() => onLoginComplete(true)}>Logout</Button>

    </div> :
    <div className='text-center'>
          <p>Loading...</p>
      </div>
        }
    </>
  )
}
