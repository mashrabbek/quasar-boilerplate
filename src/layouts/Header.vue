<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="isLeftDrawerOpen = !isLeftDrawerOpen"
      />

      <q-toolbar-title>
        Insurance App
      </q-toolbar-title>

      <div>Logout</div>
      <q-btn
        flat
        class="icon-color"
        dense
        icon="exit_to_app"
        size="16px"
        @click="logout()"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { AuthService } from "@/services/auth.service";
export default {
  computed: {
    isLeftDrawerOpen: {
      get() {
        return this.$store.getters["layout/leftDrawerOpen"];
      },
      set(val) {
        this.$store.dispatch("layout/setLeftDrawerOpen", val);
      }
    }
  },
  methods: {
    logout() {
      console.log("logout");
      AuthService.logout();
    }
  }
};
</script>

<style></style>
