<template>
  <v-app>
    <template v-if="$route.meta.requiresAuth">
      <nav-drawer class="app--drawer" />
      <tool-bar class="app--toolbar"/>
      <v-content class="content-page-wrapper">
        <div class="page-wrapper">
          <div :class="['view-header', $route.meta.title ? '' : 'hidden']">{{ $route.meta.title }}</div>
          <router-view />
        </div>
      </v-content>
      <v-footer height="auto" class="white pa-3 app--footer">
          <v-spacer />
          <span class="caption" style="margin-right:10px"
            >Cu Cai Store &copy; {{ new Date().getFullYear() }}</span
          >
          <span class="caption mr-1"> Make With Love </span>
          <v-icon color="pink" small>favorite</v-icon>
          <span class="caption mr-1"> By Thieu Le</span>
        </v-footer>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="2000"
      :color="snackbar.color"
      :multi-line="true"
      v-model="show"
      top
      right
    >
      {{ snackbar.text }}
      <v-btn dark icon @click.native="show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
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

  methods: {
    ...mapActions("global", ["resetMsg"])
  }
};
</script>


<style lang="scss" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.content-page-wrapper {
  background-color: #ecf0f5;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
  background-color: #ecf0f5;
}

.view-header {
  font-size: 25px;
  width: 100%;
  padding: 10px 24px 0;
  margin: 0 0 -14px;
}

.view-header.hidden {
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
