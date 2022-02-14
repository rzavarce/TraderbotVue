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
        <div class="col-8">
          <q-card-section class="q-mx-sm">

            <q-input
            filled
            clearable
            id="nickname"
            v-model="strategy.nickname"
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
            id="candles_ilimit"
            v-model="strategy.markets"
            label="Market *"
            :options="markets_list"
            behavior="menu"
            lazy-rules
            :rules="[ val => val && val != null || 'Candles Limit is required.']"
            />


            <q-toggle
            :false-value="false"
            :label="`Strategy is ${strategy.status}`"
            :true-value="true"
            color="red"
            v-model="strategy.status"
            />

            <div class="row rules_content">

              <div class="col">
                <div class="row justify-around " style="margin-right: 20px;">

                  <div class="rules_label">Bull Zone Range</div>                          

                  <q-range
                  v-model="range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="red"
                  />
                  <div color="" class="q-mb-lg">
                    Zone Selected: {{ range.min }} to {{ range.max }} (0 to 100, step 5)
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="zone_label">High Mod</div>

                  </div>
                  <div class="col">
                    <div class="zone_label">Low Mod</div>

                  </div>
                </div>
                <br>
                <div class="row justify-around">


                  <q-slider
                  v-model="high_mod"
                  :min="0"
                  :max="10"
                  vertical
                  label                  
                  label-always                  
                  snap
                  color="blue"
                  />


                  <q-slider
                  v-model="low_mod"
                  :min="0"
                  :max="10"                  
                  vertical
                  label                  
                  label-always                  
                  snap
                  color="green"                
                  
                  />

                </div>





              </div>
              <q-separator vertical inset></q-separator>
              <div class="col">
                <div class="row justify-around " style="margin-left: 20px;">

                  <div class="rules_label">Bull Zone Range</div>                          

                  <q-range
                  v-model="range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="red"
                  />
                  <div color="" class="q-mb-lg">
                    Zone Selected: {{ range.min }} to {{ range.max }} (0 to 100, step 5)
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="zone_label">High Mod</div>

                  </div>
                  <div class="col">
                    <div class="zone_label">Low Mod</div>

                  </div>
                </div>
                <br>
                <div class="row justify-around">


                  <q-slider
                  v-model="high_mod"
                  :min="0"
                  :max="10"
                  vertical
                  label                  
                  label-always                  
                  snap
                  color="blue"
                  />


                  <q-slider
                  v-model="low_mod"
                  :min="0"
                  :max="10"                  
                  vertical
                  label                  
                  label-always                  
                  snap
                  color="green"                
                  
                  />

                </div>
              </div>

            </div>

            <div class="row rules_content">

              <div class="col" style="margin-right: 20px;">

              <div class="zone_label">EMA</div>
              <br>
                 <q-range
                  v-model="range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="red"
                  />
                  <div color="" class="q-mb-lg">
                    Zone Selected: {{ range.min }} to {{ range.max }} (0 to 100, step 5)
                  </div>


              </div>
              <q-separator vertical inset></q-separator>
              <div class="col" style="margin: 0px 20px;">
              <div class="zone_label">ADX</div>
                <br>
                 <q-range
                  v-model="range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="red"
                  />
                  <div color="" class="q-mb-lg">
                    Zone Selected: {{ range.min }} to {{ range.max }} (0 to 100, step 5)
                  </div>
                <br>
                <q-slider
                  v-model="high_mod"
                  :min="0"
                  :max="10"
                  label                  
                  label-always                  
                  snap
                  color="blue"
                />
                
                
              </div>
              <q-separator vertical inset></q-separator>
              <div class="col" style="margin-left: 20px;">
              <div class="zone_label">RSI</div>
              <br>
              <q-slider
                  v-model="high_mod"
                  :min="0"
                  :max="10"
                  label                  
                  label-always                  
                  snap
                  color="blue"
                />
              </div>

            </div>


          </q-card-section>

        </div>
        <q-separator vertical inset></q-separator>
        <div class="col">

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
  import { ref } from 'vue'
  import axios from 'axios';
  import '../../router/axiosInterceptor';

  export default {
    data() {

      return {
        api_url: {},
        high_mod: ref(10),
        low_mod: ref(0),
        strategy: [],
        history:{},   
        range: ref({
          min: 0,
          max: 100
        }),
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

<style type="text/css">
  .rules_label {

    width: 100%;
    padding: 10px 20px 30px 20px;
    text-align: center;
    font-size: 20px;

  }

  .rules_content {

    margin: 20px 0px;
    padding: 30px;
    border: solid 1px grey;
    border-radius: 5px;
    text-align: center;



  }


</style>


