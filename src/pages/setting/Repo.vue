<template>
  <div class="q-pa-md">
    <q-card style="min-width: 400px">
      <q-card-actions align="left">
        <q-btn icon="check" label="保存" @click="save()" />
      </q-card-actions>
      <q-card-section>
        <q-input dense v-model="owner" label="Owner" />
        <q-input dense v-model="accessToken" label="Personal access token" />
        <q-input dense v-model="repository" label="Repository" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      owner: "",
      accessToken: "",
      repository: "",
    };
  },

  mounted() {
    this.$store.dispatch("repo/getOwner").then((res) => {
      this.owner = res;
    });
    this.accessToken = this.$store
      .dispatch("repo/geAccessToken")
      .then((res) => (this.accessToken = res));
    this.repository = this.$store.dispatch("repo/getRepository").then((res) => {
      this.repository = res;
    });
  },
  methods: {
    save() {
      this.$store.commit("repo/setOwner", this.owner);
      this.$store.commit("repo/setAccessToken", this.accessToken);
      this.$store.commit("repo/setRepository", this.repository);

      this.$store.dispatch("label/reloadRepoLabels");
    },
  },
};
</script>
