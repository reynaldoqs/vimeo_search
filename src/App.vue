<template>
  <v-app>
    <v-main>
      <vimeo-search />
    </v-main>
  </v-app>
</template>

<script>
import VimeoSearch from "./components/VimeoSearch";

export default {
  name: "App",

  components: {
    VimeoSearch
  },

  data: () => ({
    //
  })
};
</script>
