import { Button } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import db from "../firebase";
import "./Post.css";

const Post = forwardRef(({ name, address, phone, type, time, post }, ref) => {
  const onDeliteClick = () => {
    db.collection("posts").doc(post.id).delete();
  };

  return (
    <div fer={ref} className="post">
      <div className="form">
        <div className="form_title">
          <a name={`${name.trim()}`}></a>
          <div className="form_name">
            <h1>
              Название организации: <span>{name}</span>
            </h1>
          </div>
          <div className="form_address">
            <h1>
              Адресс: <span>{address}</span>
            </h1>
          </div>
          <div className="form_phone">
            <h1>
              Телефон: <span>{phone}</span>
            </h1>
          </div>
          <div className="form_type">
            <h1>
              Тип: <span>{type}</span>
            </h1>
          </div>
          <Button variant="contained" color="secondary" onClick={onDeliteClick}>
            удалить
          </Button>
        </div>
        <div className="form_more">
          <h1>Время создания: </h1>
        </div>
      </div>
    </div>
  );
});

export default Post;
