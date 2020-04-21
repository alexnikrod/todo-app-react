import * as axios from "axios";

//const instance = axios.create({
//  baseURL: "http://localhost:3001/"
//});

export const todoAPI = {
  getLists() {
    return axios.get(`/lists?_expand=color&_embed=tasks`).then(({ data }) => {
      return data;
    });
  },
  getColors() {
    return axios.get(`/colors`).then(({ data }) => {
      return data;
    });
  },
  addTask(obj) {
    return axios
      .post(`/tasks`, obj)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        alert("Can't add task");
      });
  },
  editTask(taskId, newText) {
    return axios
      .patch(`/tasks/${taskId}`, {
        text: newText
      })
      .catch(() => {
        alert("Can't update task");
      });
  },
  deleteTask(taskId) {
    return axios.delete(`/tasks/${taskId}`).catch(() => {
      alert("Can't delete task");
    });
  },
  completeTask(taskId, completed) {
    return axios.patch(`/tasks/${taskId}`, { completed }).catch(() => {
      alert("Can't complete task");
    });
  },
  removeList(listId) {
    return axios.delete(`/lists//${listId}`);
  },
  addList(name, colorId) {
    return axios
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
    return axios.patch(`/lists/${listId}`, { name }).catch(() => {
      alert("Cant reload list");
    });
  }
};
