<template>
  <div class="registeredrepo">
    <Admin />
    <h1>Registered Repositories</h1>

    <br />
    <br />

    <h3><em class="font-weight-bold">Today: </em> {{ today }}</h3>
    <h3><em class="font-weight-bold">Last 3 days: </em> {{ last_3_days }}</h3>
    <h3><em class="font-weight-bold">Last week: </em> {{ last_week }}</h3>
    <h3><em class="font-weight-bold">Last month: </em> {{ last_month }}</h3>
    <h3>
      <em class="font-weight-bold">The beginning: </em> {{ the_beginning }}
    </h3>
  </div>
</template>

<script>
import Admin from "@/components/admin/Admin.vue";
export default {
  name: "registeredrepo",
  components: { Admin },
  data() {
    return {
      today: 5,
      last_3_days: 30,
      last_week: 88,
      last_month: 130,
      the_beginning: 310
    };
  }
};
</script>
