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
        <div class="col-12 col-md-8">
          <q-card-section class="q-mx-sm">

            <q-form
              ref="myForm"
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              > 

            
              <div style="max-width: 600px">
              <q-input
              filled
              clearable
              id="nickname"
              v-model="portfolio.user"
              label="Title *"
              hint="Add title"
              maxlength="50"
              lazy-rules
              :rules="[val => !!val || 'Title is required.']"
              />

              <q-input
              filled
              clearable
              id="nickname"
              v-model="portfolio.user"
              label="User *"
              hint="Add user"
              maxlength="50"
              lazy-rules
              :rules="[val => !!val || 'User is required.']"
              />


              <q-input
              filled
              id="description"
              type="textarea"
              v-model="portfolio.description"
              label="Description"
              hint="Description is optional"
              />


            
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

            <q-separator></q-separator>

            
            <div class="q-pa-md">
              <q-expansion-item
                dense
                dense-toggle
                expand-separator
                default-opened
                header-class="bg-primary text-white"
                 expand-icon-class="text-white"
                icon="perm_identity"
                label="Account settings"
              >



                <q-card class="bg-teal-2">
                  <q-card-section>


                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.

                    
                  </q-card-section>
                </q-card>





              </q-expansion-item>
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
              v-for="(portfolios_history, index) in portfolios_history"
              :key="index"
              :title="portfolios_history.title"
              :subtitle="portfolios_history.subtitle" 
              :color="portfolios_history.color" 
              :icon="portfolios_history.icon"
              :side="portfolios_history.side"
              >

              {{portfolios_history.desc}}

            </q-timeline-entry>

          </q-timeline>

          <q-breadcrumbs-el label="See More" icon="add" to="/Dashboard" />
        </q-card-section>

      </div>
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
      portfolio: [],
      portfolios_history: [],   
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
     .get(process.env.ENV_API_URL + '/portfolios/form_data/')
     .then(response => {

      //console.log(response.data.results);

      this.portfolios_list = response.data.portfolios_list;

      console.log(this.portfolios_list);


      let history = response.data.portfolios_history
      let i;
      for(i=0; i < history.length; i++){

        this.portfolios_history.push({
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