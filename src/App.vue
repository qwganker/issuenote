<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { userApi } from "./api/github";

export default defineComponent({
  name: "App",

  async created() {
    await userApi.getProfile().then((resp) => {
      this.$store.commit("user/saveUserProfile", resp.data);
    });
    this.$store.dispatch("repo/init");
    await this.$store.dispatch("label/reloadRepoLabels");
  },
});
</script>
