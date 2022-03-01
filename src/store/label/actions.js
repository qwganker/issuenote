import { labelApi } from "../../api/github";

export async function addLabelAndRefresh(store, newLabel) {
  const { commit, dispatch, state, rootState } = store;
  await labelApi.addLabel(newLabel).then((resp) => {
    labelApi.listLabels().then((resp) => {
      commit("setLabels", resp.data);
    });
  });
}

export async function deleteLabelAndRefresh(store, labelName) {
  const { commit, dispatch, state, rootState } = store;
  await labelApi.deleteLabel(labelName).then((resp) => {
    labelApi.listLabels().then((resp) => {
      commit("setLabels", resp.data);
    });
  });
}

export async function reloadRepoLabels(store) {
  const { commit, dispatch, state, rootState } = store;

  await labelApi.listLabels().then((resp) => {
    commit("setLabels", resp.data);
  });
}
