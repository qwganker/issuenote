<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <q-btn-group>
          <q-btn label="保存" icon="check" @click="clickSave()" />
        </q-btn-group>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <q-input filled v-model="newIssue.title" label="标题" />
        <q-select
          multiple
          v-model="newIssue.labels"
          :options="labelOptions"
          label="标签"
        >
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop="newIssue.labels = ''"
              class="cursor-pointer"
            /> </template
        ></q-select>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-splitter v-model="splitterModel" :limits="[20, 80]">
          <template v-slot:before>
            <div class="q-pa-xs">
              <textarea v-model="newIssue.body" :rows="30" class="fit" /></div
          ></template>
          <template v-slot:after>
            <q-card style="margin: 5px">
              <q-markdown v-model:src="newIssue.body"> </q-markdown>
            </q-card>
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { issueApi } from "../api/github";

export default {
  data() {
    return {
      labelOptions: [],
      newIssue: {
        labels: [],
        title: "",
        body: "",
      },
    };
  },
  setup() {
    return { splitterModel: ref(50) };
  },
  mounted() {
    this.labelOptions = this.$store.state.label.labels.map(
      (label) => label.name
    );
  },
  methods: {
    async clickSave() {
      await issueApi.newIssue(this.newIssue).then((resp) => {});
    },
  },
};
</script>
