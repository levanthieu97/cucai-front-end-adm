<template>
  <v-navigation-drawer
    id="appDrawer"
    v-model="drawer"
    :mini-variant.sync="mini"
    :dark="$vuetify.dark"
    fixed
    app
    width="260"
  >
    <v-toolbar color="primary" dark height="50">
      <h3 class="store-title"> 
        Cu Cai Store
      </h3>
    </v-toolbar>

    <vue-perfect-scrollbar :settings="scrollSettings" class="drawer-menu--scroll my_style">
        
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: {
    width: {
      type: Number,
      default: 250
    }
  },

  components: {
    VuePerfectScrollbar
  },

  data() {
    return {
      mini: false,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    };
  },

  computed: {
    ...mapState('dashboard',['menu']),
    ...mapState("global", ["drawerToggled"]),

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },

    drawer: {
      get() {
        return this.draweToggled;
      },

      set(val) {
        this.toggleDrawer(val);
      }
    }
  },

  methods: {
      ...mapActions('global',['toggleDrawer']),
  }
};
</script>

<style scoped>
.store-title {
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font: italic small-caps bold 26px/4 cursive;
}
</style>


