<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="login_form_display">
            <q-form
            class="q-gutter-md"
            >
            <q-input
            filled
            v-model="email"
            label="Email"
            lazy-rules
            />
            <p v-if="email_error" class="error">Email is empty.</p>

            <q-input
            type="password"
            filled
            v-model="password"
            label="Password"
            lazy-rules

            />
            <p v-if="password_error" class="error">Password is empty.</p>

            <div class="q-gutter-sm">
              <q-checkbox 
              v-model="remember" 
              label="Remember" 
              />
            </div>

            <p v-if="auth_error" class="error">{{ auth_error_msg }}</p>


            <q-card-section>
              <div class="text-center q-pa-md q-gutter-md">
                <q-btn round color="indigo-7">
                  <q-icon name="fab fa-facebook-f" size="1.2rem" />
                </q-btn>
                <q-btn round color="red-8">
                  <q-icon name="fab fa-google-plus-g" size="1.2rem" />
                </q-btn>
                <q-btn round color="light-blue-5">
                  <q-icon name="fab fa-twitter" size="1.2rem" />
                </q-btn>
              </div>
            </q-card-section>

            <div>       

              <q-btn type="button" class="fit" color="primary" @click.prevent="authenticate">Login</q-btn>

            </div>

          </q-form>
          <div class="row justify-center" style="margin:20px;">  
            <q-btn flat color="primary" label="Create New Account" @click="$router.push('Register')" />
            <q-btn flat color="primary" label="Forgot your password?" @click="toggle" />
          </div>

        </q-card-section>


        <q-card-section v-if="forgot_password_display">
            <q-form
            class="q-gutter-md"
            >
            <q-input
            filled
            v-model="email"
            label="Email"
            />

            <p v-html="forgot_password_error" class="error"></p>
            
            <div>
              <q-btn type="button" class="fit" color="primary" @click.prevent="password_recovery">Send Recovery Password</q-btn>
            </div>
            </q-form> 
            <div class="row justify-center" style="margin:20px;">  
              <q-btn flat color="primary" label="Back to Login"  @click="toggle" />
            </div>         
        </q-card-section>


      </q-card>


    </q-page>
  </q-page-container>

</q-layout>

</template>

<script>
import axios from 'axios' 
import { Base64 } from 'js-base64';
import { Loading } from 'quasar';

import { LocalStorage } from 'quasar'


export default {

  /* Ciclo de vida del componente */
  mounted() {
    this.initForm();
  },
  data () {
    return {
      email: '',
      password: '',
      email: '',
      accept: false,

      remember: false,
      auth_error: false,
      auth_error_msg: "",
      email_error: false,
      password_error: false,
      forgot_password_display: false,
      forgot_password_error: '',
      login_form_display: true,
    }
  },

  methods: {

      password_recovery() {

        if(this.email){

          Loading.show();

          const payload = {
              "email": this.email
          }

          axios
            .post(process.env.ENV_API_URL + "/password_reset/", payload)
            .then((response) => {
              

              this.email='';
              this.forgot_password_error = '';

              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Your password recovery has been submitted'
              }); 
              
              Loading.hide();

              this.toggle();


          })
          .catch((error) => {

            Loading.hide();
            
            this.forgot_password_error = 'Your email is incorret, please check and try again';

            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Error: Somethings has been bad.'
            });


            
          });

        }else{
          Loading.hide();

          this.forgot_password_error = 'Your email is empty';
        }

      },


      authenticate() {

        this.email_error = false
        this.password_error = false
        this.auth_error = false

        if(this.email == "" || this.password == "" ){

            if(this.email == "") this.email_error = true
            if(this.password == "") this.password_error = true

        }else{

          Loading.show();

          const payload = {
            email: this.email,
            password: this.password,
          };

          axios
            .post(process.env.ENV_API_URL + "/login/", payload)
            //.post(process.env.ENV_API_URL + "/accounts/login/", payload)
            //.post(process.env.ENV_API_URL + "/authentication/login/", payload)
            //.post(this.$router.dashboard, payload)
            .then((response) => {
              
              this.$store.state.isAuthenticated = true;

              localStorage.setItem('user_data', JSON.stringify(response.data.user));

              this.$store.state.token = response.data.key;

              localStorage.setItem('auth_token', response.data.key);


              if(this.remember == true){

                this.setCookie("email", this.email, 30);
                const psd = Base64.encode(this.password);
                this.setCookie('psd', psd, 30);

              }else{

                this.setCookie('email','', 0);
                this.setCookie('psd', '', 0);

              }

              Loading.hide();

              this.$router.push({ name: "dashboard" });              
              // this.$router.push({ name: "config_general" });
          })
          .catch((error) => {

            Loading.hide();
            
            this.auth_error = true;
            this.auth_error_msg = error.response.data.non_field_errors[0];

            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Error: Somethings has been bad.'
            });

          });

        }

      },

      // Inicializa los datos del formulario cuando se crea el componente
      initForm(){          
          const email = this.getCookie('email');
          const psd = this.getCookie('psd');
          if( email && psd ){
              this.email = email;
              this.password = psd;
              this.remember = true;
          }
      },

      // establecer cookie
      setCookie(cName, value, expireDays){
          let exDate = new Date();
          exDate = exDate.setDate(exDate.getDate() + expireDays);
          document.cookie = cName + '='
              + value
              + ((expireDays === undefined) ? '' : ';expires=' + new Date(exDate).toUTCString())
      },

      // Obtener cookie
      getCookie(key){
        if( document.cookie.length > 0 ){
            let start = document.cookie.indexOf(key + '=');
            if( start !== -1 ){
                start = start + key.length + 1;
                let end = document.cookie.indexOf(';', start);

                if( end === -1 ){
                    end = document.cookie.length;
                    return Base64.decode(document.cookie.substring(start, end));
                } else{
                    return document.cookie.substring(start, end);
                }
            }
        }
        return ''
      },

      toggle () {
        this.forgot_password_display = !this.forgot_password_display
        this.login_form_display = !this.login_form_display
      },

    },
  };
</script>
<style>
.error {
  margin: 1rem;
  color: #ff4a96;
}


</style>
