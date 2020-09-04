<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm6 md5 class="mr-5 mt-15">
        <div class="cards-container">
          <v-card color="blue" class="white--text ml-5">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ locations.length }}</div>
                    <h3>Locations</h3>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5 class="card-icon-container">
                <v-icon class="card-icons">mdi-map-marker</v-icon>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3"></v-card-actions>
          </v-card>

          <v-card color="red accent-4" class="white--text mt-5 ml-5">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div class="p-5">
                    <div class="headline">{{ subscriptions.length }}</div>
                    <h3>Subscriptions</h3>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5 class="card-icon-container">
                <v-icon class="card-icons">mdi-bell-ring</v-icon>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3"></v-card-actions>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs12 sm6 md6 class="mr-5 mt-15">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Broadcast Update</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Total Number of New Cases"
                v-model="alertsForm.new"
                prepend-icon="mdi-account"
                type="number"
              ></v-text-field>

              <v-text-field
                label="Total Number of Confirmed Cases"
                v-model="alertsForm.confirmed"
                prepend-icon="mdi-account"
                type="number"
              ></v-text-field>

              <v-text-field
                label="Total Number of Discharged Cases"
                v-model="alertsForm.discharged"
                prepend-icon="mdi-account"
                type="number"
              ></v-text-field>

              <v-text-field
                label="Total Number of Deaths"
                v-model="alertsForm.deaths"
                prepend-icon="mdi-account"
                type="number"
              ></v-text-field>

              <v-select
                :items="locations"
                item-text="name"
                item-value="name"
                prepend-icon="mdi-account"
                label="Location"
                v-model="alertsForm.location"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendAlerts()" :disabled="loading">{{
              loading ? "Sending Broadcast..." : "Broadcast"
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="showNotification" top right :color="notificationColor">
      {{ notificationMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="showNotification = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import values from "../values";

export default {
  name: "home",
  data() {
    return {
      alertsForm: {},
      locations: [],
      subscriptions: [],
      loading: false,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "blue"
    };
  },
  created: async function() {
    const locations = await axios.get(`${values.api_url}/locations`);
    const subscriptions = await axios.get(`${values.api_url}/subscriptions`);

    this.locations = locations.data;
    this.subscriptions = subscriptions.data;
  },
  components: {},
  methods: {
    async sendAlerts() {
      console.log(this.alertsForm);

      let data = { ...this.alertsForm };
      if (
        data.new &&
        data.confirmed &&
        data.discharged &&
        data.deaths &&
        data.location
      ) {
        try {
          this.loading = true;
          const subscription_response = await axios.post(
            `${values.api_url}/sendalerts`,
            data
          );

          this.alertsForm = {};

          this.displayNotification(
            subscription_response.data.message,
            "success"
          );

          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.displayNotification(
            "Something went wrong. Please try again later",
            "error"
          );
        }
      } else {
        this.displayNotification("All fields are Required", "error");
      }
    },

    displayNotification(message, type) {
      let snackbarColor = type == "error" ? "red" : "green";

      this.notificationColor = snackbarColor;
      this.showNotification = true;
      this.notificationMessage = message;
    }
  }
};
</script>

<style scoped>
.cards-container {
  width: 70%;
}
.card-icon-container {
  text-align: center;
  padding-top: 10px;
}
.card-icons {
  font-size: 65px;
  color: white;
}
</style>
