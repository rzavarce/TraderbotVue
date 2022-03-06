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
                <q-breadcrumbs-el label="Strategies" icon="admin_panel_settings" to="/Strategies" />
                <q-breadcrumbs-el label="List" icon="admin_panel_settings" />
              </q-breadcrumbs>
            </div>
          </div>

        </div>

      </q-card-section>

      <q-separator></q-separator>



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




  const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'actions', label: 'Actions', field: 'action', align:'center' },
  ]

  const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
  ]

  export default {
    data() {
      return {
        filter: '',
        mode: "list",
        columns,
        rows

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
     .get(process.env.ENV_API_URL + '/strategies/')
     .then(response => {

      //console.log(response.data.results);

      this.strategy = response.data.results[0];

      console.log(this.strategy);



    })
     .catch(error => {
      console.log(error)
      this.errored = true
    })
     .finally();

     

   },  

}
</script>