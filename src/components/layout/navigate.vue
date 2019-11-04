<template>
    <v-navigation-drawer
        :width="width"
        :mini-variant.sync="mini"
        :dark="$vuetify.dark"
        id="navDrawer"
        app
        fixed
    >
    </v-navigation-drawer>
</template>

<script>
import _ from 'lodash';
import { mapState,mapActions } from 'vuex';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
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

    data(){
        return {
            mini: false,
            scrollSettings: {
                maxScrollbarLength: 160
            }
        }
    },

    computed: {
        ...mapState('global', ['drawerToggled']),
        
        drawer: {
            get(){
                return this.draweToggled;
            },
            
            set(val){
                this.set
            }
        }
    }
}
</script>

<style lang="stylus">
#appDrawer {
  overflow: hidden;
  background-color: #222d32;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}

#logo {
    filter: brightness(0) invert(1);
    -webkit-filter: brightness(0) invert(1);
    margin: 0 auto;
}
</style>