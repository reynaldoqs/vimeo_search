<template>
  <v-container>
    <div v-show="total !== null && !isLoading" class="results">Resultados encontrados {{total}}</div>
    <v-row v-if="error !== null" class="mg-6" justify="center" no-gutters>
      <v-col cols="10">
        <v-alert dense outlined type="error">{{error}}</v-alert>
      </v-col>
    </v-row>
    <v-row v-else class="mg-6" justify="center" no-gutters>
      <v-col>
        <v-fade-transition group leave-absolute>
          <v-list three-line key="list">
            <template v-for="(video,index) in videos">
              <v-list-item :key="`${index}-{$video.uri}`" @click="select(video)">
                <v-list-item-content>
                  <v-list-item-title v-html="video.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="video.description"></v-list-item-subtitle>
                </v-list-item-content>
                <v-img
                  max-width="80"
                  contain
                  :src="video.pictures.sizes[1].link || video.pictures.sizes[0].link"
                />
              </v-list-item>
              <v-divider v-if="videos.length !== index+1" :key="index" :inset="true"></v-divider>
            </template>
          </v-list>
          <div class="custom-loading" key="progress">
            <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
          </div>
        </v-fade-transition>
        <div class="last-element" ref="lastElement"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "video-list",
  props: ["videos", "isLoading", "error", "total"],
  data: () => ({
    oberserver: null,
    intersected: false
  }),
  methods: {
    select(video) {
      this.$emit("onSelect", video);
    }
  },
  mounted() {
    this.oberserver = new IntersectionObserver(entries => {
      const el = entries[0];
      if (el.isIntersecting) {
        this.$emit("onIntersected");
      }
    });
    this.oberserver.observe(this.$refs.lastElement);
  }
};
</script>
<style  scoped>
.container {
  padding: 0;
  position: relative;
}
.custom-loading {
  width: 100%;
  display: flex;
  justify-content: center;
}
.last-element {
  width: 100%;
  height: 40px;
}
.results {
  position: absolute;
  right: 16px;
  top: -20px;
  color: gray;
  font-size: 12px;
}
</style>