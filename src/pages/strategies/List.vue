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

              <div style="min-width:300px;" class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="strategy of strategies" v-bind:key="strategy.id">

                <q-card style="max-width: 300px, min-width: 300px; color:white; background-image: linear-gradient(-225deg, #517112 0%, #74a219 100%);">
                  
                  <q-card-section class="q-pt-none text-center">
                    <div class="text-h6" style="padding-top: 20px;">
                      {{ strategy.title }}
                    </div>
                    <div class="text-h5" >                     
                      {{ strategy.market.symbol }}
                    </div>
                    <q-separator color="white" ></q-separator>
                    <div class="q-pa-md">
                      <div class="row">
                        <div class="col">
                          <div class="text-h6 text-black-8">BULL</div>
                          <div><b>Zone High:</b> {{ strategy.bull_zone_high }} </div>
                          <div><b>Zone Low:</b> {{ strategy.bull_zone_low }} </div>
                          <div><b>Mod High:</b> {{ strategy.bull_mod_high }} </div>
                          <div><b>Mod Low:</b> {{ strategy.bull_mod_low }} </div>

                        </div>
                        <q-separator vertical inset color="white" ></q-separator>
                        <div class="col">
                          <div class="col">
                          <div class="text-h6 text-black-8">BEAR</div>
                          <div><b>Zone High:</b> {{ strategy.bear_zone_high }} </div>
                          <div><b>Zone Low:</b> {{ strategy.bear_zone_low }} </div>
                          <div><b>Mod High:</b> {{ strategy.bear_mod_high }} </div>
                          <div><b>Mod Low:</b> {{ strategy.bear_mod_low }} </div>

                        </div>
                        </div>
                      </div>
                      <br>

                      <div class="row">
                        <div class="col">
                          <div class="text-h6 text-black-8">SMA</div>
                          <div><b>Large:</b> {{ strategy.bear_zone_high }} </div>
                          <div><b>Short:</b> {{ strategy.bear_zone_low }} </div>
                        </div>
                        <q-separator vertical inset color="white" ></q-separator>
                        <div class="col">
                          <div class="text-h6 text-black-8">ADX</div>
                          <div><b>Large:</b> {{ strategy.bear_zone_high }} </div>
                          <div><b>Short:</b> {{ strategy.bear_zone_low }} </div>
                          <div><b>Period:</b> {{ strategy.bear_mod_high }} </div>
                        </div>
                        <q-separator vertical inset color="white" ></q-separator>
                        <div class="col">
                          <div class="text-h6 text-black-8">RSI</div>
                          <div><b>Period:</b> {{ strategy.bear_mod_high }} </div>
                        </div>
                      </div>
                    </div>

                  </q-card-section>
                  <q-separator inset color="white" />


          <q-card-actions align="around">
            <q-btn flat to="/UserProfile">Edit</q-btn>
            <q-btn flat v-on:click='logout()' >Delete</q-btn>
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


  import axios from 'axios';
  import '../../router/axiosInterceptor';


  export default {

    data() {
       return {
        api_url: {},
        strategies: [],
        strategies_history: [],   
        submitted: false

      }
    },

    methods: {

      addRow() {
        // do something
        this.$q.notify({
          type: 'warning',
          textColor: 'grey-10',
          multiLine: true,
          message: `I'll add a new row data`,
          timeout: 2000
        })
      },

      editRow(props) {
        // do something
        this.$q.notify({
          type: 'info',
          textColor: 'grey-10',
          multiLine: true,
          message: `I'll edit row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
          timeout: 2000
        })
      },
      deleteRow(props){
        // do something
        this.$q.notify({
          type: 'negative',
          multiline: true,
          message: `I'll delete row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
          timeout: 2000
        })
      },
      setFs(props){
        props.toggleFullscreen()
        this.inFs = props.inFullscreen
      },

  },
  
  mounted () {

     axios
     .get(process.env.ENV_API_URL + '/strategies/form_data/')
     .then(response => {

      //console.log(response.data.results);

      this.strategies = response.data.strategies_list;

      console.log(this.strategies);


      let history = response.data.strategies_history
      let i;
      for(i=0; i < history.length; i++){

        this.strategies_history.push({
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