<template></template>
<script>
import * as CONSTANTS from "core/constant";
import { mapActions } from 'vuex';
import Service from '../../core/service';

export default {
  data() {
    return {
      token: null
    };
  },

  watch: {},

  methods: {
    ...mapActions('oauth2redirect', ['registerSocialAccount'])
  },

  computed: {},

  created() {
    const { query: { token, error } } = this.$route;
    if (!token) return this.$router.push(`/login?errorMessage=${error}`);
    
    this.token = token;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    Service.setToken(token);
    // CALL WEB SERVER (token)
  }
};
</script>
<style scoped>
</style>