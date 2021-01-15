<template>
  <q-layout view="hHh lpR fFf" class="contentBg">
    <l-header />
    <l-leftbar />
    <l-content />
    <!-- <s-footer /> -->
  </q-layout>
</template>
<script>
export default {
  components: {
    LHeader: () => import("./Header"),
    LLeftbar: () => import("./Leftbar"),
    LContent: () => import("./Content"),
    LFooter: () => import("./Footer")
  }
};
</script>

<style scoped>
.contentBg {
  background: #f5f6fa;
}
</style>
