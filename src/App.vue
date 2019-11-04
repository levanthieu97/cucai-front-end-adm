<template>
  <div>
    <template v-if="$route.meta.requiresAuth">
      <v-app>
        <nav-drawer class="app--drawer"/>
        <toolbar/>
        <v-content class="content-page-wrapper">
          <div class="page-wrapper">
            <div :class="['view-header', $route.meta.title ? '' : 'hidden']">{{ $route.meta.title }}</div>
            <router-view />
          </div>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </template>
    <v-snackbar :timeout="3000" :color="snackbar.color" :multi-line="true" v-model="show" top right>
      {{ snackbar.text }}
      <v-btn dark flat icon @click.native="show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import _ from "lodash";
import AppEvents from "core/event";
import { mapState, mapGetters, mapActions } from "vuex";
import { NavDrawer, ToolBar } from "components/layout";
import "assets/css/global.css";
import "assets/css/custom.css";
import "assets/scss/style.scss";

export default {
  components: {
    NavDrawer,
    ToolBar
  },
  computed: {
    ...mapGetters("login", ["isAuthenticated"]),
    ...mapState("global", ["snackbar", "loading"]),

    show: {
      get() {
        return this.snackbar.show;
      },
      set() {
        this.resetMsg();
      }
    }
  },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
  },

  methods: {
    ...mapActions("global", ["resetMsg"])
  }
};
</script>

// <style lang="scss" scoped>
// .setting-fab {
//   top: 50% !important;
//   right: 0;
//   border-radius: 0;
// }

// .page-wrapper {
//   min-height: calc(100vh - 64px - 50px - 81px);
//   background-color: #ecf0f5;
// }

// .view-header {
//   font-size: 25px;
//   width: 100%;
//   padding: 10px 24px 0;
//   margin: 0 0 -14px;
// }

// .view-header.hidden {
//   height: 0 !important;
//   padding: 0 !important;
//   margin: 0 !important;
// }
// </style>
