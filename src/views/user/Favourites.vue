<template>
  <div class="favourites">
    <h1>Favourites</h1>
  <div>
    <b-col sm="6">
    <b-input-group class="mt-3">
      <b-form-input v-model="favourite.name" placeholder="New favourite name"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="newFav">Add favourite list</b-button>
      </b-input-group-append>
    </b-input-group>
    </b-col>
  </div>
    
    
      <b-card-group columns > 
        <b-card
          bg-variant="secondary"
          text-variant="white"
          :header="fav.name"
          class="text-center mt-3"
          v-bind:key="fav.id"
          v-for="fav of responseUserFavourite"
        >
          <b-card-text v-bind:key="repo.id" v-for="repo of fav.contents">
            <em class="font-weight-bold">ID: </em>{{repo.id}}
          </b-card-text>
          <b-button variant="primary" v-b-modal.modal-1 @click="selectFav(fav)">Edit</b-button>
        </b-card>
        
        <b-modal id="modal-1" title="Edit list">
          <p class="my-4">{{favSelected.name}}</p>
        </b-modal>
      </b-card-group>

      <div v-if="errorMessage">
        <b-alert variant="danger" show>
            {{errorMessage}}
          </b-alert>
      </div>
  </div>
</template>

<script>
  import api from "@/components/backend-api";
  import User from "@/components/user/User.vue";
  import FormGroup from "@/components/FormGroup";
  import Alert from "@/components/alert/Alert";
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "favourites",
    components: { FormGroup, Alert, User },
    data() {
      return {
        errors: [],
        message: "",
        form: {},
        show: true,
        errorMessage: "",
        responseUserFavourite:{
          data:{
            contents:[
              {
                name:"",
                contents:[
                  {
                    id:{}
                  }
                ]
              }
            ]
          }
        },
        favSelected:{},
        favourite: {}
      };
    },

    methods: {
      onReset(evt) {
        evt.preventDefault();
        this.form = "";
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      },
      selectFav(fav){
        this.favSelected=fav
      },
      newFav(){
        var vm = this;
        api.newFav(this.favourite)
          .then(response =>{
            vm.findFavourites();            
          })
          .catch(e => {
            vm.errorMessage = e.response.data.message;
          });

      },
      findFavourites(){
        api.getUserFavourites()
        .then(response => {
          this.responseUserFavourite = response.data.data;
        })
        .catch(e => {
          this.errorMessage = e.response.data;
          this.responseUserFavourite = e; /* TODO: hacer algo con el error */
        });
      }
    },
  validations: {
    form: {}
  },
  mounted() {
    this.findFavourites();
  }
}
</script>
