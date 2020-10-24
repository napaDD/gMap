import { Button, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { formatRelative } from "date-fns";
import React, {  useState } from "react";
import db from "../firebase";
import { add } from "../Map";
import "./creator.css";




const Creator = (props) => {
	const [display, setDisplay] = useState(false)
	const [state, setState] = useState({
		name: "",
		address: "",
		phone: "",
		type: "",
	})
	// console.log(state)

	
	const createDoc = (e) => {
		e.preventDefault();
		const time = new Date()
		db.collection('posts').add({
			id: `f${(~~(Math.random() * 1e8)).toString(16)}`, 
			name: state.name,
			phone: state.phone,
			type: state.type,
			street: add.street,
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
				<Input placeholder="Адресс вводится автоматички " value={add.street} />
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


