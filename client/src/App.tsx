import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Row, Col, Button, ListGroup, Form } from "react-bootstrap";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  function addNewTodo() {
    setTodoList([...todoList, newTodo]);
    setNewTodo("");
  }

  function removeTodo(index) {
    setTodoList(todoList.filter((_, i) => i !== index));
  }

  function reorderArray(e, todoArr) {
    const listItem = todoArr.find((_, index) => index === e.oldIndex);
    const remainingListItems = todoArr.filter(
      (_, index) => index !== e.oldIndex
    );

    const reorderedItems = [
      ...remainingListItems.slice(0, e.newIndex),
      listItem,
      ...remainingListItems.slice(e.newIndex),
    ];

    return reorderedItems;
  }

  function changeOrder(index, direction) {
    let newIndex;

    if (direction === "UP" && index > 0) {
      newIndex = index - 1;
    } else if (direction === "DOWN" && index < todoList.length - 1) {
      newIndex = index + 1;
    } else {
      return;
    }

    setTodoList(
      reorderArray({ oldIndex: index, newIndex: newIndex }, todoList)
    );
  }

  return (
    <main className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div>
        <h1 className="mt-5">To-Do-List</h1>
      </div>
      <Container className="text-center">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Create your to-do's:</Form.Label>
                <Form.Control
                  value={newTodo}
                  type="text"
                  placeholder="......"
                  onChange={handleNewTodoChange}
                />
              </Form.Group>
            </Form>
            <ListGroup as="ol" numbered>
              {todoList.map((todo, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span className="mx-3">{todo}</span>
                  <div>
                    <a
                      className="mx-1 text-dark"
                      onClick={() => changeOrder(index, "UP")}
                      role="button"
                    >
                      <i
                        className="bi bi-arrow-up-circle"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </a>
                    <a
                      className="mx-1 text-dark"
                      onClick={() => changeOrder(index, "DOWN")}
                      role="button"
                    >
                      <i
                        className="bi bi-arrow-down-circle"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </a>
                    <a
                      className="mx-2 mt-3 text-danger"
                      onClick={() => removeTodo(index)}
                      role="button"
                    >
                      <i
                        className="bi bi-trash3"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </a>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              variant="secondary"
              size="lg"
              className="mx-2 mt-3"
              onClick={addNewTodo}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
