<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="query"
            outlined
            rounded
            clearable
            append-icon="mdi-magnify "
            label="Buscar"
            type="text"
          >
            <template v-slot:append-outer>
              <v-btn icon @click="modal = true" class="tune-menu">
                <v-icon>mdi-tune</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="modal" max-width="320">
      <v-card>
        <v-card-title class="headline">Configuración</v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="4">
                <h3>Orden</h3>
              </v-col>
              <v-col cols="8">
                <v-select @change="sortChange" :items="sorts" label="Orden" solo dense></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4">
                <h3>Dirreción</h3>
              </v-col>
              <v-col cols="8">
                <v-select
                  @change="directionChange"
                  :items="directions"
                  label="Dirreción"
                  solo
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="modal = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="apply">Aplicar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>
import { debounce } from "../../../ultis";
export default {
  data: () => ({
    query: null,
    modal: false,
    direction: null,
    directions: ["asc", "desc"],
    sort: null,
    sorts: [
      "alphabetical",
      "comments",
      "date",
      "duration",
      "likes",
      "plays",
      "relevant"
    ]
  }),

  watch: {
    query(val) {
      this.callSearch(val);
    }
  },
  methods: {
    callSearch: debounce(function(query) {
      const queryParams = {
        query: query ? query : "",
        direction: this.direction,
        sort: this.sort
      };
      this.$emit("onSearch", queryParams);
    }, 700),
    apply() {
      const queryParams = {
        query: this.query ? this.query : "",
        direction: this.direction,
        sort: this.sort
      };
      this.$emit("onSearch", queryParams);
      this.modal = false;
    },
    directionChange(val) {
      this.direction = val;
    },
    sortChange(val) {
      this.sort = val;
    }
  }
};
</script>
<style scoped>
.tune-menu {
  position: relative;
  top: -8px;
}
</style>