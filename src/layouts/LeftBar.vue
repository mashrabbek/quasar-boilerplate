<template>
  <div>
    <q-drawer
      v-model="isLeftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu Links
        </q-item-label>
        <LeftMenuLink v-for="link in menus" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
import LeftMenuLink from "components/LeftMenuLink.vue";

export default {
  components: { LeftMenuLink },
  created() {},
  data() {
    return {};
  },
  computed: {
    isLeftDrawerOpen: {
      get() {
        return this.$store.getters["layout/leftDrawerOpen"];
      },
      set() {
        this.$store.dispatch("layout/setLeftDrawerOpen");
      }
    },
    menus() {
      return this.$store.getters["userdata/userMenus"];
    }
  }
};
</script>
<style scoped></style>
