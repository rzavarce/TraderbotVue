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
                <q-breadcrumbs-el label="Reports" icon="admin_panel_settings" to="/Porfolios" />
                <q-breadcrumbs-el label="List" icon="admin_panel_settings" />
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

                <h3>Bitcoin Prices in U.S. Dollars</h3>

              <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>

            </div>

          </q-card-section>

        </div>      
        
    </div>
</q-card>
</q-page>
</template>

<script>

import axios from 'axios' 

import { D3LineChart } from 'vue-d3-charts';



export default {
  name: "HelloWorld",
  components: {
    D3LineChart,
  },
  data() {
    return {
      chart_data: [
        {hours: 238, production: 134, date: 2000},
        {hours: 938, production: 478, date: 2001},
        {hours: 1832, production: 1392, date: 2002},
        {hours: 2092, production: 2343, date: 2003},
        {hours: 2847, production: 2346, date: 2004},
        {hours: 2576, production: 2233, date: 2005},
        {hours: 2524, production: 2325, date: 2006},
        {hours: 1648, production: 2456, date: 2007},
        {hours: 2479, production: 2329, date: 2008},
        {hours: 3200, production: 2438, date: 2009}
      ],
      chart_config: {
        values: ['hours', 'production'],
        date: {
          key: 'date',
          inputFormat: '%Y',
          outputFormat: '%Y',
        },
        points:false,
        axis: {
          yTicks: 3,
        }
      },
      count: 2010,
    }
  },
  
};
</script>
<style type="text/css">


</style>