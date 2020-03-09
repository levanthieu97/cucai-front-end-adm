<template>
  <v-app-bar app color="primary" dark height="50">
    <v-app-bar-nav-icon @click.stop="handleDrawerToggle" />
    <!-- <v-toolbar-title>Application</v-toolbar-title> -->
    <v-spacer />
    <span>{{this.myself}}</span>
    <v-icon>person</v-icon>
    <v-btn icon @click="handleLogoutClick()">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      sheet: false,
      myself : null
    };
  },

  computed: {
    ...mapState("global", ["drawerToggled"]),
    ...mapGetters("login", ["me"]),
    ...mapGetters("Auth", ["profile"])
  },

  created() {
    // this.loadProfile();
    console.log(typeof this.me);
    console.log(this.me);
    console.log(this.profile);
    (this.me === null) ? this.myself = this.profile.last_name : this.myself = this.me.full_name;
  },

  methods: {
    ...mapActions("login", ["logout"]),
    ...mapActions("global", ["toggleDrawer"]),

    handleDrawerToggle() {
      this.toggleDrawer(!this.drawerToggled);
    },

    handleLogoutClick() {
      this.logout().then(() => this.$router.push({ path: "/login" }));
    }


  }
};
</script>
<style scoped>
.custom-style .v-toolbar .v-toolbar__content {
  padding-left: 0;
  padding-right: 15px;
}

.personal {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  cursor: pointer;
  margin: 0 5px 0 0;
}

.personal:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.personal > img {
  float: left;
  height: 26px;
  margin: 12px auto;
}

.personal > div {
  float: right;
  margin: 14px 0 14px 14px;
  font-weight: 600;
}
</style>
