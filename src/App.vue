<template>
  <div>
    <template v-if="$route.meta.requiresAuth">
      <v-app>
        <navDrawer class="app--drawer"/>
        <tool-bar/>
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

  methods: {
    ...mapActions("global", ["resetMsg"])
  }
};
</script>


