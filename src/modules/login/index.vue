<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-4">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Củ cải Store</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="pa-0">
                <v-row align="center" justify="center">
                  <v-col>
                    <h2 class="text-center font-weight-regular">Đăng nhập với</h2>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-btn
                    large
                    color="#283593"
                    dark
                    class="text-capitalize"
                    max-height="350"
                    :href="linkFacebook"
                  >
                    <i class="fab fa-facebook mx-2" dark></i>Facebook
                  </v-btn>
                  <v-btn large class="text-capitalize" :href="linkGoogle">
                    <i class="fab fa-google mx-2" dark></i>Google
                  </v-btn>
                </v-row>
              </v-card-actions>
              <v-row align="center" justify="center">
                <i class="far fa-heart mx-1" />
                <i class="far fa-heart mx-1" />
                <i class="far fa-heart mx-1" />
              </v-row>
              <v-card-text class="pt-0">
                <v-form>
                  <v-text-field
                    label="Tài Khoản"
                    v-model="username"
                    name="login"
                    prepend-icon="face"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Mật Khẩu"
                    name="password"
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary">Đăng nhập</v-btn>
              </v-card-actions>
              <v-card-actions class="pt-0">
                <v-btn block color="primary">Đăng ký</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "core/constant";
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      linkFacebook: FACEBOOK_AUTH_URL,
      linkGoogle: GOOGLE_AUTH_URL
    };
  },

  watch: {},

  methods: {}
};
</script>

<style scoped>
.fa-heart {
  color: #b71c1c;
}
</style>