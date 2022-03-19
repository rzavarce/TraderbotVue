<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <span class="text-h4 text-indigo-8">Candlestick Chart</span>
              <br>
              <span class="text-subtitle2">Report Adminitration.</span>
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
                <q-breadcrumbs-el label="Reports" icon="admin_panel_settings" to="/Porfolios" />
                <q-breadcrumbs-el label="Chart" icon="admin_panel_settings" />
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
   
                <div class="col-md-12 col-xs-12">
                  <q-card>
                    <iframe :src="path_chart" frameborder="1" width="100%" height="800px"></iframe>

                  </q-card>
                </div>


            </div>

          </q-card-section>

        </div>      
        
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      connection: null,
      path_chart : ""
    }
  },
  methods: {
    
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    
    this.path_chart = "http://localhost:8081/trading/?token=" + localStorage.getItem('auth_token');
    console.log(this.path_chart);
  }
}

</script>
<style type="text/css">


</style>