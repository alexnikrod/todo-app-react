import axios from "axios";

//const instance = axios.create({
//  baseURL: "http://localhost:3001/"
//});

export const todoAPI = {
  getLists() {
    axios.get(`/lists?_expand=color&_embed=tasks`).then(({ data }) => {
      return data;
    });
  },
  getColors() {
    axios.get(`/colors`).then(({ data }) => {
      return data;
    });
  },
  addTask(obj) {
    axios
      .post(`/tasks`, obj)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        alert("Can't add task");
      });
  },
  editTask(taskId, newText) {
    axios
      .patch(`/tasks/${taskId}`, {
        text: newText
      })
      .catch(() => {
        alert("Can't update task");
      });
  },
  deleteTask(taskId) {
    axios.delete(`/tasks/${taskId}`).catch(() => {
      alert("Can't delete task");
    });
  },
  completeTask(taskId, completed) {
    axios.patch(`/tasks/${taskId}`, { completed }).catch(() => {
      alert("Can't complete task");
    });
  },
  removeList(listId) {
    axios.delete(`/lists//${listId}`);
  },
  addList(name, colorId) {
    axios
      .post(`/lists`, {
        name,
        colorId
      })
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        alert("Can't add new list");
      });
  },
  editList(listId, name) {
    axios.patch(`/lists/${listId}`, { name }).catch(() => {
      alert("Cant reload list");
    });
  }
};
