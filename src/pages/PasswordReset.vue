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
                Password Reset
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="register_form_display">
            <q-form
            class="q-gutter-md"
            >

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
            type="password"
            filled
            v-model="token"
            lazy-rules
            style="display:none;"
            />

            <p v-html="form_validation_message" class="error"></p>


            <div>

              <q-btn type="button" class="fit" color="primary" @click.prevent="send_register_form">Create Account</q-btn>

            </div>

          </q-form>
        </q-card-section>
        <q-card-section v-if="!register_form_display">
          <q-banner class="bg-primary text-white">
              <p>Password has benn updated, go to login.</p>
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
      password: '',
      password_confirmation: '',
      token: this.$route.query.token,
      password_error: false,
      register_form_display: true,
      form_validation_message: '',
    }
  },
  mounted(){
   this.token=this.$route.params.token;
  },
  methods: {

      send_register_form(){


        if(this.password == ''){
          this.form_validation_message = 'Your New password is empty';        
        }else if(this.password_confirmation == ''){
          this.form_validation_message = 'Your Renew password is empty';
        }else if(this.password != this.password_confirmation){
          this.form_validation_message = 'Your passwords do not match';
        } else {
          this.form_validation_message = '';
        
          let payload = {

              "password": this.password,
              "token": this.token,

          }

          Loading.show();

          axios
            .post(process.env.ENV_API_URL + "/password_reset/confirm/", payload)
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
