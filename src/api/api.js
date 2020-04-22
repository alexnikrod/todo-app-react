import * as axios from "axios";

const instance = axios.create({
  baseURL: "/"
});

export const todoAPI = {
  getLists() {
    return instance.get(`lists?_expand=color&_embed=tasks`).then(({ data }) => {
      return data;
    });
  },
  getColors() {
    return instance.get(`colors`).then(({ data }) => {
      return data;
    });
  },
  addTask(obj) {
    return instance
      .post(`tasks`, obj)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        alert("Can't add task");
      });
  },
  editTask(taskId, newText) {
    return instance
      .patch(`tasks/${taskId}`, {
        text: newText
      })
      .catch(() => {
        alert("Can't update task");
      });
  },
  deleteTask(taskId) {
    return instance.delete(`tasks/${taskId}`).catch(() => {
      alert("Can't delete task");
    });
  },
  completeTask(taskId, completed) {
    return instance.patch(`tasks/${taskId}`, { completed }).catch(() => {
      alert("Can't complete task");
    });
  },
  removeList(listId) {
    return instance.delete(`lists//${listId}`);
  },
  addList(name, colorId) {
    return instance
      .post(`lists`, {
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
    return instance.patch(`lists/${listId}`, { name }).catch(() => {
      alert("Cant reload list");
    });
  }
};
