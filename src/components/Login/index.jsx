import React from 'react'
import { useState } from 'react'

import { Button, Label, TextInput, Alert  } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Login({onLoginComplete}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [logError, setLogError] = useState(false)

    const navigate = useNavigate();

    const apiUrl = 'https://three-points.herokuapp.com/api/login';

    const postData = {
        username,
        password
    };

    const loginHandler = async(ev) => {
        ev.preventDefault()
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //mode: 'no-cors',
                body: JSON.stringify(postData),
            });

            if (response.status == 200) {
                const data = await response.json();
                localStorage.setItem('authorization', JSON.stringify(data.token));
                onLoginComplete(false);         
            } 
            else if (response.status == 401){
                //console.log(response.status)
                onLoginComplete(true);
                setLogError(true)
                navigate("/login")
                throw new Error(response.status + " " + response.statusText)
            }
            else {
              //console.log(response)
              navigate("/login")
              setLogError(true)
              throw new Error(response.status + " " + response.statusText)
             
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <>
      <div className="container w-4/5 py-3 mx-auto text-start ">
        <form className="flex flex-col justify-between w-1/4 gap-4 mx-auto ">
          <h1 className="text-lg font-bold text-center">LOGIN</h1>
          {logError && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <p className="text-lg font-semibold">
                  Invalid email or password
                </p>
              </span>
            </Alert>
          )}
          <div>
            <div className="block mb-2">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="text"
              onChange={(ev) => setUsername(ev.target.value)}
              value={username}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              required
              type="text"
              onChange={(ev) => setPassword(ev.target.value)}
              value={password}
            />
          </div>
          <Button type="submit" onClick={loginHandler}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
