<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">Portfolios List</span>
              <br>
              <span class="text-subtitle2">Portfolios Adminitration.</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs class="text-grey" align="right">
                <template v-slot:separator>
                  <q-icon
                  size="1.2em"
                  name="arrow_forward"
                  color="primary"
                  />
                </template>

                <q-breadcrumbs-el label="Dashboard" icon="home" to="/Dashboard" />
                <q-breadcrumbs-el label="Configs" icon="admin_panel_settings" to="/Configs" />
                <q-breadcrumbs-el label="Strategies" icon="admin_panel_settings" />
              </q-breadcrumbs>
            </div>
          </div>

        </div>

      </q-card-section>

      <q-separator></q-separator>

      <div class="row">
        <div class="col-12 col-md-12">
          <q-card-section class="q-mx-sm">
            <div class="row q-col-gutter-lg">

              <div style="min-width:300px;" class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="portfolio of portfolios" v-bind:key="portfolio.id">

                <q-card style="max-width: 300px, min-width: 300px; color:white; background-image: linear-gradient(-225deg, #517112 0%, #74a219 100%);">

                  <q-card-section class="text-center">
                    <q-avatar size="100px" class="shadow-10">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-card-section>
                  <q-card-section class="q-pt-none text-center ">
                    <div class="text-h6  text-white-8">
                      {{portfolio.title}}
                    </div>
                    <div class="text-caption text-white-8">
                      {{portfolio.email}}
                    </div>
                    <div class="text-caption text-white-8">
                      {{portfolio.status}}
                    </div>
                  </q-card-section>
                  <q-separator inset color="white" />


                  <q-card-actions align="around">
                    <q-btn flat @click='onEdit(portfolio.id)'>
                      <q-icon left size="20px" name="edit" />
                      Edit
                    </q-btn>
                    <q-btn flat @click="confirm = true; portfolio_id = portfolio.id">      
                      <q-icon left size="20px" name="delete" />                
                      Delete
                    </q-btn>
                  </q-card-actions>
                </q-card>

              </div>

              <div style="min-width:300px;" class="col-lg-3 col-sm-12 col-xs-12 col-md-3">

                <q-card style="max-width: 300px, min-width: 300px; height: 272px; color:white;">
                  
                  <q-card-section class="text-center">

                    <q-btn class="add_card_button" to="/Portfolios/Add">

                      <span style="font-size:50px; ">+</span>

                    </q-btn>

                    
                  </q-card-section>
                  
                 
                </q-card>

              </div>
              
            </div>

          </q-card-section>

        </div>

        <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="red" text-color="white" />
            <span class="q-ml-sm error">Are you sure you want to Delete?.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Delete" color="red" v-on:click='onDelete()' v-close-popup icon="delete" />
            <q-btn flat label="Cancel" color="primary" v-close-popup icon="cancel_schedule_send" />
          </q-card-actions>
        </q-card>
      </q-dialog>
        
    </div>
</q-card>
</q-page>
</template>


<script>


  import axios from 'axios';
  import '../../router/axiosInterceptor';


  export default {

    data() {
     return {
      api_url: {},
      portfolios: [],
      portfolio_id: null,
      portfolios_history: [],
      confirm: false,   
      submitted: false

    }
  },

  methods: {
    onEdit (portfolio_id) {

        this.$router.replace("/Portfolios/Edit/" + portfolio_id);

      },

      onDelete () {        

        axios
        .delete(process.env.ENV_API_URL + '/portfolios/' + this.portfolio_id + '/')
        .then(response => {

          console.log("onDelete " + this.portfolio_id);

          this.portfolios = this.portfolios.filter(x => x.id !== this.portfolio_id);

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Deleted'
          });

        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally();

      },

    },

    mounted () {

     axios
     .get(process.env.ENV_API_URL + '/portfolios/')
     .then(response => {

      // console.log(response.data.results);

      let portfolios_list = response.data.results;

      let i;
      for(i=0; i < portfolios_list.length; i++){


        this.portfolios.push({

          id: portfolios_list[i].id,
          title: portfolios_list[i].title,
          email: portfolios_list[i].email,
          status: portfolios_list[i].status,

        })


      }

      console.log(this.portfolios);


    })
     .catch(error => {
      console.log(error)
      this.errored = true
    })
     .finally();

     

   },  

 }

</script>
<style type="text/css">


</style>