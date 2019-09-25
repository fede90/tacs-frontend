<template>
    <div class="user-data">
        <Admin/>
        <h1> User data</h1>

        <!-- TODO: se deberia definir un filtro de busqueda, como el de los repositorios -->
        <!-- Busqueda de usuario -->
        <b-container >
            <b-row align-h="center"> 
                <b-col align-self="center" cols="auto" >
                    <label>Username:</label>
                </b-col>
                <b-col align-self="center" cols="auto" >
                    <b-form-input size="sm" placeholder="Enter username" v-model="searchUsername"></b-form-input>
                </b-col>
                <b-col align-self="center" cols="auto" > 
                    <b-button variant="primary" @click="seeOneUser">Search user</b-button>
                </b-col>
                <b-col align-self="end" cols="auto" > 
                    <b-button variant="danger" @click="seeAllUser">Search all users</b-button>
                </b-col>
            </b-row>
        </b-container>

        <br>
        <br>

        <!-- Tabla todos los usuarios -->
        <b-container v-show="allUser">
            <b-row align-h="center">
                <b-col align-self="center" cols="auto" >
                    <b-table
                    :items="usersExample"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    responsive="sm"
                    ></b-table>
                </b-col>
            </b-row>

            <b-row align-h="center">
            <div>
                Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
                <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
            </div>
            </b-row>
        </b-container>

        <!-- Un solo usuario -->
        <b-container v-show="oneUser">
            <b-row align-h="center"> 
                <b-card bg-variant="light" :header="userExample.username" class="text-center">
                    <b-card-text><em class="font-weight-bold">Name: </em>{{userExample.name}}</b-card-text>
                    <b-card-text><em class="font-weight-bold">Lastname: </em>{{userExample.lastname}}</b-card-text>
                    <b-card-text><em class="font-weight-bold">Favourite list count: </em>{{userExample.favourite_size}}</b-card-text>
                    <b-card-text><em class="font-weight-bold">Repositorie count: </em>{{userExample.repositorie_size}}</b-card-text>
                    <b-card-text><em class="font-weight-bold">Last access: </em>{{userExample.last_access}}</b-card-text>
                    <b-card-text><em class="font-weight-bold">Most used language: </em>{{userExample.language}}</b-card-text>
                </b-card>
            </b-row>
        </b-container>





    </div>
</template>




<script>
    import Admin from "@/components/admin/Admin.vue";
    export default {
        name: "userdata",
        components:{ Admin },
        data() {
            return {
                sortBy: 'age',
                sortDesc: false,
                fields: [
                { key: 'username', sortable: true },
                { key: 'favourite_size', sortable: true },
                { key: 'repositorie_size', sortable: true },
                { key: 'last_access', sortable: true },
                { key: 'language', sortable: true }
                ],
                searchUsername:'',
                oneUser:false,
                allUser:false,

                /*TODO: Estos son solo ejemplos estaticos. Se deberia buscar desde el backend*/
                usersExample: [
                { username: 'Dickerson', favourite_size: 40, repositorie_size: 80, last_access: '2019-09-15', language:'C' },
                { username: 'Larsen', favourite_size: 21, repositorie_size: 46, last_access: '2019-06-07', language:'JAVA' },
                { username: 'Geneva', favourite_size: 89, repositorie_size: 160, last_access: '2019-09-25', language:'PASCAL' },
                { username: 'Jami', favourite_size: 2, repositorie_size: 4, last_access: '2018-09-15', language:'ANGULAR' },
                { username: 'Wilson', favourite_size: 10, repositorie_size: 24, last_access: '2019-09-01', language:'C++' }
                ],
                userExample: {  username: 'Dickerson', name:'Doc', 
                                lastname:'Thompson',favourite_size: 40, 
                                repositorie_size: 80, last_access: '2019-09-15', language:'C' }
            }
        },
        methods: {
            seeOneUser(){
                this.oneUser=true;
                this.allUser=false
            },
            seeAllUser(){
                this.oneUser=false;
                this.allUser=true
            }
        }      

    };
</script>
