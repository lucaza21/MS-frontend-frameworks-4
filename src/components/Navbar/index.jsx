import React, { useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Profile from "../Profile";
import Login from "../Login";
import PostList from "../PostList";



export default function Navbar({author, currentPage, onLoginComplete, setCurrentPage, filterAuthor }) {

  return (
    <>
      <div className="container flex items-center justify-center w-4/5 py-3 mx-auto bg-slate-300 ">
        <nav className="flex justify-between w-5/6 gap-4 lg:w-/4">
          <div>
            <Link to="/login">
              <div className="flex items-center justify-start gap-2 w-4/3">
                <div className="text-lg">
                  <AiFillThunderbolt />
                </div>
                <div className="text-lg ">
                  <p>three pics</p>
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="flex justify-between gap-3">
            {localStorage.getItem("authorization") == null ? (
              <div>
                <Link to="/login">Login</Link>
              </div>
            ) : (
              <>
                <div>
                  <Link to="/">PostList</Link>
                </div>
                <div>
                  <Link to="/profile">Profile</Link>
                </div>
              </>
            )}
          </div> */}
          <div>
              <Link to="/profile">
                <div className="text-2xl ">
                  <FaUserCircle />
                </div>
              </Link>
            </div>
        </nav>
      </div>

      <div>
        <Routes>
          {localStorage.getItem("authorization") == null ? (
            <Route
              path="/login"
              element={<Login onLoginComplete={onLoginComplete} />}
            />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <PostList
                    author={author}
                    filterAuthor={filterAuthor}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile onLoginComplete={onLoginComplete} />}
              />
            </>
          )}

          <Route
            path="*"
            element={
              <Navigate
                to={
                  localStorage.getItem("authorization") == null ? "/login" : "/"
                }
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}
