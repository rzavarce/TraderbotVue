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
                <h3>Bitcoin Prices in U.S. Dollars</h3>

                <div class="col-md-12 col-xs-12">
                  <q-card>
                    <apex-candlestick />
                  </q-card>
                </div>
                <div class="col-md-12 col-xs-12">
                  <q-card>
                    <apex-line />
                  </q-card>
                </div>
                <div class="col-md-12 col-xs-12">
                  <q-card>
                    <apex-bar />
                  </q-card>
                </div>
                <div class="col-md-12 col-xs-12">
                  <q-card>
                    <apex-column />
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

import axios from 'axios' 

import { defineComponent, defineAsyncComponent } from 'vue'


const ApexCandlestick = defineAsyncComponent(() =>
  import('components/ApexCandlestick.vue')
)

const ApexBar = defineAsyncComponent(() =>
  import('src/components/ApexBar.vue')
)

const ApexColumn = defineAsyncComponent(() =>
  import('components/ApexColumn.vue')
)

const ApexLine = defineAsyncComponent(() =>
  import('components/ApexLine.vue')
)

export default defineComponent({
  name: 'PageIndex',
  components: {
    ApexBar,
    ApexLine,
    ApexColumn,
    ApexCandlestick,
    
  }
})

</script>
<style type="text/css">


</style>