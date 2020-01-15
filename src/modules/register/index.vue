<template>
  <v-content>
    <div class="main">
      <!-- Sign up form -->
      <section class="signup">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Đăng Ký</h2>
              <!-- <div class="form-group">
                  <label for="name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input type="text" name="name" id="name" placeholder="Your Name" />
                </div>
                <div class="form-group">
                  <label for="email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input type="email" name="email" id="email" placeholder="Your Email" />
                </div>
                <div class="form-group">
                  <label for="pass">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input type="password" name="pass" id="pass" placeholder="Password" />
                </div>
                <div class="form-group">
                  <label for="re-pass">
                    <i class="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                  />
              </div>-->
              <v-form :lazy-validation="lazy" ref="formRegister">
                <v-text-field
                  ref="email"
                  v-model="user.email"
                  :rules="emailRules"
                  type="email"
                  prepend-inner-icon="email"
                  label="Email"
                  required
                  dense
                />
                <v-text-field
                  ref="password"
                  v-model="user.password"
                  :rules="passwordRules"
                  type="password"
                  label="Mật khẩu"
                  prepend-inner-icon="lock"
                  required
                />
                <v-text-field
                  ref="confirmpassword"
                  v-model="user.confirmpassword"
                  :rules="confirmpasswordRules"
                  type="password"
                  label="Xác nhận mật khẩu"
                  prepend-inner-icon="lock"
                  required
                />
                <v-text-field
                  ref="fullname"
                  v-model="user.fullname"
                  :rules="fullnameRules"
                  prepend-inner-icon="face"
                  label="Họ và tên của bạn"
                  required
                />
                <div class="form-group">
                  <label class="label-agree-term">
                    <span>
                      <span></span>
                    </span>Đăng ký nhận nhiều ưu đãi với
                    <a
                      @click="redirectLogin"
                      class="term-service"
                    >CuCaiShop.com</a>
                  </label>
                </div>
                <v-row class="justify-center">
                  <v-btn
                    color="primary"
                    primary
                    @click="handleRegister"
                    :loading="loading"
                    :disabled="isProcess"
                  >Đăng ký</v-btn>
                </v-row>
              </v-form>
            </div>
            <div class="signup-image">
              <figure>
                <img src="~assets/images/signup-image.jpg" alt="sing up image" />
              </figure>
              <a @click="redirectLogin" class="signup-image-link">Tôi đã là thành viên !!!</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </v-content>
</template>
<script>
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";
import "assets/css/style.css";
import "assets/fonts/material-icon/css/material-design-iconic-font.min.css";

export default {
  data() {
    return {
      user: {
        password: "",
        fullname: "",
        email: "",
        confirmpassword: ""
      },
      loading: false,
      isProcess: false,
      emailRules: [
        v => !!v || "Vui lòng nhập Email",
        v => /.+@.+/.test(v) || "Phải có ký tự '@'."
      ],
      lazy: false,
      passwordRules: [v => !!v || "Vui lòng nhập mật khẩu"],
      fullnameRules: [v => !!v || "Vui lòng nhập họ và tên của bạn"],
      confirmpasswordRules: [v => !!v || "Vui lòng xác nhận mật khẩu"]
    };
  },

  computed: {
    ...mapGetters("register", [
      "signal",
      "register_message",
      "register_success"
    ])
  },

  watch: {
    signal() {
      if (this.register_success) {
        this.showSuccessMsg(this.register_message);
      } else {
        this.showErrorMsg(this.register_message);
      }
    }
  },

  methods: {
    ...mapActions("global", ["showErrorMsg", "showSuccessMsg"]),
    ...mapActions("register", ["registerNewUser"]),

    redirectLogin() {
      this.$router.push({ path: "/login" });
    },

    async handleRegister() {
      this.loading = true;
      this.isProcess = true;
      if (!this.user.email) {
        this.$refs.email.focus();
      } else if (!this.user.password) {
        this.$refs.password.focus();
      } else if (!this.user.confirmpassword) {
        this.$refs.confirmpassword.focus();
      } else if (!this.user.fullname) {
        this.$refs.fullname.focus();
      } else if (!this.$refs.formRegister.validate()) {
        this.$refs.email.focus();
      } else if (this.user.password != this.user.confirmpassword) {
        this.showErrorMsg("Xác nhận mật khẩu không đúng !");
      } else {
        await this.registerNewUser({
          email: this.user.email,
          password: this.user.password,
          full_name: this.user.fullname
        });
      }

      this.loading = false;
      this.isProcess = false;
    },
  }
};
</script>
<style scoped>
</style>