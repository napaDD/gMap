import React, {  useEffect, useState } from 'react';
import './App.css';
import Creator from './components/creator';
import db from './firebase';
import Post from './Post';



const  App = (props) => {
  const [posts , setPosts] = useState([]);

  useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => doc.data()))
      ))
  }, [])


  return (
    <div className="App">
      <Creator />
      {posts.map(post =>(
        <Post 
        post={post}
        name={post.name}
        address={post.address}
        phone={post.phone}
        type={post.type}
        id={post.id}
        />
      ))}
    </div>
  );
}

export default App;
