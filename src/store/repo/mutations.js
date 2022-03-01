export function setAccessToken(state, data) {
  localStorage.setItem("accessToken", data);
  state.accessToken = data;
}

export function setRepository(state, data) {
  localStorage.setItem("repository", data);
  state.repository = data;
}

export function setOwner(state, data) {
  localStorage.setItem("owner", data);
  state.owner = data;
}
