<template>
  <div class="q-pa-md">
    <q-table
      title="标签列表"
      :rows="labels"
      :columns="columns"
      row-key="id"
      hide-pagination
      no-data-label="没有标签"
    >
      <template v-slot:top>
        <q-btn-group>
          <q-btn icon="add" @click="clickAdd()">新增</q-btn>
          <q-btn icon="refresh" @click="clickRefresh()">刷新</q-btn>
        </q-btn-group>
      </template>
      <template v-slot:body-cell-operator="props">
        <q-td :props="props">
          <div>
            <!-- <q-btn dense icon="edit" flat @click="clickEdit(props.row)"></q-btn> -->
            <q-btn
              dense
              icon="delete"
              flat
              color="red"
              @click="clickDelete(props.row)"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showDeleteDlg" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-md">确定删除 ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat icon="close" dense color="primary" v-close-popup
            >取消</q-btn
          >
          <q-btn flat icon="check" dense color="primary" @click="sumbitDelete()"
            >删除</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showAddDlg" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">新增标签</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newLabel.name" label="名字" />
          <q-input dense v-model="newLabel.description" label="描述" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" @click="sumbitAddLabel()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const columns = [
  {
    name: "index",
    label: "Id",
    field: "id",
    align: "left",
  },
  {
    name: "name",
    required: true,
    label: "名字",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "description",
    align: "cendescriptionter",
    label: "描述",
    field: "description",
    sortable: true,
    align: "left",
  },
  {
    name: "operator",
    label: "操作",
    field: "operator",
    align: "left",
  },
];

export default {
  setup() {
    return {
      columns,
    };
  },

  data() {
    return {
      showDeleteDlg: false,
      showAddDlg: false,
      tmpDeleteIssue: {
        name: "",
      },
      newLabel: {
        name: "",
        description: "",
      },
    };
  },

  mounted() {},
  computed: {
    labels: function () {
      return this.$store.state.label.labels;
    },
  },
  methods: {
    clickDelete(e) {
      this.showDeleteDlg = true;
      this.tmpDeleteIssue = e;
    },
    // clickEdit(e) {},
    async sumbitDelete() {
      await this.$store.dispatch(
        "label/deleteLabelAndRefresh",
        this.tmpDeleteIssue.name
      );
      this.showDeleteDlg = false;
    },
    async clickRefresh() {
      await this.$store.dispatch("label/reloadRepoLabels");
    },
    clickAdd() {
      this.newLabel.name = "";
      this.newLabel.description = "";
      this.showAddDlg = true;
    },
    async sumbitAddLabel() {
      await this.$store.dispatch("label/addLabelAndRefresh", this.newLabel);
      this.showAddDlg = false;
    },
  },
};
</script>
