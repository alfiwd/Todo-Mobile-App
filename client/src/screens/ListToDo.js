import React, { useState, useEffect } from "react";
import { View, Button, Platform } from "react-native";
import { Box, Text } from "native-base";

import { API } from "../config/api";

export default function ListToDo() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await API.get("/todos");

      setTodos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  let todosEmpty = true;
  if (todos.length !== 0) {
    todosEmpty = false;
  }
  return (
    <Box safeArea>
      <Text>List To Do</Text>
      {todosEmpty ? <Text>Todos empty</Text> : todos.map((todo) => <Text>{todo.activity}</Text>)}
    </Box>
  );
}
