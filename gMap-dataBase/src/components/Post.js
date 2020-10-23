import { Button } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import db from "../firebase";
import './Post.css'


const Post = forwardRef(({ name, address, phone, type, id, post }, ref) => {
  const onDeliteClick = () => {
    db.collection("posts").doc(post.id).delete();
  };

  return (
    <div fer={ref} className="post">
        <div className="form">
          <div>
            <h1>Название организации: {name}</h1>
          </div>
          <div>
            <h1>Адресс: {address}</h1>
          </div>
          <div>
            <h1>Телефон: {phone}</h1>
          </div>
          <div>
            <h1>Тип: {type}</h1>
          </div>
          <Button variant="contained" color="primary" onClick={onDeliteClick}>
        Delite
      </Button>
        </div> 
    </div>
  );
});

export default Post;
