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
                Register User
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="register_form_display">
            <q-form
            class="q-gutter-md"
            >

            <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            />
          
            <q-input
            filled
            v-model="email"
            label="Email"
            />        

            <q-input
            type="password"
            filled
            v-model="password"
            label="New Password"
            lazy-rules

            />

            <q-input
            type="password"
            filled
            v-model="password_confirmation"
            label="Renew Password"
            lazy-rules

            />

            <q-input
            filled
            v-model="first_name"
            label="First name"
            lazy-rules
            />
            
            <q-input
            filled
            v-model="last_name"
            label="Last name"
            lazy-rules
            />
            <p v-html="form_validation_message" class="error"></p>

            <q-input
            filled
            v-model="portfolio_id"
            label="Portfolio Id"
            lazy-rules
            />

            <div>

              <q-btn type="button" class="fit" color="primary" @click.prevent="send_register_form">Create Account</q-btn>

            </div>

          </q-form>
        </q-card-section>
        <q-card-section v-if="!register_form_display">
          <q-banner class="bg-primary text-white">
              <p>Account has been created, please check your inbox mail to activate.</p>
          </q-banner>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center" style="margin:0px 20px 20px 20px;">  
              <q-btn flat color="primary" label="Back to Login" @click="$router.push('/')" />
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
// import '../router/axiosInterceptor';
import { Loading } from 'quasar';



export default {
  data () {
    return {
      /*
      username: '',
      email: '',
      password: '',
      re_password: '',
      first_name: '',
      last_name: '',
      */
      username: 'rzavarce',
      email: 'rogerzavarce@gmail.com',
      password: 'raza.1234',
      password_confirmation: 'raza.1234',
      first_name: 'Roger',
      last_name: 'Zavarce',
      password_error: false,
      register_form_display: true,
      form_validation_message: '',
      portfolio_id: ''
    }
  },
  mounted () {

    this.portfolio_id = this.$route.params.portfolio_id

  },
  methods: {

      send_register_form(){


        if(this.username == ''){
          this.form_validation_message = 'Your username is empty';        
        }else if(this.email == ''){
          this.form_validation_message = 'Your email is empty';
        }else if(this.password == ''){
          this.form_validation_message = 'Your New password is empty';        
        }else if(this.password_confirmation == ''){
          this.form_validation_message = 'Your Renew password is empty';
        }else if(this.password != this.password_confirmation){
          this.form_validation_message = 'Your passwords do not match';
        } else {
          this.form_validation_message = '';
        
          let payload = {
              "username": this.username,
              "password": this.password,
              "password_confirmation": this.password_confirmation,
              "email": this.email,
              "first_name": this.first_name,
              "last_name": this.last_name,
              "type_user": 1,
              "status": 0,
              "portfolio_id": this.portfolio_id
          }

          Loading.show();

          axios
            .post(process.env.ENV_API_URL + "/signup/", payload)
            .then((response) => {

              Loading.hide();

              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Your account has been created succesfully'
              }); 
          
              this.register_form_display = false;

          })
          .catch((error) => {
            
            Loading.hide();

            let i = 0;
            let msg = "";
            let field;
            for (var key in error.response.data) {

              field = key.charAt(0).toUpperCase() + key.slice(1)
              msg += "Error in " + field + ": " + error.response.data[key] + "<br>";

            } 

            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Error: Somethings has been bad.'
            });

            this.form_validation_message = msg;

          });
          

        }

      },
      
      isValidEmail (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';

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
