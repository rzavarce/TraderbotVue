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

      <q-form
      ref="myForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      > 

      <div class="row">
        <div class="col-8">
          <q-card-section class="q-mx-sm">

            <q-card>
              <q-tabs
              v-model="tab"
              align="justify"
              class="bg-primary text-white shadow-2"
              :breakpoint="0"
              >
              <q-tab name="portfolio" label="Portfolio" />
              <q-tab name="accounts" label="Accounts" />
            </q-tabs>

            <q-separator></q-separator>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="portfolio">

                <div style="max-width: 600px">
                  <q-input
                  filled
                  clearable
                  id="title"
                  v-model="portfolio.title"
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
                  type="email" 
                  label="User *"
                  hint="Add user"
                  maxlength="50"
                  lazy-rules
                  :rules="[val => !!val || 'User is required.']"
                  />

                  <q-file 
                  filled 
                  clearable
                  bottom-slots 
                  id="avatar"
                  v-model="portfolio.avatar" 
                  label="Label" 
                  counter 
                  hint="Avatar is optional."
                  accept=".jpg,.png,.gif"
                  max-file-size="2540000"
                  @rejected="onRejected"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click.stop="avatar = null" class="cursor-pointer" />
                    </template>

                  </q-file>


                <q-input
                filled
                id="description"
                type="textarea"
                v-model="portfolio.description"
                label="Description"
                hint="Description is optional"
                />



              </div>

          </q-tab-panel>

          <q-tab-panel name="accounts">

            <q-btn round @click="addRow()" color="primary" icon="add" ></q-btn>
            <br><br>
            <q-separator></q-separator>
            <div class="previous"
            v-for="(account, counter) in accounts"
            v-bind:key="counter">

            <div class="row items-center" style="margin:10px 20px 10px 20px;">
              <div class="col-2" style="margin:5px;">
                <q-select
                filled
                clearable
                emit-value
                map-options
                id="exchanges"
                v-model="account.exchange"
                label="Exchange *"
                :options="exchanges_list"
                behavior="menu"
                lazy-rules                  
                :rules="[ val => val && val != null || 'Exchange is required.']"
                />
              </div>
              <div class="col-3" style="margin:5px;">
                <q-input
                filled
                clearable
                id="nickname"
                v-model="account.api_key"
                label="Api Key *"
                hint="Add Api Key"
                maxlength="50"
                lazy-rules
                :rules="[val => !!val || 'Api Key is required.']"
                />
              </div>
              <div class="col-3" style="margin:5px;">
                <q-input
                filled
                clearable
                id="nickname"
                v-model="account.api_secret"
                label="Api Secret *"
                hint="Add Api Secret"
                maxlength="50"
                lazy-rules
                :rules="[val => !!val || 'Api Secret is required.']"
                />
              </div>
              <div class="col-2" style="margin:5px;">
                  <q-input
                    filled
                    id="balance"
                    v-model="account.balance"
                    label="Balance with 2 decimals"
                    mask="#.##"
                    fill-mask="0"
                    reverse-fill-mask
                    hint="Balance is required"
                    input-class="text-right"
                  />

              </div>
              <div class="col" style="margin:5px;">
                <q-toggle
                :false-value="false"

                :true-value="true"
                color="green"
                id="status"
                v-model="account.status"
                />
              </div>
              <div class="col">
                <q-btn round @click="deleteRow(counter)" color="primary" icon="delete" ></q-btn>
              </div>
            </div>
            <q-separator></q-separator>

          </div>

          <p v-if="isValid" class="error">Fileds are empty, please fill alls fields in the row.</p>


        </q-tab-panel>



      </q-tab-panels>
    </q-card>

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

  import { ref } from 'vue'
  import axios from 'axios';
  import '../../router/axiosInterceptor';


  export default {

    setup () {
      return {
        tab: ref('portfolio')
        //tab: ref('accounts')
      }
    },

    data() {
     return {
      portfolio: [],
      portfolios_history: [],   
      exchanges_list:[],
      avatar: ref(null),
      counter: 0,
      isValid: false,
      accounts:[{
        exchange: "",
        api_key: "",
        api_secret: "",
        balance: "",
        status: false
      }]

    }
  },

  methods: {

    addRow() {   

      if (this.accounts[this.counter].exchange == "" || this.accounts[this.counter].api_key == "" || this.accounts[this.counter].api_secret == "" || this.accounts[this.counter].balance == "" ){

        this.isValid = true;

      }else{

        this.accounts.push({
          exchange: "",
          api_key: "",
          api_secret: "",
          balance: "",
          status: false
          
        });
        this.counter += 1;
        this.isValid = false;

      }
    },

    deleteRow(index){
      if(this.counter>0){

        this.accounts.splice(index, 1);
        this.counter -= 1;
        this.isValid = false;

      }
    },

    onRejected (entries) {
      if (entries.length > 0) {
        switch (entries[0].failedPropValidation) {
          case 'max-file-size':
          this.$q.notify({
            position: 'top',
            type: 'negative',
            message: 'File exceeds 2.5 MB.'
          })

          break
        }
      }
    },

    onSubmit () {

      console.log("onSubmit");

      console.log(this.portfolio);
      console.log(this.accounts);







    },

    onReset () {
      console.log("onReset");

    }



  },

  mounted () {

   axios
   .get(process.env.ENV_API_URL + '/portfolios/add/')
   .then(response => {

    let results = [];
    let i;
    let options = response.data.exchanges_list;
    for(i=0; i<options.length; i++){
      let option = options[i];
      results.push({ label: option["name"], value: option["id"],});
    }
    this.exchanges_list = results;

    console.log(this.exchanges_list);

    let history = response.data.portfolios_history;
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

<style type="text/css">

.square{
  min-width: 700px;
  min-height: 600px;
  overflow: auto;
}  

.q-tabs-panes{
  overflow: auto;
}

</style>


