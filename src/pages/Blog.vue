<template>
  <div>
    <q-splitter v-model="splitterModel" :limits="[20, 30]">
      <template v-slot:before>
        <div>
          <issue-list
            :issues="issues"
            :loading="loading"
            @onClickIssue="clickIssue"
          ></issue-list>
        </div>
      </template>

      <template v-slot:after>
        <q-card>
          <q-card-section>
            <q-btn-group>
              <q-btn label="保存" icon="check" @click="clickUpdate(onIssue)" />
            </q-btn-group>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <q-input filled v-model="onIssue.title" label="标题" />
            <div class="q-gutter-sm" style="padding-top: 5px">
              <template v-for="(label, index) in onIssue.labels" :key="index">
                <q-badge rounded outline color="primary" :label="label.name" />
              </template>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-splitter v-model="splitterModel2" :limits="[20, 80]">
              <template v-slot:before>
                <div class="q-pa-xs">
                  <textarea
                    v-model="onIssue.body"
                    :rows="30"
                    class="fit"
                  /></div
              ></template>
              <template v-slot:after>
                <q-card flat bordered style="margin: 5px; padding: 5px 10px">
                  <q-markdown v-model:src="onIssue.body"> </q-markdown>
                </q-card>
              </template>
            </q-splitter>
          </q-card-section>
        </q-card>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import IssueList from "../components/IssueList.vue";
import { issueApi } from "../api/github";
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
export default {
  components: {
    IssueList,
    QMarkdown,
  },
  data() {
    return {
      issues: [],
      loading: true,
      onIssue: {
        labels: [],
        title: "",
        body: "",
      },
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.onIssue = {
          labels: [],
          title: "",
          body: "",
        };
        this.getIssues();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  setup() {
    return { splitterModel: ref(20), splitterModel2: ref(50) };
  },
  methods: {
    clickIssue: function (issue) {
      this.onIssue = issue;
    },
    async getIssues() {
      if (this.$route.params.label == undefined) {
        return;
      }

      this.loading = true;
      this.issues = [];
      let label = this.$route.params.label;
      let response = null;
      if (label == "all") {
        response = await this.__getAllIssues();
      } else {
        response = await this.__getIssuesByLabel(label);
      }

      this.issues = response.data;
      this.loading = false;
    },
    async __getAllIssues() {
      return await issueApi.listIssuess();
    },
    async __getIssuesByLabel(label) {
      return await issueApi.listIssuesByLabel(label);
    },
    async clickUpdate(issue) {
      await issueApi.updateIssue(issue).then((resp) => {});
    },
  },
};
</script>
