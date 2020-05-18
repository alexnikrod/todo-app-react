import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://todo-app-react-delta.now.sh/"
});

export const todoAPI = {
  getLists() {
    return instance
      .get(`lists?_expand=color&_embed=tasks`)
      .then(response => {
        return response.data;
      });
  },
  async getColors() {
    const { data } = await instance.get(`/colors`);
    return data;
  },
  async addTask(obj) {
    try {
      const { data } = await instance
        .post(`/tasks`, obj);
      return data;
    }
    catch (e) {
      alert("Can't add task");
    }
  },
  async editTask(taskId, newText) {
    try {
      return instance
        .patch(`/tasks/${taskId}`, {
          text: newText
        });
    }
    catch (e) {
      alert("Can't update task");
    }
  },
  async deleteTask(taskId) {
    try {
      return instance.delete(`/tasks/${taskId}`);
    }
    catch (e) {
      alert("Can't delete task");
    }
  },
  async completeTask(taskId, completed) {
    try {
      return instance.patch(`/tasks/${taskId}`, { completed });
    }
    catch (e) {
      alert("Can't complete task");
    }
  },
  removeList(listId) {
    return instance.delete(`/lists//${listId}`);
  },
  async addList(name, colorId) {
    try {
      const { data } = await instance
        .post(`/lists`, {
          name,
          colorId
        });
      return data;
    }
    catch (e) {
      alert("Can't add new list");
    }
  },
  async editList(listId, name) {
    try {
      return instance.patch(`/lists/${listId}`, { name });
    }
    catch (e) {
      alert("Cant reload list");
    }
  }
};
