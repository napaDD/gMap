import React, { forwardRef, useState } from "react";
import db from "./firebase";

const Post = forwardRef(({ name, address, phone, type , id , post } , ref) => {
    
    const onDeliteClick = () => {
    db.collection('posts').doc().delete();
  };

  return (
    <div fer={ref}>
      <form onSubmit={onDeliteClick}>
        <h1>{name}</h1>
        <h1>{address}</h1>
        <h1>{phone}</h1>
        <h1>{type}</h1>
      </form>
      <button onClick={onDeliteClick} >ggggggg</button>
    </div>
  );
});

export default Post;
