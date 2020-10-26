import { Button, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import { formatRelative } from "date-fns";
import React, {  useEffect, useState } from "react";
import db from "../firebase";
import { add } from "../Map";
import "./creator.css";




const Creator = (props) => {
	const [display, setDisplay] = useState(true)
	const [state, setState] = useState({
		name: "",
		phone: "",
		type: "",
	})
	const [posts, setPosts] = useState([]);
	// console.log(state)
	useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
	

	console.log(posts)
	const createDoc = (e) => {
		e.preventDefault();
		const time = new Date()
    if (posts.street === add.street) { 
			db.collection('posts').doc(posts.id).update({

			})
	 }



		db.collection('posts').add({
			id: `f${(~~(Math.random() * 1e8)).toString(16)}`, 
			name: state.name || "dealult",
			phone: state.phone || "dealult",
			type: state.type || "dealult",
			street: add.street || "dealult",
			coordinates: [add.lat , add.lng],
			time: time
		})
			.then(function (state) {
				setState({
					name: "",
					address: "",
					phone: "",
					type: "",
				})
				add.street = ''
			})
	}

	return (
		<div className="creator_body">
			<Button variant="contained" color="primary" onClick={() => setDisplay(!display)}>{display ? "Скрыть форму создания" : "Показать форму создания"}</Button>
			<form className={display ? "body_form" : "body_formClosed"}>
				<Input placeholder="Название организации" onChange={(e) => setState({ name: e.target.value })} value={state.name} />
				<Input placeholder="Адресс вводится автоматички " value={add.street} onChange={add.street} />
				<Input placeholder="Телефон" onChange={(e) => setState({ ...state, phone: e.target.value })} value={state.phone} />
				
				<Select  value={state.type} onChange={(e) => setState({ ...state, type: e.target.value })}>
					<MenuItem value={"Заказчик"}>Заказчик</MenuItem>
					<MenuItem value={"Поставщик"} >Поставщик</MenuItem>
				</Select>
				
				<Button variant="contained" color="primary" onClick={createDoc} >Создать</Button>
			</form>
		</div>
	);
};

export default Creator;


