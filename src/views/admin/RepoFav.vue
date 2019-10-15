<template>
  <div class="repofav">
    <h1>Favorite repositories</h1>
    <b-container fluid>
      <!-- User Interface controls -->
      <div v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter On"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            description="Leave all unchecked to filter on all data"
            class="mb-0"
          >
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="id">Id</b-form-checkbox>
              <b-form-checkbox value="registerDate">Registered</b-form-checkbox>
              <b-form-checkbox value="language">Language</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Show user amount
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
import api from "@/components/backend-api";
export default {
  name: "repofav",
  components: { Admin },
  data() {
    return {
      items: [],
      fields: [
        { key: "id", label: "id", sortable: true, sortDirection: "desc" },
        {
          key: "registerDate",
          label: "Registered",
          sortable: true,
          class: "text-center"
        },
        {
          key: "language",
          label: "Language",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      errorMessage: ""
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    api
      .getRepositories()
      .then(response => {
        this.items = response.data.data;
        this.totalRows = this.items.length;
      })
      .catch(e => {
        if (e.response.data.message) {
          this.errorMessage = e.response.data.message;
        } else {
          this.errorMessage = e.response.data.data;
        }
        this.items = [];
        this.totalRows = this.items.length;
      });
  },

  methods: {
    searchRepository() {
      this.viewResult = true;
    },
    info(item, index, button) {
      this.infoModal.title = `Id: ${item.id}`;
      api
        .getUserAmount(item.id)
        .then(response => {
          this.infoModal.content =
            "User amount: " + response.data.data.userAmount;
        })
        .catch(e => {
          if (e.response.data.message) {
            this.errorMessage = e.response.data.message;
          } else {
            this.errorMessage = e.response.data.data;
          }

          //this.infoModal.content = "Error in server";
        });
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
