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
        Quasar App
      </q-toolbar-title>

      <div>Quasar v</div>
    </q-toolbar>
  </q-header>
</template>

<script>
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
  }
};
</script>

<style></style>
