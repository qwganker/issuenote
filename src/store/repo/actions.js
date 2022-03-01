export function getOwner(store) {
  const { commit, dispatch, state, rootState } = store;

  if (state.owner == "") {
    commit("setOwner", localStorage.getItem("owner"));
  }
  return state.owner;
}

export function getRepository(store) {
  const { commit, dispatch, state, rootState } = store;

  if (state.repository == "") {
    commit("setRepository", localStorage.getItem("repository"));
  }
  return state.repository;
}

export function geAccessToken(store) {
  const { commit, dispatch, state, rootState } = store;

  if (state.accessToken == "") {
    commit("setAccessToken", localStorage.getItem("accessToken"));
  }
  return state.accessToken;
}

export function init(store) {
  const { commit } = store;
  commit("setAccessToken", localStorage.getItem("accessToken"));
  commit("setRepository", localStorage.getItem("repository"));
  commit("setOwner", localStorage.getItem("owner"));
}
