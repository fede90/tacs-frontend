<template>
    <div class="repofav">
        <Admin/>
        <h1>Favorite repositories</h1>

        <!-- Busqueda de repositorio -->
        <b-container >
            <b-row align-h="center"> 
                <b-col align-self="center" cols="auto" >
                    <label>Repository name:</label>
                </b-col>
                <b-col align-self="center" cols="auto" >
                    <b-form-input size="sm" placeholder="Repository name" v-model="repository"></b-form-input>
                </b-col>
                <b-col align-self="center" cols="auto" > 
                    <b-button variant="primary" @click="searchRepository">Search repository</b-button>
                </b-col>
            </b-row>
        </b-container>

        <br>
        <br>

        <!-- Mostrar resultado -->
        <div v-show="viewResult">
            <h3>{{repository}}</h3>
            <h6>{{sizeUser}} usuarios tienen este repositorio</h6>
        </div>

    </div>
</template>




<script>
    import Admin from "@/components/admin/Admin.vue";
    export default {
        name: "repofav",
        components:{ Admin },
        data(){
            return{
                repository:'',
                viewResult:false,
                sizeUser:15  /* resultado de la cantidad de usuarios que tienen ese repositorio */
            }
        },
        methods:{
            searchRepository(){
                this.viewResult=true
            }
        }
    };
</script>
