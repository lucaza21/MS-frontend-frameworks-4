import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import Profile from './components/Profile'
import Login from './components/Login'
import Pages from './components/Pagination'
import Nav from './components/Nav'
import { useNavigate } from 'react-router-dom'

function App() {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  
  const [author, setAuthor] = useState('')

  const [profile, setProfile] = useState(false)
  const [post, setPost] = useState(true)

  const filterAuthor = (author) => {
    //console.log("desde app: " + author)
    setAuthor(author);
  }

  const showpProfile = () => {
    setProfile(true)
    setPost(false)
  }

  const showpPosts = () => {
    setPost(true)
    setProfile(false)
  }

  const [error, setError] = useState(true)
  const [token, setToken] = useState([])

  
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('authorization'));
    if (local) {
      setToken(local);
    }
  }, [error,token]);


  const onLoginComplete = (error) => {
    if(error){
      navigate("/login")
      localStorage.clear();
      setToken([])
      setError(error) 
    }
    navigate("/")
    setError(error)
    
}

  return (
    <>
    
    <div className='min-w-min'>
      <div className='container flex items-center justify-center w-4/5 py-3 mx-auto'>
        <h1 className='text-xl font-bold text-center'>El objetivo del ejercicio es la construcción de una aplicación web React.js con diferentes components que
        tenga como resultado la siguiente interfaz de usuario (Mobile first):</h1>
      </div>
      
      <Navbar profile={profile} author={author} filterAuthor={filterAuthor}  
            onLoginComplete={onLoginComplete} currentPage={currentPage} setCurrentPage={setCurrentPage}
      />
    </div>
    </>
  )
}

export default App
