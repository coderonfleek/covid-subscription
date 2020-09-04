<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Stay Up to Date</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Full Name"
                  v-model="subscriptionForm.fullname"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <v-text-field
                  label="Phone (Ext)(Number)"
                  v-model="subscriptionForm.phone"
                  prepend-icon="mdi-phone"
                  type="tel"
                ></v-text-field>

                <v-text-field
                  label="Email"
                  v-model="subscriptionForm.email"
                  prepend-icon="mdi-email"
                  type="email"
                ></v-text-field>

                <v-select
                  :items="locations"
                  item-text="name"
                  item-value="name"
                  prepend-icon="mdi-map-marker"
                  label="Location"
                  v-model="subscriptionForm.location"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="subscribe()" :disabled="loading">{{
                loading ? "Subscribing..." : "Subscribe"
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="showNotification"
        top
        right
        :color="notificationColor"
      >
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
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import values from "../values";

export default {
  name: "home",
  data() {
    return {
      subscriptionForm: {},
      locations: [],
      loading: false,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "blue"
    };
  },
  created: async function() {
    const locations = await axios.get(`${values.api_url}/locations`);

    this.locations = locations.data;
  },
  components: {},
  methods: {
    async subscribe() {
      console.log(this.subscriptionForm);
      let data = { ...this.subscriptionForm };
      if (data.fullname && data.phone && data.email && data.location) {
        try {
          const subscription_response = await axios.post(
            `${values.api_url}/savesubscription`,
            data
          );

          this.subscriptionForm = {};

          this.displayNotification(
            subscription_response.data.message,
            "success"
          );
        } catch (error) {
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
