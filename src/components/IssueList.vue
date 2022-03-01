<template>
  <div>
    <q-list>
      <template v-for="(issue, index) in issues" :key="index">
        <q-item clickable v-ripple @click="onClickIssue(issue)">
          <q-item-section>
            <q-item-label>{{ issue.title }}</q-item-label>
          </q-item-section>
          <!-- <q-item-section avatar
            ><q-btn size="12px" flat dense round icon="delete"
          /></q-item-section> -->
        </q-item>
        <q-separator />
      </template>
      <q-inner-loading color="teal" :showing="loading"> </q-inner-loading>
      <template v-if="issues.length == 0">
        <q-item> <q-item-section> 无数据</q-item-section> </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "IssueList",
  props: ["issues", "loading"],
  setup(props, { emit }) {
    const onClickIssue = (issue) => {
      emit("onClickIssue", issue);
    };
    return {
      onClickIssue,
    };
  },
};
</script>
