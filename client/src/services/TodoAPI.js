import axios from "axios";

axios.defaults.baseURL = "/api";

export const getTodos = async () => {
  try {
    const response = await axios.get("/todo");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}
export const addTodo = async (todo) => {
  try {
    const response = await axios.post("/todo", todo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

export const updateTodo = async (id, updates) => {
  try {
    const response = await axios.put(`/todo/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`/todo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}

export const toggleTodo = async (id) => {
  try {
    const response = await axios.patch(`/todo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
}
