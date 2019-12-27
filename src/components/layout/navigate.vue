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
