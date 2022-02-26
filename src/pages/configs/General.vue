<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">General Config</span>
              <br>
              <span class="text-subtitle2">Bot General Adminitration.</span>
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
                <q-breadcrumbs-el label="General" icon="admin_panel_settings" />
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
          <q-card-section class="q-pa-none">
            <div class="q-pa-md" style="max-width: 600px">

              <q-input
              filled
              clearable
              id="nickname"
              v-model="general.nickname"
              label="Nickname *"
              hint="Unit 1"
              maxlength="50"
              lazy-rules
              :rules="[val => !!val || 'Nickname is required.']"
              />

              <q-select
              filled
              clearable
              emit-value
              map-options
              id="general_broker"
              v-model="general.exchange"
              label="Principal Exchange *"
              :options="exchanges_list"
              behavior="menu"
              lazy-rules
              :rules="[ val => val && val != null || 'Principal Broker is required.']"
              />

              <q-toggle
              :false-value="false"
              :label="`Status is ${general.status}`"
              :true-value="true"
              color="red"
              v-model="general.status"
              />

              <q-input
              filled
              clearable
              id="api_key"
              v-model="general.api_key"
              label="Broker Api Key *"
              hint="Unit 1"
              maxlength="100"
              lazy-rules
              :rules="[val => !!val || 'Api Key is required.']"
              />

              <q-input
              filled
              clearable
              id="api_secret"
              v-model="general.api_secret"
              label="Broker Api Secret *"
              hint="Unit 1"
              maxlength="100"
              lazy-rules
              :rules="[val => !!val || 'Api Secret is required.']"
              />


              <q-select
              multiple
              filled
              map-options
              id="currencies"
              v-model="general.currencies"
              label="Currencies *"
              :options="currencies_list"
              behavior="menu"
              lazy-rules
              :rules="[ val => val && val != null || 'Currencies is required.']"
              >
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label v-html="opt.label" />
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>


              <q-select
              filled
              clearable
              emit-value
              map-options
              id="candles_interval"
              v-model="general.candles_interval"
              label="Candles Interval *"
              :options="candles_interval_list"
              behavior="menu"
              lazy-rules
              :rules="[ val => val && val != null || 'Candles Interval is required.']"
              />


            <q-select
            filled
            clearable
            emit-value
            map-options
            id="candles_ilimit"
            v-model="general.candles_limit"
            label="Candles Limit *"
            :options="candles_limit_list"
            behavior="menu"
            lazy-rules
            :rules="[ val => val && val != null || 'Candles Limit is required.']"
            />

            <q-input
            filled
            id="description"
            type="textarea"
            v-model="general.description"
            label="Description"
            hint="Description is optional"
            />

            
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
      <q-btn label="Submit&nbsp;&nbsp;&nbsp;&nbsp;" icon="send" type="submit"  color="primary"/>
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
  import { Loading } from 'quasar';

  export default {
    data() {

      return {

        general: {},
        primitive: {},
        candles_interval_list: {},
        candles_limit_list: {},
        exchanges_list: {},
        currencies_list: {},
        config_history: [],
        submitted: false

      }
    },
    methods: {
      onSubmit () {

        Loading.show();

        axios
        .put(process.env.ENV_API_URL + '/bot_configs/' + this.general.id + '/',
          this.general)
        .then(
          response => {

            Loading.hide();

            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            }); 

          }), 
        (error) => {
          
          Loading.hide();

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
          "currencies": this.primitive.currencies
        }


      }
    },
    mounted () {

     axios
     .get(process.env.ENV_API_URL + '/bot_configs/form_data/')
     .then(response => {

      this.candles_interval_list = choicesOptionsParser(response.data.candles_interval);

      this.candles_limit_list = choicesOptionsParser(response.data.candles_limit);

      this.general = response.data.general_config[0]

      this.general.exchange = {
        value: this.general.exchange.id,
        label: this.general.exchange.name
      }
      

      let options = response.data.exchanges_list;
      let results = [];
      let i;
      for(i=0; i<options.length; i++){
        let option = options[i];
        results.push({ label: option["name"], value: option["id"] });
      }
      this.exchanges_list = results


      options = response.data.currencies_list;
      results = [];
      for(i=0; i<options.length; i++){
        let option = options[i];
        results.push({ label: option["name"], value: option["id"], short: option["short"] });
      }
      this.currencies_list = results

      options = this.general.currencies;
      results = [];
      for(i=0; i<options.length; i++){
        let option = options[i];
        results.push({ label: option["name"], value: option["id"], short: option["short"] });
      }
      this.general.currencies = results

      this.primitive = {
        "id": this.general.id,
        "nickname": this.general.nickname,
        "test_mode": this.general.test_mode,
        "api_key": this.general.api_key,
        "api_secret": this.general.api_secret,
        "candles_interval": this.general.candles_interval,
        "candles_limit": this.general.candles_limit,
        "pamic_button": this.general.pamic_button,
        "description": this.general.description,
        "status": this.general.status,
        "created_date": this.general.created_date,
        "modified_date": this.general.modified_date,
        "exchange": this.general.exchange,
        "currencies": this.general.currencies
      }

      let history = response.data.config_history

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
