import { Button, Input, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import db from "../firebase";
import "./creator.css";

const docID = []

const Creator = (props) => {
  const [display , setDisplay] = useState(false)
	const [ state , setState] = useState({
		name: "",
	  address:"",
		phone: "",
		type: "",
	})
	// console.log(state)
	const createDoc =(e)=> {
		e.preventDefault();
		db.collection('posts').add({
			name: state.name,
			address: state.address,
			phone: state.phone,
			type: state.type,
			lat: 56.837465, 
			lng: 35.868473
		})
		.then(function(docRef){
			docID.push(docRef.id)
			console.log(docRef.id)
			console.log(docID)
		})
	}
	
	return (
    <div className="creator_body">
      <Button variant="contained" color="primary" onClick={() => setDisplay(!display)}>{display? "Скрыть форму создания" : "Показать форму создания"}</Button>
			<form className={display? "body_form" : "body_formClosed"}>
        <Input placeholder="Название организации" onChange={(e) => setState({name: e.target.value})} value={state.name}/>
				<Input placeholder="Адресс" onChange={(e) => setState({...state , address: e.target.value})} value={state.address} />
				<Input placeholder="Телефон" onChange={(e) => setState({...state  ,phone: e.target.value})} value={state.phone} />
				<Select value={state.type}  onChange={(e) => setState({...state  , type: e.target.value})}>
					<MenuItem value={"Заказчик"}>Заказчик</MenuItem>
					<MenuItem value={"Поставщик"} >Поставщик</MenuItem>
				</Select>
				<Button variant="contained" color="primary" onClick={createDoc} >Создать</Button>
      </form>
    </div>
  );
};

export default Creator;
