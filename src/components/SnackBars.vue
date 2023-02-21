<template>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.snackBarColor"
  >
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="snackbar.snackBarColor != 'red lighten-2' ? 'blue' : 'black'"
        text
        v-bind="attrs"
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'SnackBars',

  computed: {
    ...mapState(['snackbar']),
  },
  data: () => ({}),
  methods: {
    closeSnackbar() {
      this.closeSnackbar();
    },
    ...mapActions(['closeSnackbar']),
  },
};
</script>
