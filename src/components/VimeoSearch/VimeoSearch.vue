<template>
  <div>
    <search-bar @onSearch="search" />
    <video-list
      :videos="videos"
      :isLoading="isLoading"
      :error="error"
      :total="total"
      @onSelect="select"
      @onIntersected="scrollTrigger"
    />
    <v-dialog v-model="modal" persistent max-width="420">
      <video-detail :video="selectedVideo" @onClose="(modal = false,selectedVideo= null)" />
    </v-dialog>
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import { getVideos, getVideo } from "../../services";
export default {
  name: "vimeo-search",
  components: { SearchBar, VideoList, VideoDetail },
  data: () => ({
    videos: [],
    selectedVideo: null,
    modal: false,
    isLoading: false,
    error: null,
    query: null,
    page: null,
    per_page: null,
    direction: null,
    sort: null,
    paging: { previous: "initial", next: "initial" },
    total: null
  }),
  methods: {
    async search(data) {
      const { query, direction, sort } = data;

      this.query = query;
      this.direction = direction;
      this.sort = sort;
      if (query !== "") {
        this.videos = [];
        await this.fetch(query);
      }
    },
    async select(video) {
      this.modal = true;
      const { data } = await getVideo(video.uri);
      //selected video
      console.log(data);
      this.selectedVideo = data || video;
    },
    async scrollTrigger() {
      if (this.videos.length !== 0 && this.paging.next && !this.isLoading) {
        console.info("infinity scroll working...");
        this.page += 1;
        await this.fetch(this.query, this.page, this.per_page, true);
      }
    },
    async fetch(query = "", page = 1, per_page = 20, onScroll = false) {
      try {
        this.error = null;
        this.isLoading = true;
        const queryParams = {
          query,
          page,
          per_page,
          direction: this.direction,
          sort: this.sort
        };
        const { data } = await getVideos(queryParams);
        if (onScroll) {
          this.videos = [...this.videos, ...data.data];
        } else {
          this.videos = data.data;
        }
        this.page = data.page;
        this.per_page = data.per_page;
        this.paging.next = data.paging.next;
        this.paging.previous = data.paging.previous;
        this.total = data.total;
        this.isLoading = false;
      } catch (error) {
        this.error = error.toString();
        this.isLoading = false;
        console.error(error);
      }
    }
  }
};
</script>
