<template>

  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn
        flat
        dense
        round
        @click="drawer = !drawer"
        icon="menu"
        aria-label="Menu"
        title="All Menu Toggle"
        />


        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px;">
            <q-input color="white" v-model="text" label="Search" dark >
              <template v-slot:prepend>
                <q-icon name="search" color="white" />
              </template>
            </q-input>
          </div>
        </div>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <status-indicator status="active" title="Websockets Indicator" style="height:20px; width: 20px;" />
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm" title="Full-Sreen App">
        </q-btn>
        <q-btn round dense flat color="white" icon="fab fa-github" type="a" href="https://github.com/rzavarce/MapanareVue" target="_blank"  title="Go to Github Repo">
        </q-btn>
        <q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a" href="http://mapanare.es" target="_blank" title="Visit website project">
        </q-btn>



        <q-btn round dense flat color="white" icon="notifications" title="Notifications">
          <q-badge color="red" text-color="white" floating>
            5
          </q-badge>
          <q-menu
          >
          <q-list style="min-width: 100px">
            <messages></messages>
            <q-card class="text-center no-shadow no-border">
              <q-btn label="View All" style="max-width: 120px !important;" flat dense
              class="text-indigo-8"></q-btn>
            </q-card>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn round flat title="Select languajes">
        <q-avatar size="26px">
          <img src="../assets/languajes/es.svg">
        </q-avatar>
        <q-menu>
          <q-card-section>
            <q-item to="/UserProfile" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-avatar size="26px">
                  <img src="../assets/languajes/gb.svg">
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-item to="/" active-class="q-item-no-link-highlighting">
              <q-avatar size="26px">
                <img src="../assets/languajes/it.svg">
              </q-avatar>
            </q-item> 
          </q-card-section>

        </q-menu>
      </q-btn>

      <q-btn round flat title="User Profile">
        <q-avatar size="26px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <q-menu>
          <q-card>
            <q-item style="height: 100px;">
              <q-item-section avatar >
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ this.userData.username }}</q-item-label>
                <q-item-label caption>
                  {{ this.userData.email }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator inset />

            <q-card-section>
              <div class="text-h10">Activity</div>
              <q-item>
                <q-item-section class="text-h12">
                  Settings
                </q-item-section>

                <q-item-section>
                  <q-badge rounded color="primary" label="999+" style="max-width: 40px; margin-left: 40px;" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="text-h12">
                  Messages
                </q-item-section>

                <q-item-section>
                  <q-badge rounded color="red-8" label="999+" style="max-width: 40px; margin-left: 40px;" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section class="text-h12">
                  Logs
                </q-item-section>

                <q-item-section>
                  <q-badge rounded color="blue-8" label="999+" style="max-width: 40px; margin-left: 40px;" />
                </q-item-section>
              </q-item>

            </q-card-section>

            <q-separator inset />


            <q-card-actions align="around">
              <q-btn flat to="/UserProfile">Profile</q-btn>
              <q-btn flat v-on:click='logout()' >Logout</q-btn>
            </q-card-actions>

          </q-card>

        </q-menu>
      </q-btn>

      <q-btn flat @click="drawerRight = true" round dense icon="menu_open" title="Activity Timelog" />

    </div>
  </q-toolbar>
</q-header>




<q-drawer
v-model="drawer"
show-if-above

:mini="!drawer || miniState"
@mouseover="showMiniSite"
@mouseout="hideMiniSite"

:width="300"
:breakpoint="500"
bordered
content-class="bg-primary text-white"
>
<q-scroll-area class="fit">

  <q-toolbar>

    <q-avatar>
      <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
    </q-avatar>

    <q-toolbar-title>Traderbot</q-toolbar-title>

    <q-toggle
    color="blue"
    size='xs'
    checked-icon="check"
    unchecked-icon="clear"
    v-model="miniActive"
    title="Minimenu toggle"
    />

  </q-toolbar>


  <q-list padding>
    <q-item :to="{name: 'dashboard'}" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="dashboard"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Dashboard</q-item-label>
      </q-item-section>
    </q-item>
    <q-item :to="{name: 'PageTest'}" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="verified_user"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Reviews</q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
    icon="admin_panel_settings"
    label="Configs Bot"
    >
    <q-item to="/Configs/General" class="q-ml-xl" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="admin_panel_settings"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>General</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/Configs/Markets" class="q-ml-xl" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="local_police"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Markets</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/Configs/Currencies" class="q-ml-xl" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="local_police"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Currencies</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/Configs/Exchanges" class="q-ml-xl" active-class="q-item-no-link-highlighting">
      <q-item-section avatar>
        <q-icon name="local_police"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Exchanges</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
  <q-expansion-item
  icon="manage_accounts"
  label="Strategies"
  >
  <q-item to="/Strategies" class="q-ml-xl" active-class="q-item-no-link-highlighting">
    <q-item-section avatar>
      <q-icon name="account_circle"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Table Strategies</q-item-label>
    </q-item-section>
  </q-item>
  <q-item to="/Strategies/List" class="q-ml-xl" active-class="q-item-no-link-highlighting">
    <q-item-section avatar>
      <q-icon name="view_list"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>List Strategies</q-item-label>
    </q-item-section>
  </q-item>
  <q-item to="/Strategies/Add" class="q-ml-xl" active-class="q-item-no-link-highlighting">
    <q-item-section avatar>
      <q-icon name="view_list"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>Add Strategies</q-item-label>
    </q-item-section>
  </q-item>
</q-expansion-item>
<q-expansion-item
icon="manage_accounts"
label="Accounts"
>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="account_circle"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Add Account</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="view_list"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>List Account</q-item-label>
  </q-item-section>
</q-item>
</q-expansion-item>
<q-expansion-item
icon="description"
label="Reports"
>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="account_balance"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Operations Report</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="account_balance_wallet"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Balance Report</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="reorder"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Activity Report</q-item-label>
  </q-item-section>
</q-item>

</q-expansion-item>

<q-expansion-item
icon="notifications"
label="Alarms"
>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="alarm_on"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Check Alarms</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="alarm"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Config Alarms</q-item-label>
  </q-item-section>
</q-item>          
</q-expansion-item>

<q-expansion-item
icon="mail"
label="Notificactions"
>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="alternate_email"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>View notifications</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="contact_mail"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Send notification</q-item-label>
  </q-item-section>
</q-item>          
</q-expansion-item>

<q-expansion-item
icon="settings"
label="Settings"
>
<q-item to="/Profile" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="supervised_user_circle"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Profile</q-item-label>
  </q-item-section>
</q-item>
<q-item to="/PageTest" class="q-ml-xl" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="menu_book"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>About</q-item-label>
  </q-item-section>
</q-item>          
</q-expansion-item>

<q-item v-on:click='logout()' to="/" active-class="q-item-no-link-highlighting">
  <q-item-section avatar>
    <q-icon name="exit_to_app"/>
  </q-item-section>
  <q-item-section>
    <q-item-label>Logout</q-item-label>
  </q-item-section>
</q-item>
</q-list>
</q-scroll-area>
</q-drawer>

<q-drawer
side="right"
v-model="drawerRight"
show-if-above
bordered
:width="400"
:breakpoint="3000"
content-class="bg-grey-3"
>
<q-scroll-area class="fit">
  <div class="q-px-lg q-pb-md">
    <card-time-line2 />
  </div>
</q-scroll-area>
    <!--
      in this case, we use a button (can be anything)
      so that user can switch back
      to mini-mode
    -->
    <div class="absolute" style="top: 15px; left: -17px">
      <q-btn
      dense
      round
      unelevated
      color="accent"
      icon="chevron_right"
      @click="drawerRight = false"
      />
    </div>
  </q-drawer>

  <q-page-container class="bg-grey-2">
    <router-view/>
  </q-page-container>


  <q-footer class="bg-black-8 text-white">
    <div class="row" style="padding: 20px 20px 10px 20px;">
        <span class="text-body5 text-white text-weight-bold">
          © 2020 Workflow, Inc. All rights reserved.
        </span>
        <q-space></q-space>
        <q-btn icon="fab fa-github" flat dense color="white-8"></q-btn>
        <q-btn icon="fab fa-facebook" flat dense color="white-8"></q-btn>
        <q-btn icon="fab fa-twitter" flat dense color="white-8"></q-btn>
        <q-btn icon="fab fa-instagram" flat dense color="white-8"></q-btn>
      </div>
  </q-footer>


</q-layout>

</template>

<script>

  import axios from 'axios';

  import Messages from "./Messages";

  import store from '../store';
  import Vue from 'vue';



  export default {
    data () {
      return {
        drawer: false,
        miniActive: true,
        miniState: false,
        drawerRight: false,
        userData: '',
        vm: undefined, 
        text: ''
      }
    },
    components: {
      Messages,
      CardTimeLine2: () =>  import('components/cards/CardTimeLine2'),

    },
    mounted () {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        // "Access-Control-Allow-Origin": "*",
        "Authorization": "JWT " + this.$store.state.jwt
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true
    };

    /*
    axios
    .get(process.env.ENV_API_URL + '/session/', axiosConfig)
    .then(response => {
        //this.info = response.data.bpi
        console.log(response.data[0]["username"]);

        this.userData = response.data[0];

      })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
    */
  },
  methods: {

    showMiniSite (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode

      if (!this.miniActive) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    hideMiniSite (e) {
            // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode

      if (!this.miniActive) {
        this.miniState = true

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    logout () {

     axios
     .post(process.env.ENV_API_URL + "/authentication/logout/", {})
        //.post(this.$router.dashboard, payload)
        .then((response) => {

          console.log(response.data);
          console.log("pasoooooo");
          //this.$router.push({ name: "login" });
          this.$router.go('/')



        })
        .catch((error) => {

          console.log("Logout error: ", error);

        });

      // this.$router.go("/");


      
    }
  }
}
</script>

<style>

</style>
