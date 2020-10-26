import React, { useEffect, useState } from "react";
import "./App.css";
import Creator from "./components/Сreator";
import db from "./firebase";
import Post from "./components/Post";
import Map, { Search } from "./Map";

const App = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").orderBy("time" , "desc").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  return (
    <div className="App">
      <Map />
      <Creator />
      <div className="post">
        {posts.map((post) => (
          <Post
            time={post.time}
            post={post}
            name={post.name}
            address={post.street}
            phone={post.phone}
            type={post.type}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
