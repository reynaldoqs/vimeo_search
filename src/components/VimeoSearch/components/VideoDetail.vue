<template>
  <v-card>
    <template v-if="!video">
      <div class="custom-loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <v-card-title class="headline">{{video.name}}</v-card-title>
      <v-card-text>{{video.description}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('onClose')">Cerrar</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
<script>
export default {
  name: "video-detail",
  props: ["video"]
};
</script>
<style  scoped>
.custom-loading {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>