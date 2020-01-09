<template>
  <v-app>
    <v-content>
      <!-- <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-4 pb-2">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Củ cải Store</v-toolbar-title>
      </v-toolbar>-->
      <!-- <v-card-text class="pa-0">
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
      </v-card-actions>-->
      <!-- <v-row align="center" justify="center" class="my-2">
                <i class="far fa-heart mx-1" />
                <i class="far fa-heart mx-1" />
                <i class="far fa-heart mx-1" />
      </v-row>-->
      <!-- <v-card-text class="py-0 mt-3">
                <v-form>
                  <v-container>
                    <v-text-field
                      label="Email"
                      ref="email"
                      v-model="email"
                      prepend-icon="face"
                      :rules="emailRules"
                      type="email"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Mật Khẩu"
                      ref="password"
                      v-model="password"
                      prepend-icon="lock"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      @click:append="hidePassword = !hidePassword"
                      class="input-group--focused"
                      :type="hidePassword ? 'text': 'password'"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                    <v-alert
                      :value="!hasLoadedOnce"
                      color="failure"
                      type="error"
                      elevation="2"
                      border="top"
                      colored-border
                    >{{ message }}</v-alert>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  class="mt-0 text-capitalize"
                  :loading="loading"
                  :disabled="isProcess"
                  @click="handleLogin"
                >Đăng Nhập</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
      </v-row>-->

      <div class="main">
        <section class="sign-in">
          <div class="container">
            <div class="signin-content">
              <div class="signin-image">
                <figure>
                  <img src="~assets/images/signin-image.jpg" alt="sing up image" />
                </figure>
                <a @click="redirectRegister" class="signup-image-link">Tạo tài khoản</a>
              </div>

              <div class="signin-form">
                <h2 class="form-title">Củ Cải Shop</h2>
                <v-form id="login-form" :lazy-validation="lazy" ref="formLogin">
                  <v-alert
                    :value="!hasLoadedOnce"
                    outlined
                    type="error"
                    elevation="2"
                    border="top"
                  >{{ message }}</v-alert>
                  <div class="form-group">
                    <v-text-field
                      label="Email"
                      ref="email"
                      v-model="email"
                      prepend-icon="face"
                      :rules="emailRules"
                      type="email"
                    ></v-text-field>
                  </div>
                  <div class="form-group">
                    <v-text-field
                      label="Mật Khẩu"
                      ref="password"
                      v-model="password"
                      prepend-icon="lock"
                      :rules="passwordRules"
                      required
                      :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="hidePassword ? 'text' : 'password'"
                      @click:append="hidePassword = !hidePassword"
                    ></v-text-field>
                  </div>
                  <div class="form-group form-button">
                    <v-btn
                      color="primary"
                      class="mt-0 text-capitalize"
                      :loading="loading"
                      :disabled="isProcess"
                      @click="handleLogin"
                    >Đăng Nhập</v-btn>
                  </div>
                </v-form>
                <div class="social-login">
                  <span class="social-label">Đăng nhập với</span>
                  <ul class="socials" style="padding-left:0px">
                    <li>
                      <a href="#">
                        <i class="display-flex-center zmdi zmdi-facebook d-flex"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="display-flex-center zmdi zmdi-google d-flex"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </v-content>
  </v-app>
</template>


<script>
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "core/constant";
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";
import Service from "core/service";
import "assets/css/style.css";
import "assets/fonts/material-icon/css/material-design-iconic-font.min.css";
import "@mdi/font/css/materialdesignicons.css";

export default {
  data() {
    return {
      email: "",
      password: "",
      linkFacebook: FACEBOOK_AUTH_URL,
      linkGoogle: GOOGLE_AUTH_URL,
      isProcess: false,
      loading: false,
      hidePassword: false,
      checkEmail: false,
      lazy: false,
      emailRules: [
        v => !!v || "Vui lòng nhập E-mail.",
        v => /.+@.+\..+/.test(v) || "Phải có ký tự '@'."
      ],
      passwordRules: [v => !!v || "Vui lòng nhập mật khẩu"]
    };
  },

  // computed chứa getters
  // computed thay chứa các property và xử lý các property của data. property của computed được lưu trong bộ nhớ cache.
  // computed mặc định là phương thức getter. có getter và setter. computed chỉ thay đổi khi có setter hay thay đổi giá trị bên trong hàm.
  computed: {
    ...mapGetters("login", ["hasLoadedOnce", "message"])
  },

  mounted() {
    Service.interceptors({
      request: request => {
        return request;
      }
    });
  },

  // khi bạn tác động đến property data -> xử lý hành động gì đó
  watch: {},

  methods: {
    ...mapActions("login", ["login"]),

    async handleLogin() {
      this.loading = true;
      this.isProcess = true;
      console.log(this.$refs.formLogin.validate());
      if (!this.email) {
        this.$refs.email.focus();
      } else if (!this.password) {
        this.$refs.password.focus();
      } else if (!this.$refs.formLogin.validate()) {
        this.$refs.email.focus();
      } else {
        await this.login({
          email: this.email,
          password: this.password
        });
      }
      this.loading = false;
      this.isProcess = false;
    },

    redirectRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style scoped>
.fa-heart {
  color: #b71c1c;
}
</style>
