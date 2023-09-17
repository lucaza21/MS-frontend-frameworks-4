import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Profile from '../Profile';
import Login from '../Login';
import PostList from '../PostList';

export default function Nav() {
  return (
    
      <div>
 {/*        <nav>
          <ul>
            <li>
              <Link to="/">PostList</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav> */}
        
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    
  );
}
