import React, { useEffect, useState } from "react";
import "./App.css";
import Creator from "./components/Сreator";
import db from "./firebase";
import Post from "./components/Post";
import Map, { Search } from "./map";

const App = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
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
            post={post}
            name={post.name}
            address={post.address}
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
