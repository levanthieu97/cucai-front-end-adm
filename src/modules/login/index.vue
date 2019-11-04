<template>
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-4">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Củ cải Store</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
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
                <v-spacer></v-spacer>
                <v-btn color="primary">Quay lại</v-btn>
                <v-btn color="primary">Đăng nhập</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>