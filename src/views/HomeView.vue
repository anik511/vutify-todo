<template>
  <div class="home pa-10">
    <v-card max-width="475" class="mx-auto mb-3">
      <transition name="input" mode="out-in">
        <div v-if="!textFildVisible" class="text-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="visibleIt" v-on="on" text small class="py-5 ma-3">
                <v-icon color="green lighten-2">mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add new task</span>
          </v-tooltip>
        </div>

        <v-text-field
          v-if="textFildVisible"
          v-model="newTask"
          class="px-3 pt-2"
          outlined
          label="Add Task"
          clearable
          hide-details
        >
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon @click="addDescription" v-on="on">
                  {{ editorOpen ? 'mdi-minus' : 'mdi-message-text' }}</v-icon
                >
              </template>
              {{ editorOpen ? 'Close Description' : 'Add Description' }}
            </v-tooltip>
          </template>
        </v-text-field>
      </transition>
      <transition name="text-editor">
        <vue-editor v-if="editorOpen" class="pa-3" v-model="description" />
      </transition>
      <transition name="add-close">
        <div class="text-center" v-if="textFildVisible">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="submitTask" v-on="on" text small class="py-5 ma-3">
                <v-icon color="green lighten-2">mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add new task</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="visibleIt" v-on="on" text small class="py-5 ma-3">
                <v-icon color="red lighten-2">mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Cancle</span>
          </v-tooltip>
        </div>
      </transition>
    </v-card>
    <v-card max-width="475" class="mx-auto">
      <transition name="text-editor" mode="out-in">
        <v-list flat v-if="tasks.length">
          <transition-group name="list" tag="div">
            <div v-for="(task, i) in tasks" :key="task.id">
              <v-list-item
                @click="taskStatusChange(task.id)"
                :class="{ 'green lighten-2': task.completed }"
              >
                <template v-slot:default>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="task.completed"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title :class="{'text-decoration-line-through text--disabled':task.completed,}">
                      {{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle :class="{'text-decoration-line-through text--disabled':task.completed,}"
                      v-html="task.description || 'No description'"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-html="task.dateTime || ''"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click.stop="removeTask(task.id)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider v-if="tasks.length != i + 1"></v-divider>
            </div>
          </transition-group>
        </v-list>

        <div v-if="!tasks.length">
          <v-card-text class="text-center">
            <v-img src="../assets/empty.jpg"></v-img>
            <!-- <v-icon color="primary">mdi-check-circle-outline</v-icon> -->
            <h3 class="mt-3">No tasks yet</h3>
          </v-card-text>
        </div>
      </transition>
    </v-card>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: { VueEditor },
  data() {
    return {
      newTask: '',
      description: '',
      textFildVisible: false,
      editorOpen: false,
    };
  },
  computed: {
    ...mapState(['tasks']),
  },
  methods: {
    visibleIt() {
      this.textFildVisible = !this.textFildVisible;
      if (this.editorOpen) {
        this.editorOpen = !this.editorOpen;
      }
    },
    submitTask() {
      function getDateTime() {
        // Get current date and time
        const now = new Date();

        // Get day, month, year
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString();

        // Get hours and minutes
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Convert to 12-hour format and add AM/PM
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');

        // Combine all parts into the desired format
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
      }
      if (this.newTask != '') {
        let tasks = {
          id: this.tasks.length + 1,
          title: this.newTask,
          description: this.description,
          completed: false,
          dateTime: getDateTime(),
        };
        //dispatch addTask
        this.addTask(tasks);
        this.newTask = '';
        this.description = '';
        this.textFildVisible = false;
        this.editorOpen = false;
      }
    },
    addDescription() {
      this.editorOpen = !this.editorOpen;
    },
    taskStatusChange(id) {
      this.doneTask(id);
    },
    removeTask(id) {
      this.deleteTask(id);
    },
    ...mapActions(['addTask', 'deleteTask', 'doneTask']),
  },
};
</script>
<style scoped>
.input-enter-active {
  transition: all 0.5s ease;
}
.input-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.input-enter, .input-leave-to /* .add-close-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}

.text-editor-enter-active {
  transition: opacity 1.5s;
}
.text-editor-leave-active {
  transition: opacity 1s;
}
.text-editor-enter, .text-editor-leave-to /* .text-editor-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.add-close-enter-active {
  transition: all 0.8s ease;
}
.add-close-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.add-close-enter, .add-close-leave-to /* .add-close-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
