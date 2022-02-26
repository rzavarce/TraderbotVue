<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">BTC Strategies Config</span>
              <br>
              <span class="text-subtitle2">BTC Strategies Adminitration.</span>
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
                <q-breadcrumbs-el label="Strategies" icon="admin_panel_settings" to="/Strategies" />
                <q-breadcrumbs-el label="Bitcoin" icon="admin_panel_settings" />
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
            id="title"
            v-model="strategy.title"
            label="title *"
            hint="Unit 1"
            maxlength="50"
            lazy-rules
            :rules="[val => !!val || 'Title is required.']"
            />

            <q-select
            filled
            clearable
            emit-value
            map-options
            id="candles_ilimit"
            v-model="strategy.currency"
            label="Currency *"
            :options="currencies_list"
            behavior="menu"
            lazy-rules
            :rules="[ val => val && val != null || 'Currency is required.']"
            />


            <q-toggle
            :false-value="false"
            :label="`Strategy is ${strategy.status}`"
            :true-value="true"
            color="red"
            id="status"
            v-model="strategy.status"
            />

            <div class="row rules_content">

              <div class="col">


                <div class="row">
                  <div class="col">
                    <div class="rules_label">Lote Level</div>
                  </div>

                </div>
                <br>
                <div class="row justify-around" style="margin-right: 20px;">

                  <q-slider
                  v-model="strategy.lote_level"
                  :min="0"
                  :max="100"
                  :step="5"
                  label                  
                  label-always                  
                  snap
                  color="green"
                  />

                </div>

              </div>
              <q-separator vertical inset></q-separator>
              <div class="col">

                <div class="row">
                  <div class="col">
                    <div class="rules_label">Stop Loss</div>

                  </div>

                </div>
                <br>
                <div class="row justify-around" style="margin-left: 20px;">

                  <q-slider
                  v-model="strategy.stop_loss"
                  :min="0"
                  :max="100"
                  :step="5"
                  label                  
                  label-always                  
                  snap
                  color="red"
                  />

                </div>
              </div>

            </div>


            <div class="row rules_content">

              <div class="col">
                <div class="row justify-around" style="margin-right: 20px;">

                  <div class="rules_label">Bull Zone Range</div>                          

                  <q-range
                  v-model="strategy.bull_zone_range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="purple-10"
                  />
                  <div color="" class="q-mb-lg">
                    <!-- Zone Selected: {{ strategy.bull_zone_range.min }} to {{ strategy.bull_zone_range.max }} (0 to 100, step 5) -->
                  </div>
                </div>

                <div class="row justify-around" style="margin-right: 20px;">

                  <div class="rules_label">Bull Mod Range</div>                          

                  <q-range
                  v-model="strategy.bull_mod_range"
                  :min="0"
                  :max="10"
                  :step="1"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="purple-10"
                  />
                  <div color="" class="q-mb-lg">
                    <!-- Zone Selected: {{ strategy.bull_zone_range.min }} to {{ strategy.bull_zone_range.max }} (0 to 100, step 5) -->
                  </div>
                </div>

                <div class="row justify-around" style="margin-right: 20px;">

                  <div class="rules_label">Bull RSI Period</div>                          

                  <q-slider
                  v-model="strategy.bull_rsi_period"
                  :min="0"
                  :max="10"
                  label                  
                  label-always                  
                  snap
                  color="purple-8"
                  />

                </div>


              </div>
              <q-separator vertical inset></q-separator>
              <div class="col">
                <div class="row justify-around " style="margin-left: 20px;">

                  <div class="rules_label">Bear Zone Range</div>                          

                  <q-range
                  v-model="strategy.bear_zone_range"
                  :min="0"
                  :max="100"
                  :step="5"
                  label
                  drag-range
                  markers
                  marker-labels
                  label-always
                  snap
                  color="teal-10"
                  />
                  <div color="" class="q-mb-lg">
                   <!--Zone Selected: {{ strategy.bear_zone_range.min }} to {{ strategy.bear_zone_range.max }} (0 to 100, step 5) -->
                 </div>
               </div>

               <div class="row justify-around" style="margin-left: 20px;">

                <div class="rules_label">Bear Mod Range</div>                          

                <q-range
                v-model="strategy.bear_mod_range"
                :min="0"
                :max="10"
                :step="1"
                label
                drag-range
                markers
                marker-labels
                label-always
                snap
                color="teal-8"
                />
                <div color="" class="q-mb-lg">
                  <!-- Zone Selected: {{ strategy.bull_zone_range.min }} to {{ strategy.bull_zone_range.max }} (0 to 100, step 5) -->
                </div>
              </div>

              <div class="row justify-around" style="margin-left: 20px;">

                <div class="rules_label">Bear RSI Period</div>                          

                <q-slider
                v-model="strategy.bear_rsi_period"
                :min="0"
                :max="10"
                label                  
                label-always                  
                snap
                color="teal-5"
                />

              </div>


            </div>

          </div>

          <div class="row rules_content">

            <div class="col" style="margin-right: 20px;">

              <div class="zone_label">EMA</div>
              <br>
              <q-range
              v-model="strategy.ema_zone_range"
              :min="0"
              :max="100"
              :step="5"
              label
              drag-range
              markers
              marker-labels
              label-always
              snap
              color="red-10"
              />
              <div color="" class="q-mb-lg">
               <!-- Zone Selected: {{ strategy.ema_zone_range.min }} to {{ strategy.ema_zone_range.max }} (0 to 100, step 5) -->
             </div>


           </div>
           <q-separator vertical inset></q-separator>
           <div class="col" style="margin: 0px 20px;">
            <div class="zone_label">ADX</div>
            <br>
            <q-range
            v-model="strategy.adx_zone_range"
            :min="0"
            :max="100"
            :step="5"
            label
            drag-range
            markers
            marker-labels
            label-always
            snap
            color="red-10"
            />
            <div color="" class="q-mb-lg">
              <!-- Zone Selected: {{ strategy.adx_zone_range.min }} to {{ strategy.adx_zone_range.max }} (0 to 100, step 5) -->
            </div>
            <br>
            <q-slider
            v-model="strategy.adx_period"
            :min="0"
            :max="10"
            label                  
            label-always                  
            snap
            color="red-8"
            />


          </div>
          <q-separator vertical inset></q-separator>
          <div class="col" style="margin-left: 20px;">
            <div class="zone_label">RSI</div>
            <br>
            <q-slider
            v-model="strategy.rsi_period"
            :min="0"
            :max="10"
            label                  
            label-always                  
            snap
            color="red-7"
            />
          </div>

        </div>


        <div class="row rules_content">

          <div class="col">


            <div class="row">
              <div class="col">
                <div class="zone_label">Stochrsi RSI Period</div>

              </div>
              <div class="col">
                <div class="zone_label">Stochrsi Smooth D</div>

              </div>
              <div class="col">
                <div class="zone_label">Stochrsi Smooth K</div>

              </div>
            </div>
            <br>
            <div class="row justify-around">


              <q-slider
              v-model="strategy.stochrsi_rsi_period"
              :min="0"
              :max="10"
              vertical
              label                  
              label-always                  
              snap
              color="black"
              />


              <q-slider
              v-model="strategy.stochrsi_smooth_k"
              :min="0"
              :max="10"                  
              vertical
              label                  
              label-always                  
              snap
              color="grey-10"               

              />

              <q-slider
              v-model="strategy.stochrsi_smooth_d"
              :min="0"
              :max="10"                  
              vertical
              label                  
              label-always                  
              snap
              color="grey-9"                

              />

            </div>

          </div>
          <q-separator vertical inset></q-separator>
          <div class="col">

            <div class="row">
              <div class="col">
                <div class="zone_label">Stochrsi Period</div>

              </div>
              <div class="col">
                <div class="zone_label">Stochrsi High</div>

              </div>
              <div class="col">
                <div class="zone_label">Stochrsi Low</div>

              </div>
            </div>
            <br>
            <div class="row justify-around">


              <q-slider
              v-model="strategy.stochrsi_period"
              :min="0"
              :max="10"
              vertical
              label                  
              label-always                  
              snap
              color="grey-8" 
              />


              <q-slider
              v-model="strategy.stochrsi_high"
              :min="0"
              :max="10"                  
              vertical
              label                  
              label-always                  
              snap
              color="grey-7"                 

              />

              <q-slider
              v-model="strategy.stochrsi_low"
              :min="0"
              :max="10"                  
              vertical
              label                  
              label-always                  
              snap
              color="grey-6"                 

              />

            </div>
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
          v-for="(strategies_history, index) in strategies_history"
          :key="index"
          :title="strategies_history.title"
          :subtitle="strategies_history.subtitle" 
          :color="strategies_history.color" 
          :icon="strategies_history.icon"
          :side="strategies_history.side"
          >

          {{strategies_history.desc}}

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
  import '../../../router/axiosInterceptor';
  import { Loading } from 'quasar';

  export default {
    data() {

      return {
        currencies_list: {},
        primitive: {},
        strategy: {},
        strategies_history:[],   

        submitted: false

      }
    },
    methods: {
      onSubmit:function() {

        // Loading.show();

        let form_data = {
          "title": this.strategy.title,
          "currency": this.strategy.currency,
          "status": this.strategy.status,
          "lote_level": this.strategy.lote_level,
          "stop_loss": this.strategy.stop_loss,
          
          "bear_zone_high": this.strategy.bear_zone_range.max,
          "bear_zone_low": this.strategy.bear_zone_range.min,
          "bull_zone_low": this.strategy.bull_zone_range.min,
          "bull_zone_high": this.strategy.bull_zone_range.max,

          "bull_mod_low": this.strategy.bull_mod_range.min,
          "bull_mod_high": this.strategy.bull_mod_range.max,
          "bear_mod_low": this.strategy.bear_mod_range.min,
          "bear_mod_high": this.strategy.bear_mod_range.max,

          "bull_rsi_period": this.strategy.bull_rsi_period,
          "bear_rsi_period": this.strategy.bear_rsi_period,

          "ema_large": this.strategy.ema_zone_range.max,
          "ema_short": this.strategy.ema_zone_range.min,
          "adx_large": this.strategy.adx_zone_range.max,
          "adx_short": this.strategy.adx_zone_range.min,
          "adx_period": this.strategy.adx_period,
          "rsi_period": this.strategy.rsi_period,
          "stochrsi_rsi_period": this.strategy.stochrsi_rsi_period,
          "stochrsi_smooth_k": this.strategy.stochrsi_smooth_k,
          "stochrsi_smooth_d": this.strategy.stochrsi_smooth_d, 
          "stochrsi_period": this.strategy.stochrsi_period,
          "stochrsi_high": this.strategy.stochrsi_high,
          "stochrsi_low": this.strategy.stochrsi_low,
        }



        axios
        .post(process.env.ENV_API_URL + '/strategies/BTC/Add/',
          form_data)
        .then(
          response => {

            this.strategies_history = [];
            let history = response.data.strategies_history;
            let i;
            for(i=0; i < history.length; i++){ 

              this.strategies_history.push({
                title: history[i].title,
                subtitle: history[i].history_date,
                side: 'left',
                desc: history_types[history[i].history_type].desc,
                color: history_types[history[i].history_type].color,
                icon: history_types[history[i].history_type].icon
              });

            }

            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            }); 


            this.onReset();
            
            Loading.hide();

          }), 
        (error) => {
          console.log(error);

          Loading.hide();

          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error: Somethings has been bad.'
          });

        }
      },

      onReset:function() {

        this.strategy = {
          "title":"",
          "currency":"",
          "status":false,
          "lote_level":50,
          "stop_loss":10,
          "bull_zone_range":{
            min: 20,
            max: 60
          },
          "bear_zone_range":{
            min: 20,
            max: 60
          },
          "bull_mod_range":{
            min: 3,
            max: 6
          },
          "bull_mod_range":{
            min: 3,
            max: 6
          },
          "bear_mod_range":{
            min: 3,
            max: 6
          },
          "ema_zone_range":{
            min: 20,
            max: 60
          },
          "adx_zone_range":{
            min: 20,
            max: 60
          },
          "bull_rsi_period": 5,
          "bear_rsi_period": 5,
          "adx_period": 5,
          "rsi_period": 5,
          "stochrsi_rsi_period": 5,
          "stochrsi_smooth_k": 5,
          "stochrsi_smooth_d": 5, 
          "stochrsi_period": 5,
          "stochrsi_high": 5,
          "stochrsi_low": 5,

        }

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


      }
    },
    mounted () {

     axios
     .get(process.env.ENV_API_URL + '/strategies/BTC/Add/')
     .then(response => {

      let results = [];
      let i;
      let options = response.data.currencies_list;
      for(i=0; i<options.length; i++){
        let option = options[i];
        results.push({ label: option["name"], value: option["id"], short: option["short"] });
      }
      this.currencies_list = results

      this.primitive = {
        "title":"",
        "currency":"",
        "status":false,
        "lote_level":50,
        "stop_loss":10,
        "bull_zone_range":{
          min: 20,
          max: 60
        },
        "bear_zone_range":{
          min: 20,
          max: 60
        },
        "bull_mod_range":{
          min: 3,
          max: 6
        },
        "bull_mod_range":{
          min: 3,
          max: 6
        },
        "bear_mod_range":{
          min: 3,
          max: 6
        },
        "ema_zone_range":{
          min: 20,
          max: 60
        },
        "adx_zone_range":{
          min: 20,
          max: 60
        },
        "bull_rsi_period": 5,
        "bear_rsi_period": 5,
        "adx_period": 5,
        "rsi_period": 5,
        "stochrsi_rsi_period": 5,
        "stochrsi_smooth_k": 5,
        "stochrsi_smooth_d": 5, 
        "stochrsi_period": 5,
        "stochrsi_high": 5,
        "stochrsi_low": 5,

      }

      this.strategy = this.primitive

      let history = response.data.strategies_history

      for(i=0; i < history.length; i++){ 

        this.strategies_history.push({
          title: history[i].title,
          subtitle: history[i].history_date,
          side: 'left',
          desc: history_types[history[i].history_type].desc,
          color: history_types[history[i].history_type].color,
          icon: history_types[history[i].history_type].icon
        });

      }

    })
     .catch(error => {
      this.errored = true
    })
     .finally();



   },
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



</style>


