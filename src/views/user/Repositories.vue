<template>
  <div class="repositories">
    <User />
    <h1>Repositories</h1>
    <br>
    <!--Formulario de busqueda-->
    <b-container fluid>

      <!--Fork-->
      <b-row align-h="center">        
        <b-form inline @submit.stop.prevent>
          <b-form-checkbox v-model="checkbox_forks" value="true" unchecked-value="false" class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">Fork</label>
          <div v-show="trueCheckbox(checkbox_forks)"> 
            <b-form-select class="mb-2 mr-sm-2 mb-sm-0" :value="null" :options="{'=':'=', '>':'>', '<':'<'}"
              id="inline-form-custom-select-pref" v-model="selectFork">
                <template v-slot:first>
                  <option :value='null'>Choose</option>
                </template>
            </b-form-select>
            <b-input id="inline-form-input" placeholder="Number of forks" v-model="fork" type="number"></b-input>
            <b-form-invalid-feedback :state="validationNumber(fork)">
              *Enter number greater than zero
            </b-form-invalid-feedback>
            <b-form-invalid-feedback :state="validationSelector(selectFork)">
              *Choose less, greater or equal
            </b-form-invalid-feedback>
          </div>
        </b-form>
      </b-row>
      <br />

      <!--Stars-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox v-model="checkbox_stars" value="true" unchecked-value="false" class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">Stars</label>
          <div v-show="trueCheckbox(checkbox_stars)"> 
            <b-form-select class="mb-2 mr-sm-2 mb-sm-0" :value="null" :options="{'=':'=', '>':'>', '<':'<'}"
            id="inline-form-custom-select-pref" v-model="selectStars">
              <template v-slot:first>
                <option :value='null'>Choose</option>
              </template>
            </b-form-select>
            <b-input id="inline-form-input" placeholder="Number of stars" v-model="stars" type="number"></b-input>
            <b-form-invalid-feedback :state="validationNumber(stars)">
              *Enter number greater than zero
            </b-form-invalid-feedback>
            <b-form-invalid-feedback :state="validationSelector(selectStars)">
              *Choose less, greater or equal
            </b-form-invalid-feedback>
          </div>
        </b-form>
      </b-row>
      <br />

      <!--Language-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox v-model="checkbox_language" value="true" unchecked-value="false" class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Language</label
          >
          <div v-show="trueCheckbox(checkbox_language)"> 
            <b-input id="inline-form-input" placeholder="Language" v-model="language" type="text"></b-input>
            <b-form-invalid-feedback :state="validationText(language)">
              *Enter language
            </b-form-invalid-feedback>
          </div>  
        </b-form>
      </b-row>
      <br />

      <!--Name repo-->
      <b-row align-h="center">
        <b-form inline>
          <b-form-checkbox v-model="checkbox_name" value="true" unchecked-value="false" class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">Repo name</label>
          <div v-show="trueCheckbox(checkbox_name)"> 
            <b-input id="inline-form-input" placeholder="Name" v-model="name" type="text"></b-input>
            <b-form-invalid-feedback :state="validationText(name)">
              *Enter repository name
            </b-form-invalid-feedback>
          </div>
        </b-form>
      </b-row>
      <br>

      <!-- Repositories from user -->
      <b-row align-h="center"> 
        <b-form inline>
          <b-form-checkbox v-model="checkbox_username" value="true" unchecked-value="false" class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">Repo from user</label>
          <div v-show="trueCheckbox(checkbox_username)"> 
            <b-input id="inline-form-input" placeholder="Name" v-model="username" type="text"></b-input>
            <b-form-invalid-feedback :state="validationText(username)">
              *Enter username
            </b-form-invalid-feedback>
          </div>
        </b-form>
      </b-row>
      <br />

      <!--Button Search-->
      <b-button variant="primary" @click="searchRepositories">Search</b-button>
      <br>
    </b-container><!--Fin formulario de busqueda-->

    <!--Mostrar error si ingresaron datos no validos-->
    <b-container v-show="showMessageErrorForm">
        <b-row align-h="center">
          <b-alert variant="danger" show>
            {{messageErrorForm}}
          </b-alert>
        </b-row>
    </b-container>

    <h5>{{stringSearchRepositories}}</h5>

    <!--TODO: hacer cuadro de resultado-->



  </div>  
</template>

