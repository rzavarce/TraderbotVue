<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">Strategies Config</span>
              <br>
              <span class="text-subtitle2">Strategies Adminitration.</span>
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

              <div style="min-width:230px;" class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="strategy of strategies" v-bind:key="strategy.id">

                <q-card style="max-width: 230px, min-width:200px;">
                  <q-card-section class="text-center">
                    <q-avatar size="150px" class="shadow-10">
                      <q-img
                      :src="strategy.logotype"
                      :ratio="1"
                      />
                    </q-avatar>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-center ">
                    <div class="text-h6  text-grey-8">
                      {{ strategy.title }} <br>
                      
                    </div>
                    <div class="text-caption text-grey-8">
                      <b>Stop Loss:</b> {{ strategy.stop_loss }} / <b>Lote Level:</b> {{ strategy.lote_level }}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="center">
                    <q-toggle
                    :false-value="false"
                    :label="`Status is ${strategy.status}`"
                    :true-value="true"
                    color="red"
                    v-model="strategy.status"
                    />
                  </q-card-actions>
                  <q-separator inset />


                  <q-card-actions align="around">
                    <q-btn round v-on:click='onEdit(strategy.id)' color="primary" icon="edit" ></q-btn>
                    <q-btn round @click="confirm = true; strategy_id = strategy.id" color="primary" icon="delete" ></q-btn>
                  </q-card-actions>

                </q-card>

              </div>
              
            </div>

          </q-card-section>

        </div>

      </div>


      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
            <span class="q-ml-sm">You are currently not connected to any network.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Delete" color="red" v-on:click='onDelete()' v-close-popup icon="delete" />
            <q-btn flat label="Cancel" color="primary" v-close-popup icon="cancel_schedule_send" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card>
  </q-page>
</template>


<script>

  import axios from 'axios';
  import '../../../router/axiosInterceptor';

  export default {
    data() {

      return {
        api_url: {},
        strategies: [],
        history:{},   
        strategy_id:0,
        confirm: false,
        submitted: false

      }
    },
    methods: {
      onEdit (strategy_id) {

        this.$router.replace("/Strategies/BTC/Edit/" + strategy_id);

      },

      onDelete () {        

        axios
        .delete(process.env.ENV_API_URL + '/strategies/BTC/' + this.strategy_id + '/')
        .then(response => {


          console.log("onDelete " + this.strategy_id);

          this.strategies = this.strategies.filter(x => x.id !== this.strategy_id);

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

      }
    },
    mounted () {

     axios
     .get(process.env.ENV_API_URL + '/strategies/BTC/')
     .then(response => {


      let strategies_list = response.data.results;
      let logotype;
      let i;
      for(i=0; i < strategies_list.length; i++){

        if (strategies_list[i].currency.logotype){

          logotype =  process.env.ENV_APP_ASSETS + strategies_list[i].currency.logotype;

        }else{

          logotype = process.env.ENV_APP_ASSETS + "/uploads/images/logotypes/no_imagen_available.png";

        }

        this.strategies.push({

          id: strategies_list[i].id,
          title: strategies_list[i].title,
          currency: strategies_list[i].currency.short,
          stop_loss: strategies_list[i].stop_loss,
          lote_level: strategies_list[i].lote_level,
          logotype: logotype,
          status: strategies_list[i].status,

        })
        

      }

      console.log(this.strategies);

      /*


      let history = response.data.currencies_history

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

      */


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
