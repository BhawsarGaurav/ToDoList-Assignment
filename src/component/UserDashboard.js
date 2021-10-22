import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/button";
import NavBar from "./NavBar";
import { Table, Form, Container } from "react-bootstrap";
import Parser from "react-html-parser";
import axios from "axios";

export default function UserDashboard() {
  const [user, setUser] = useState([]);
  const [flag, setFlag] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const URL = "http://localhost:3000/todoList";
  let arr = JSON.parse(localStorage.getItem("employee"));
  const id = arr["id"];
  const name = arr["ename"];
  let sample = [];
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    axios.get(`${URL}`).then(function (response) {
      const data = response.data;
      for (const t in data) {
        if (data[t]["userId"] === id) {
          sample.push(data[t]);
        }
      }

      setUser(sample);
    });
  }
  function addTask() {
    let TaskData = {
      userId: id,
      task: document.getElementById("task").value,
      priority: document.getElementById("priority").value,
    };

    axios.post(URL, TaskData);
    document.getElementById("task").value = "";
    document.getElementById("priority").value = "";
    getData();
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
      <NavBar />
      <h1 className="mt-3" style={{ textAlign: "center" }}>
        What's Up {name}!
      </h1>
      <Container>
        <h3 className="mt-5">Add Tasks</h3>
        <Form style={{ width: "50%" }}>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" id="task" placeholder="Enter Task" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="number"
              id="priority"
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
                  <Button onClick={() => updateTable(index)}>Completed</Button>{" "}
                  <Button onClick={() => deleteList(tl.id)}>Delete</Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </div>
  );
}
