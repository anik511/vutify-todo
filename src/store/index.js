import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        dateTime: '12-02-2023 09:36 am'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
        dateTime: '12-02-2023 10:36 am'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        completed: false,
        dateTime: '11-02-2023 10:36 am'
      },
    ],
    snackbar: {
      show: false,
      text: 'What are you doing?',
      snackBarColor: 'success',
      timeout: 1000,
    },
  },
  getters: {},
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
      state.snackbar.show = true;
      state.snackbar.text = 'Task added successfully !!';
      state.snackbar.snackBarColor = 'success lighten-2';
    },

    DELETE_TASK(state, payload) {
      //payload is id
      state.tasks = state.tasks.filter((task) => task.id !== payload);
      state.snackbar.show = true;
      state.snackbar.text = 'Task deleted successfully !!';
      state.snackbar.snackBarColor = 'red lighten-2';
    },
    DONE_TASK(state, payload) {
      //payload is id
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload) {
          task.completed = !task.completed;
        }
        return task;
      });
      state.snackbar.show = true;
      state.snackbar.text = 'Task completed successfully !!';
      state.snackbar.snackBarColor = 'dark lighten-2';
    },
    CLOSE_SNACKBAR(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('ADD_TASK', task);
    },
    deleteTask({ commit }, id) {
      commit('DELETE_TASK', id);
    },
    doneTask({ commit }, id) {
      commit('DONE_TASK', id);
    },
    closeSnackbar({ commit }) {
      commit('CLOSE_SNACKBAR');
    },
  },
  modules: {},
});
