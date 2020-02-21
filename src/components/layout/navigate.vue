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
      <h3 class="store-title">Cu Cai Store</h3>
    </v-toolbar>

    <vue-perfect-scrollbar :settings="scrollSettings" class="drawer-menu--scroll my_style" style="overflow-x: hidden">
      <v-list dense expand>
        <template v-for=" (item,i) in app_menu">
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :value="computeGroupActive(item)"
            :class="[$route.meta.group == item.group ? 'active' : '']"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <v-list-item slot="activator" ripple="ripple">
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <template v-for=" (subItem,i) in item.items">
              <!--  -->
              <v-list-item
                :key="i"
                :to="genChildTarget(item,subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple"
                style="padding-left:56px"
              >
                <v-icon class="sub_icon">panorama_fish_eye</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{subItem.title}}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{subItem.action}}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">{{item.header}}</v-subheader>
          <v-divider v-else-if="item.divider" :key="i" />
          <v-list-item
            v-else
            :key="item.name"
            :to="!item.href ? {name: item.name} : null"
            :href="item.href"
            :class="[
              'simple-list-item',
              $route.name == item.name ? 'active' : '']"
            :disabled="item.disabled"
            :target="item.target"
            ripple="ripple"
            rel="noopener"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
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
    ...mapState("dashboard", ["menu"]),
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
    },

    app_menu() {
      let app_mn = [];
      _.forEach(this.menu, menu => {
        app_mn = _.concat(app_mn, this.readMenu(menu));
      });
      return app_mn;
    }
  },

  methods: {
    ...mapActions("global", ["toggleDrawer"]),

    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    },

    computeGroupActive(item) {
      return item.group == this.$route.meta.group;
    },

    readMenu(menu) {
      let safeMenu = _.cloneDeep(menu);
      if (_.has(safeMenu, "name")) {
        if (safeMenu.name === "Dashboard") {
          return [safeMenu];
        }

        if (!_.has(safeMenu, "items") || safeMenu.items.length == 0) {
          return [];
        }

        let subMenu = [];
        _.forEach(safeMenu.items, item => {
          if (_.has(item, "component")) {
            subMenu.push(item);
          }
        });
        if (subMenu.length > 0) {
          safeMenu.items = subMenu;
          return [safeMenu];
        }
      }
      return [safeMenu];
    }
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
.sub_item {
  padding-left: 56px;
  padding-right: 0px;
}
</style>

<style lang="stylus">
#appDrawer {
  overflow: hidden;
  background-color: #222d32;

  .drawer-menu--scroll {
    height: calc(100vh - 50px);
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
</style>

