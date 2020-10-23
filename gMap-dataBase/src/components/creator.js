import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import db from "../firebase";
import "./creator.css";

const docID = []

const Creator = (props) => {
	const [ state , setState] = useState({
		name: "",
	  address:"",
		phone: "",
		type: "",
	})
	console.log(state)
	const createDoc =(e)=> {
		e.preventDefault();
		db.collection('posts').add({
			name: state.name,
			address: state.address,
			phone: state.phone,
			type: state.type
		})
		.then(function(docRef){
			docID.push(docRef.id)
			console.log(docRef.id)
			console.log(docID)
		})
	}
	
	return (
    <div className="body">
      <form className="body_form">
        <Input placeholder="Название организации" onChange={(e) => setState({name: e.target.value})} value={state.name}/>
				<Input placeholder="Адресс" onChange={(e) => setState({...state , address: e.target.value})} value={state.address} />
				<Input placeholder="Телефон" onChange={(e) => setState({...state  ,phone: e.target.value})} value={state.phone} />
				<Input placeholder="Заказчик/Поставщик" onChange={(e) => setState({...state  , type: e.target.value})} value={state.type} />
				<Button variant="contained" color="primary" onClick={createDoc} >Создать</Button>
      </form>
    </div>
  );
};

export default Creator;
