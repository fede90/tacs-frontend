<template>
  <div class="signup">
    <h1>Probando request a backend</h1>
    <button @click="responseUser()">Request Signup</button>
    <p>La respuesta es:  {{response}}</p>
  </div>
</template>

<script>
import api from "@/components/backend-api";

export default {
  name: "Signup",
  data () {
      return {
        errors: [],
        response: {},
      }
    },

  methods: {
	  responseUser () {
	    api.signup().then(response => {
	        this.response = response.data;
	      })
	      .catch(e => {
	        this.errors.push(e)
	      })
	  }
	}
};
</script>
