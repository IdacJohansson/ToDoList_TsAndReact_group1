import React, { useState, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container, Row, Col, Button, ListGroup, Form } from "react-bootstrap";

// Sets the type of direction allowed
type Direction = "UP" | "DOWN";

// Sets the format of a list item
interface TodoItem {
  text: string;
}
interface reorderInterface {
  oldIndex: number;
  newIndex: number;
}

function App() {
  const [newTodo, setNewTodo] = useState<TodoItem>({
    text: "",
  });
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({ text: e.target.value });
  };

  function addNewTodo(): void {
    setTodoList([...todoList, newTodo]);
    setNewTodo({
      text: "",
    });
  }

  function removeTodo(index: number): void {
    setTodoList(todoList.filter((_: TodoItem, i: number) => i !== index));
  }

  function reorderArray(e: reorderInterface, todoArr: TodoItem[]): TodoItem[] {
    if (
      e.oldIndex < 0 ||
      e.oldIndex >= todoArr.length ||
      e.newIndex < 0 ||
      e.newIndex >= todoArr.length
    ) {
      return todoArr;
    }
    const listItem = todoArr[e.oldIndex];
    const remainingListItems = todoArr.filter(
      (_, index: number) => index !== e.oldIndex
    );

    const reorderedItems = [
      ...remainingListItems.slice(0, e.newIndex),
      listItem,
      ...remainingListItems.slice(e.newIndex),
    ];

    return reorderedItems;
  }

  // Function to change the position of the item in the list
  function changeOrder(index: number, direction: Direction, todoList: TodoItem[]) {
    let newIndex: number = index;

    // Check if it can move up
    if (direction === "UP" && index > 0) {
      newIndex = index - 1;
    }
    // Check if it can move down
    else if (direction === "DOWN" && index < todoList.length - 1) {
      newIndex = index + 1;
    }
    // If unable to move, exit the function
    else {
      return;
    }

    // Reorder the list with the moved item
    const updatedList = reorderArray({ oldIndex: index, newIndex: newIndex, }, todoList);
    setTodoList(updatedList);
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
                  value={newTodo.text}
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
                  <span className="mx-3">{todo.text}</span>
                  <div>
                    <a
                      className="mx-1 text-dark"
                      onClick={() => changeOrder(index, "UP", todoList)}
                      role="button"
                    >
                      <i
                        className="bi bi-arrow-up-circle"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </a>
                    <a
                      className="mx-1 text-dark"
                      onClick={() => changeOrder(index, "DOWN", todoList)}
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
