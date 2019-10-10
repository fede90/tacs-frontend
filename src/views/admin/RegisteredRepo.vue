<template>
  <div class="registeredrepo">
    <Admin />
    <h1>Registered Repositories</h1>
    

    <br />
    <br />

    <!-- Mostrar resultados -->
    <b-container v-show="!showError">
      <h3><em class="font-weight-bold">Today: </em> {{ today }}</h3>
      <h3><em class="font-weight-bold">Last 3 days: </em> {{ last_3_days }}</h3>
      <h3><em class="font-weight-bold">Last week: </em> {{ last_week }}</h3>
      <h3><em class="font-weight-bold">Last month: </em> {{ last_month }}</h3>
      <h3><em class="font-weight-bold">The beginning: </em> {{ the_beginning }}</h3>
    </b-container>

    <!-- Mostrar error cuando no se conecto al backend -->
    <b-container v-show="showError">
        <b-row align-h="center"> 
            <b-alert variant="danger" show>
                Error connection!!!
            </b-alert>
        </b-row>
    </b-container>

  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
import api from "@/components/backend-api";
export default {
  name: "registeredrepo",
  components: { Admin },
  data() {
    return {
      showError:false,
      today: -1,
      last_3_days: -1,
      last_week: -1,
      last_month: -1,
      the_beginning: -1
    };
  },
  /* El mounted se ejecuta antes de que se cargue la pagina */
  mounted(){
      /* Conocer la cantidad total de repositorios registrados en el sistema */
      /* En el día de hoy */   
      api.getAnalytics(this.func_today()).then(response=>{
        this.today=response.data.data.repository_counter
      }).catch(e=>{this.showError=true});
      /* En los ultimos 3 dias */
      api.getAnalytics(this.func_last3Days()).then(response=>{
        this.last_3_days=response.data.data.repository_counter
      }).catch(e=>{this.showError=true});
      /* En la ultima semana */
      api.getAnalytics(this.func_lastWeeks()).then(response=>{
        this.last_week=response.data.data.repository_counter
      }).catch(e=>{this.showError=true});
      /* En el ultimo mes */
      api.getAnalytics(this.func_lastMonth()).then(response=>{
        this.last_month=response.data.data.repository_counter
      }).catch(e=>{this.showError=true});
      /* Desde el inicio de los tiempos */
      api.getAnalytics(this.func_theBeginning()).then(response=>{
        this.the_beginning=response.data.data.repository_counter
      }).catch(e=>{this.showError=true})     
  },
  methods:{
    /* Estas funciones devuelven un string de la fecha, para que pueda hacer analizada por el analytics */
    func_today(){
      var thisDay = new Date();
      return this.dateToString(thisDay)
    },
    func_last3Days(){ 
      var thisDay = new Date();
      thisDay.setDate(thisDay.getDate()-3);              
      return this.dateToString(thisDay)
    },
    func_lastWeeks(){ 
      var thisDay = new Date();
      thisDay.setDate(thisDay.getDate()-7);             
      return this.dateToString(thisDay)
    },
    func_lastMonth(){ 
      var thisDay = new Date();
      thisDay.setMonth(thisDay.getMonth()-1);              
      return this.dateToString(thisDay)
    },
    func_theBeginning(){ 
      var thisDay = new Date();
      thisDay.setFullYear(2000);              
      return this.dateToString(thisDay)
    },
    dateToString(date){
      var mistring= date.getFullYear().toString() +'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
      return mistring
    }
  }
};
</script>
