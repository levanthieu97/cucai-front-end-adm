<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn @click="handleLogoutClick()">Logout</v-btn>
      </v-toolbar-items>

      <!-- <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>-->
    </v-toolbar>
  </div>
</template>
<script>
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions("login", ["logout"]),

    handleLogoutClick() {
      this.logout().then(() => this.$router.push({ path: '/login' }));
    },
  }
};
</script>