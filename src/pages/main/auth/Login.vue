<template>
  <div class="row justify-center">
    <div class="column self-center">
      <q-card style="width: 360px" flat>
        <q-card-section class="row justify-center">
          <!-- <span>{{ $t("auth._self") }}</span> -->
        </q-card-section>
        <q-form>
          <q-card-section>
            <!-- LOGIN -->
            <q-input
              dense
              square
              outlined
              clearable
              v-model.trim="credentials.username"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <!-- Password -->
            <q-input
              dense
              square
              outlined
              clearable
              v-model="credentials.password"
              :placeholder="$t('auth.password')"
              v-on:keyup.enter="handleSubmit()"
              :type="showPass ? 'text' : 'password'"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  :icon="showPass ? 'o_visibility' : 'o_visibility_off'"
                  @click="showPass = !showPass"
                />
              </template>
            </q-input>
            <q-select
              outlined
              class="col-xs-12 col-sm-6 col-md-6"
              v-model="credentials.lang"
              :options="langsList"
              option-value="value"
              option-label="text"
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="language" />
              </template>
            </q-select>
          </q-card-section>
          <q-card-section>
            <q-btn
              class="full-width"
              color="primary"
              @click="handleSubmit()"
              v-on:keyup.enter="handleSubmit()"
              >Sign In</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/services/auth.service";
import router from "@/router/index";

export default {
  data() {
    return {
      showPass: false,
      credentials: {
        username: null,
        password: null,
        lang: { text: "Русский", value: "ru" }
      },
      message: "",
      langsList: [
        { text: "Русский", value: "ru" }, // uz, ru, en
        { text: "Узбек крилл", value: "uzkr" },
        { text: "English", value: "en" },
        { text: "O'zbek Lotin", value: "uz" }
      ],
      loginError: false
    };
  },
  methods: {
    handleSubmit() {
      //Perform a simple validation that email and password have been typed in
      if (!!this.credentials.username && !!this.credentials.password) {
        //LoadingService.showLoadingHourGlass();
        console.log({ credentials: this.credentials });

        AuthService.login(this.credentials, (err, res) => {
          if (res) {
            console.log("success");
            // LoadingService.hideLoading();
            // this.clearForm();
            // NotifyService.showSuccessMessage("Successfully logged in");
            router.push(router.history.current.query.redirect || "/");
          } else {
            console.log(err);
            //LoadingService.hideLoading();
            //NotifyService.showErrorMessage("Error in login");
          }
        });
      } else {
        //LoadingService.hideLoading();
        //NotifyService.showErrorMessage("Enter credentials correctly");
      }
    },
    clearForm() {
      this.credentials.username = "";
      this.credentials.password = "";
      //this.$v.credentials.$reset(); // TODO resetting validation
    },
    onLangChange(lang) {
      //  this.$i18n.locale = lang;
    }
  }
};
</script>

<style></style>
