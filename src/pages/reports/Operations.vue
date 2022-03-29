<template>
  <q-page class="q-pa-md">
    <q-card>

      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">Operations Report</span>
              <br>
              <span class="text-subtitle2">Reports Adminitration.</span>
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
                <q-breadcrumbs-el label="Reports" icon="admin_panel_settings" to="/Strategies" />
                <q-breadcrumbs-el label="Operations" icon="admin_panel_settings" />
              </q-breadcrumbs>
            </div>
          </div>

        </div>

      </q-card-section>

      <q-separator></q-separator>
      <div class="col-md-12 col-xs-12" style="margin:20px 10px">
        
          <apex-line />

      </div>

      <q-separator></q-separator><br>



    <q-table
    title=""
    row-key="name"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :grid="mode == 'grid'"
    >

    <template v-slot:top-left>
      <q-btn
      color="primary"
      icon-right="add"
      no-caps
      @click="$router.replace('/Strategies/Add')"
      />
    </template>
    <template v-slot:top-right="props">
      <q-input
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-btn
    flat
    round
    dense
    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
    @click="setFs(props)"
    >
    <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
      props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
    }}</q-tooltip>
  </q-btn>

  <q-btn
  flat
  round
  dense
  :icon="mode === 'grid' ? 'list' : 'grid_on'"
  @click="mode = mode === 'grid' ? 'list' : 'grid'"
  >
  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{mode === "grid" ? "List" : "Grid"}}</q-tooltip>

  </q-btn>

</template>


<template v-slot:body-cell-actions="props">
  <q-td :props="props">
    <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
    <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
  </q-td>          
</template>

</q-table>





</q-card>
</q-page>
</template>


<script>

  import axios from 'axios';
  import '../../router/axiosInterceptor';
  import { defineComponent, defineAsyncComponent } from 'vue'



  const ApexLine = defineAsyncComponent(() =>
    import('components/ApexLine.vue')
  )

  export default {
    data() {
      return {
        filter: '',
        mode: "list",
        columns: [],
        rows: []

      }
    },
    components: {
      ApexLine,      
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
     .post(process.env.ENV_API_URL + '/reports/operations/')
     .then(response => {

        console.log(response.data.operations);

        this.columns = [
          { name: 'datetime', label: 'Datetime', field: 'datetime', align: 'center',  sortable: true },
          { name: 'portfolio', label: 'Portfolio', field: 'portfolio', align: 'center',  sortable: true },
          { name: 'exchange', label: 'Exchange', field: 'exchange', align: 'center',  sortable: true },
          { name: 'market', label: 'Market', field: 'market', align: 'center',  sortable: true },
          { name: 'action', label: 'Action', field: 'action', align: 'center',  sortable: true },
          { name: 'amount', label: 'Amount', field: 'amount', align: 'center',  sortable: true },
          { name: 'balance', label: 'Balance', field: 'balance', align: 'center',  sortable: true },
          { name: 'price', label: 'Price', field: 'price', align: 'center',  sortable: true },
          { name: 'cost', label: 'cost', field: 'cost', align: 'center',  sortable: true },
          { name: 'actions', label: 'Actions', field: 'action', align:'center' },
      ];


      let results = [];
      let i;
      let options = response.data.operations;
      for(i=0; i<options.length; i++){
        let option = options[i];
        results.push({ 
          datetime: option["created_date"],
          portfolio: option["account"]['portfolio']['title'], 
          exchange: option["exchange"]['name'],
          market: option["market"]["symbol"], 
          action: option["action"],
          amount: option["amount"], 
          balance: option["balance"],
          price: option["price"], 
          cost: option["cost"],
        });
      }
      this.rows = results;

    })
     .catch(error => {
      console.log(error)
      this.errored = true
    })
     .finally();

     

   },  

}
</script>