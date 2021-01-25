<template>
  <q-item clickable tag="a" :to="url">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      {{ name }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "LeftMenuLink",
  props: {
    name: {
      type: String,
      required: true
    },

    url: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