<script>
import api from "@/components/backend-api";
import User from "@/components/user/User.vue";
import FormGroup from "@/components/FormGroup";
import Alert from "@/components/alert/Alert";
import { required } from "vuelidate/lib/validators";
export default {
  name: "repositories",
  components: { FormGroup, Alert, User },
  data() {
    return {
      errors: [],
      message: "",
      form: {},
      show: true,
      checkbox_forks:'true',
      checkbox_stars:'true',
      checkbox_language:'true',
      checkbox_name:'true',
      checkbox_username:'true',
      selectFork:null,
      selectStars:null,
      fork:"",
      stars:"",
      language:"",
      name:"",
      username:"",
      stringSearchRepositories:"",
      showMessageErrorForm:false,
      messageErrorForm:"",
    };
  },

  methods: {
    repositories() {
      var vm = this;
      api
        .repositories(this.form)
        .then(response => {})
        .catch(e => {
          this.message = e.response.data.msg;
          this.errors.push(e.response.data);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$v.form.$touch();
      if (!this.$v.$invalid) {
        //
      }
    },

    /* Validaciones del form */
    validationNumber(number){ /* Para que no ingresen numeros negativos */
      return number>0
    },
    trueCheckbox(stringCheckbox){/* Hago esto porque no me toma el valor true directamente, sino lo hace como un string */
      return stringCheckbox==="true"
    },
    validationText(text){
      return text.length>0
    },
    validationSelector(selector){
      return !(selector===null)
    },
    validateFormNumber(stringCheckbox,selector,number){
      return !this.trueCheckbox(stringCheckbox) || ( this.validationSelector(selector) && this.validationNumber(number) )
    },
    validateFormText(stringCheckbox,text){
      return !this.trueCheckbox(stringCheckbox) || this.validationText(text)
    },
    validationAllForm(){
      return   this.validateFormNumber(this.checkbox_forks,this.selectFork,this.fork) &&
               this.validateFormNumber(this.checkbox_stars,this.selectStars,this.stars) &&
               this.validateFormText(this.checkbox_language,this.language) &&
               this.validateFormText(this.checkbox_name,this.name)  &&
               this.validateFormText(this.checkbox_username,this.username)
    },

    /* generar el string para la busqueda del repositorio */
    generateStringSearchRepositories(){
      this.stringSearchRepositories=''
      if(this.trueCheckbox(this.checkbox_forks)){
        this.stringSearchRepositories=this.stringSearchRepositories+'forks:'+this.selectFork+this.fork
      }
      if(this.trueCheckbox(this.checkbox_stars)){
        if(this.stringSearchRepositories.length>0){ /* hago este length porque asi puedo poner el && si es que hay otro parametro de busqueda */
          this.stringSearchRepositories=this.stringSearchRepositories+'+'
        }
        this.stringSearchRepositories=this.stringSearchRepositories+'stars:'+this.selectStars+this.stars
      }
      if(this.trueCheckbox(this.checkbox_language)){
        if(this.stringSearchRepositories.length>0){ /* hago este length porque asi puedo poner el && si es que hay otro parametro de busqueda */
          this.stringSearchRepositories=this.stringSearchRepositories+'+'
        }
        this.stringSearchRepositories=this.stringSearchRepositories+'language:'+this.language
      }
      if(this.trueCheckbox(this.checkbox_name)){
        if(this.stringSearchRepositories.length>0){ /* hago este length porque asi puedo poner el && si es que hay otro parametro de busqueda */
          this.stringSearchRepositories=this.stringSearchRepositories+'+'
        }
        this.stringSearchRepositories=this.stringSearchRepositories+this.name+' in:name'
      }
      if(this.trueCheckbox(this.checkbox_username)){
        if(this.stringSearchRepositories.length>0){ /* hago este length porque asi puedo poner el && si es que hay otro parametro de busqueda */
          this.stringSearchRepositories=this.stringSearchRepositories+'+'
        }
        this.stringSearchRepositories=this.stringSearchRepositories+'user:'+this.username
      }
    },
    allCheckboxFalse(){
      return  !this.trueCheckbox(this.checkbox_forks) &&
              !this.trueCheckbox(this.checkbox_stars) &&
              !this.trueCheckbox(this.checkbox_language) &&
              !this.trueCheckbox(this.checkbox_name) &&
              !this.trueCheckbox(this.checkbox_username)
    },

    searchRepositories(){
      this.showMessageErrorForm=false
      this.messageErrorForm=""
      if(this.allCheckboxFalse()){
        this.showMessageErrorForm=true
        this.messageErrorForm="Select one filter"
      }else{
        if(this.validationAllForm()){
          this.generateStringSearchRepositories()
          /* TODO: busqueda de repositorio */
        }else{
          this.showMessageErrorForm=true
          this.messageErrorForm="Wrong fields!!!"
        }
      }

    }

  },
  validations: {
    form: {}
  }
};
</script>
