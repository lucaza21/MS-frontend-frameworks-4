import React, { useEffect, useState } from 'react'
//import { posts } from '../../../data'
//import { getPosts } from '../../posts-services';
import Post from '../Post'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Pages from '../Pagination';
export default function PostList({ author, currentPage, filterAuthor, setCurrentPage }) {

  const [posts, setPosts] = useState(null)
  const navigate = useNavigate();

  const [change, setChange] = useState(false)
  
  const getPosts = async () => {
    const apiUrl = 'https://three-points.herokuapp.com/api/posts';
    const auth_token = JSON.parse(localStorage.getItem('authorization'));
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status == 200) {
        const data = await response.json();        
        const tempPosts = [];
         data.map((item) => {
          const nuevoPost = { id: item.id,
                              image: item.image, 
                              createdAt: item.createdAt.slice(0, 10), 
                              likes: item.likes, 
                              autor: item.author.name, 
                              text: item.text, 
                              comments: item.comments.length, 
                              };
          tempPosts.push(nuevoPost);
          
        });
        setPosts(tempPosts);
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
    console.log("ejecuta")
    getPosts()
  },[change])

  const changeLike = (id) => {
    //const postId = id
    const apiUrl = `https://three-points.herokuapp.com/api/posts/${id}/like`;
    const auth_token = JSON.parse(localStorage.getItem('authorization'));
        return fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
          },
          body: ""
        })
        .then(response => {
          if(response.status == 204){
            console.log(response.status, "changing likes from: " + id)
            setChange(!change)
          } else if (response.status == 401){
            throw new Error(response.status + " - " + response.statusText)
          } else {
            throw new Error(response.status + " - " + response.statusText)
          }
          
        })
        .catch(error => console.log(error))
  }
   

  return (
    <>
      
      {posts ? (
        <>
        <SearchBar author={author} filterAuthor={filterAuthor}/>
        <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className='container grid w-4/5 gap-4 p-4 mx-auto mb-4 text-center bg-gray-200 min-w-min xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                {posts.slice((currentPage-1)*22, currentPage*22)
                .filter((word) => word.text?.toLowerCase().includes(author.toLowerCase()) ||
                         word.autor?.toLowerCase().includes(author.toLowerCase()))
                .map((post, i) => (
                    <Post post={post} key={post.id} changeLike={changeLike}/>
                ))}
        </div>
        </>
      ) : (
        <div className='text-center'>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
