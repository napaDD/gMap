import React, {  useEffect, useState } from 'react';
import './App.css';
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
      <h1>GGG</h1>
      {posts.map(post =>(
        <Post name={post.name}/>
      ))}
      <Post name="John"/>
    </div>
  );
}

export default App;
