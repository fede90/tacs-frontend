<template>
  <div class="signin justify-content-center">
    <div class="container container-fluid">
      <div class="row">
        <div class="col-12 col-xl-6 col-lg-6 user-img">
          <img src="@/assets/union-githubs.png" />
        </div>
        <div class="col-12 col-xl-6 col-lg-6">
          <!--Sign in-->
          <div class="containerSignIn d-flex justify-content-center">
            <div class="d-flex justify-content-center h-100">
              <div class="card">
                <!-- Cabecera-->
                <div class="card-header">
                  <h3>Sign In</h3>
                  <div class="d-flex justify-content-end">
                    <span>
                      <img src="@/assets/avatar-user.png" />
                    </span>
                  </div>
                </div>

                <!--Username y Password -->
                <div class="card-body">
                  <b-form @submit="onSubmit">
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i>&#128526;</i>
                        </span>
                        <!--Dibujo cara-->
                      </div>
                      <b-form-input
                        id="input-4"
                        v-model="form.username"
                        required
                        class="form-control"
                        placeholder="Ingresar username"
                      ></b-form-input>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i>&#128273;</i>
                        </span>
                        <!--Dibujo llave-->
                      </div>
                      <b-form-input
                        id="input-4"
                        v-model="form.pass"
                        required
                        class="form-control"
                        type="password"
                        placeholder="password"
                      ></b-form-input>
                    </div>

                    <!--Boton login-->
                    <div class="form-group">
                      <input
                        type="submit"
                        value="Login"
                        class="btn float-right login_btn"
                      />
                    </div>
                  </b-form>
                </div>

                <!--Pie del Sign in (Para que se cree una cuenta si no la tiene)-->
                <div class="card-footer">
                  <div class="d-flex justify-content-center links">
                    Don't have an account?
                    <router-link to="/signup">Sign Up</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Fin sign in-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/components/backend-api";
export default {
  name: "Signup",
  data() {
    return {
      errors: [],
      response: {},
      form: {
        pass: "",
        username: ""
      },
      show: true
    };
  },

  methods: {
    loginUser() {
      var vm = this;
      api
        .login(this.form)
        .then(response => {
          vm.response = response.data;
          vm.$cookies.set("token", response.data.data);
          vm.$router.push("Home");
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.loginUser();
    }
  }
};
</script>
<style>
.signin .container {
  padding-top: 90px;
}

.signin .containerSignIn {
  height: 100%;
  align-content: right;
}

.signin .card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.signin .card-header h3 {
  color: white;
}

.signin .card-body {
  margin-top: 30px;
}

.signin .card-header {
  margin-top: auto;
  margin-bottom: -20px;
}

.signin .input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

.signin input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.signin .remember {
  color: white;
}

.signin .remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.signin .login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}

/*Imagen logo github login*/
.user-img img {
  width: 100%;
  height: 100%;
}

/*Imagen avatar login*/
.d-flex img {
  width: 70px;
  height: 70px;
  margin-top: -50px;
  margin-bottom: auto;
}
</style>
