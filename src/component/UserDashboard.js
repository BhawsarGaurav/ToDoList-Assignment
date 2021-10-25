import React, { useEffect, useState,useRef } from "react";
import Button from "react-bootstrap/button";
import NavBar from "./NavBar";
import { Table, Form, Container } from "react-bootstrap";
import Parser from "react-html-parser";
import axios from "axios";


export default function UserDashboard() {

  const [user, setUser] = useState([]);
  const [flag, setFlag] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");
  const priorityRef=useRef("");
  const taskRef=useRef("");

  const URL = "http://localhost:3000/todoList";
  let arr = JSON.parse(localStorage.getItem("employee"));
  const id = arr["id"];
  const name = arr["ename"];
 useEffect(()=>{
   getData();
 } ,[])
  const getData= async()  =>{
   await axios.get(`${URL}`).then(function (response) {
      const data = response.data;
      
      const emp=data.filter((u)=>u.userId===id);
      emp.sort((a,b)=>b.priority-a.priority)
      setUser(emp);
  
    });
  }
  const addTask=()=> {
    let priority=priorityRef.current.value;
    console.log(priority)
    if(priority<=5){
    let TaskData = {
      userId: id,
      task: taskRef.current.value,
      priority: priority
    };
  

    axios.post(URL, TaskData);
    getData();
    taskRef.current.value = "";
    priorityRef.current.value = "";
    getData();
  }
  else{
    alert("Priority should be etwwen 0 to 5")
  }   
  }
  const updateTable = (tl) => {
    user[tl].task = `<strike>${user[tl].task}</strike>`;
    setUser([...user]);
    
  };

  const deleteList = (id) => {
    alert("Really want to delete Task?");
    axios.delete(`${URL}/${id}`);
    getData();
  };
  return (
    <div>
      <NavBar  />
      <h1 className="mt-3" style={{ textAlign: "center" }}>
        What's Up {name}!
      </h1>
      <Container>
        <h3 className="mt-5">Add Tasks</h3>
        <Form style={{ width: "50%" }}>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text"  ref={taskRef} placeholder="Enter Task" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              ref={priorityRef}
              type="number"
             
              placeholder="Enter Priority"
            />
          </Form.Group>

          <Button onClick={() => addTask()} variant="primary">
            Submit
          </Button>
        </Form>
      </Container>
      <Container>
        <h4 className="mt-5" style={{ textAlign: "center" }}>
          Todays Tasks
        </h4>
        <Table className="mt-5" striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          {user.map((tl, index) => (
            <tbody key={tl.id}>
              <tr>
                <td>{Parser(tl.task)}</td>
                <td>{tl.priority}</td>
                <td>
                  <i  onClick={() => updateTable(index)} style={{"fontSize":"30px", "color":"green"}} className="fas fa-check-circle "></i>
                  <i onClick={() => deleteList(tl.id)} style={{"fontSize":"30px", "color":"red","marginLeft":"10px"}} className="fas fa-times"></i>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </div>
  );
}
