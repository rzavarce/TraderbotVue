<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">Markets Config</span>
              <br>
              <span class="text-subtitle2">Markets Adminitration.</span>
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
                <q-breadcrumbs-el label="Markets" icon="admin_panel_settings" />
              </q-breadcrumbs>
            </div>
          </div>

        </div>

      </q-card-section>

      <q-separator></q-separator>

      <q-form
      ref="myForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      > 

      <div class="row">
        <div class="col-12 col-md-8">
          <q-card-section class="q-mx-sm">
      <div class="row q-col-gutter-lg">

              <div style="min-width:230px;" class="col-sm-12 col-xs-12 col-md-3" v-for="market of markets" v-bind:key="market.id">

                <q-card style="max-width: 230px, min-width:200px;">
                  <q-card-section class="text-center">
                    <q-avatar size="150px" class="shadow-10">
                      <div class="text-h6  text-black-8">
                      {{ market.symbol }}
                    </div>
                    </q-avatar>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-center ">
                    <div class="text-caption text-grey-8">
                      <router-link to="">
                          {{ market.base.name }}
                      </router-link>
                      ---> 
                      <router-link to="">
                        {{ market.quote.name }}
                      </router-link>
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="center">
                    <q-toggle
                      :false-value="false"
                      :label="`Status is ${market.status}`"
                      :true-value="true"
                      color="red"
                      v-model="market.status"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            
            </div>

        </q-card-section>

      </div>
      <q-separator vertical inset></q-separator>
       <div class="col-12 col-md-3 gt-xs" style="padding: 20px;">

        <q-card-section class="text-h6 q-pb-none">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">History Activity</div>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section style="margin-left:27px;">
          <q-timeline  color="secondary">

            <q-timeline-entry
            v-for="(config_history, index) in config_history"
            :key="index"
            :title="config_history.title"
            :subtitle="config_history.subtitle" 
            :color="config_history.color" 
            :icon="config_history.icon"
            :side="config_history.side"
            >

            {{config_history.desc}}

          </q-timeline-entry>

        </q-timeline>

        <q-breadcrumbs-el label="See More" icon="add" to="/Dashboard" />
      </q-card-section>

    </div>
  </div>
  <q-separator></q-separator>
  <div class="row">
    <div class="q-mt-md" style="margin:20px;">
      <q-btn label="Submit" icon="send" type="submit"  color="primary"/>
      <q-btn label="Reset" icon="restore" type="reset" color="secundary" flat class="q-ml-sm" />
      <q-btn label="Cancel" icon="cancel_schedule_send" type="button" color="red" flat class="q-ml-sm" :to="{name: 'dashboard'}" />
    </div>
  </div>
</q-form>

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
        markets: [],
        history:{},   
        submitted: false

      }
    },
    methods: {
      onSubmit () {

        axios
        .put(process.env.ENV_API_URL + '/bot_configs/' + this.general.id + '/',
          this.general)
        .then(
          response => {
            // this.$router.push('/');
            console.log(response);
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            }); 

          }), 
        (error) => {
          console.log(error);
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error: Somethings has been bad.'
          })
        }
      },

      onReset () {

        this.general = {
          "id": this.primitive.id,
          "nickname": this.primitive.nickname,
          "test_mode": this.primitive.test_mode,
          "api_key": this.primitive.api_key,
          "api_secret": this.primitive.api_secret,
          "candles_interval": this.primitive.candles_interval,
          "candles_limit": this.primitive.candles_limit,
          "pamic_button": this.primitive.pamic_button,
          "description": this.primitive.description,
          "status": this.primitive.status,
          "created_date": this.primitive.created_date,
          "modified_date": this.primitive.modified_date,
          "exchange": this.primitive.exchange,
          "markets": this.primitive.markets
        }


      }
    },
    mounted () {

     axios
     .get(process.env.ENV_API_URL + '/markets/form_data/')
     .then(response => {

      
      // console.log(response.data);

      let markets_list = response.data.markets_list
      let logotype;
      let i;
      // this.api_url = process.env.ENV_API_URL
      this.api_url = "http://localhost:8000/" 

      console.log(markets_list);


      for(i=0; i < markets_list.length; i++){

        console.log(markets_list[i].symbol); 

        if (markets_list[i].logotype){

          logotype =  "http://localhost:8000/" + markets_list[i].logotype;

        }else{

          logotype = "http://localhost:8000/uploads/images/logotypes/" + "no_imagen_available.png";

        }


        this.markets.push({

          id: markets_list[i].id,
          symbol: markets_list[i].symbol,
          base: markets_list[i].base,
          quote: markets_list[i].quote,
          logotype: logotype,
          status: markets_list[i].status,

        })

      }



      console.log(this.markets);


      let history = response.data.markets_history

      for(i=0; i < history.length; i++){

        this.config_history.push({
          title: history[i].nickname,
          subtitle: history[i].history_date,
          side: 'left',
          desc: history_types[history[i].history_type].desc,
          color: history_types[history[i].history_type].color,
          icon: history_types[history[i].history_type].icon
        })


      }

    })
     .catch(error => {
      console.log(error)
      this.errored = true
    })
     .finally();



   },
 }

 function choicesOptionsParser(options) {
  let results = []
  for(let i=0; i< options.length; i++){
    results.push({
      value: options[i][0],
      label: options[i][1],
    });
  }

  return results
}

let history_types = {
  "+": {
    "icon": "add",
    "color": "green",
    "desc":"New register has been added.",
  },
  "~": {
    "icon": "check",
    "color": "blue",
    "desc":"Register has been updated.",
  },
  "-": {
    "icon": "clear",
    "color": "red",
    "desc":"Register has been deleted.",
  }
}

</script>
<style>


@media screen and (max-width: 599px) {
  .q-breadcrumbs {
    font-size: 10px;
  }

  .q-btn {
    font-size:12px;
    padding: 5px;
  }
}


</style>

