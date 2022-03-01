import { axiosReq } from "boot/axios";

const userApi = {
  async getProfile() {
    return await axiosReq.get("/user");
  },
};

const repo = () => {
  return localStorage.getItem("repository");
};
const owner = () => {
  return localStorage.getItem("owner");
};

const issueApi = {
  async listIssuesByLabel(label) {
    let url = "/repos/" + owner() + "/" + repo() + "/issues?labels=" + label;
    return await axiosReq.get(url);
  },
  async listIssuess() {
    let url = "/repos/" + owner() + "/" + repo() + "/issues";
    return await axiosReq.get(url);
  },
  async updateIssue(issue) {
    let url = "/repos/" + owner() + "/" + repo() + "/issues/" + issue.number;
    return await axiosReq.patch(url, {
      issue_number: issue.number,
      body: issue.body,
      title: issue.title,
    });
  },
  async newIssue(issue) {
    let url = "/repos/" + owner() + "/" + repo() + "/issues";
    return await axiosReq.post(url, {
      labels: issue.labels,
      body: issue.body,
      title: issue.title,
    });
  },
};

const labelApi = {
  async listLabels() {
    let url = "/repos/" + owner() + "/" + repo() + "/labels";
    return await axiosReq.get(url);
  },
  async deleteLabel(name) {
    let url = "/repos/" + owner() + "/" + repo() + "/labels/" + name;
    return await axiosReq.delete(url);
  },
  async addLabel(label) {
    let url = "/repos/" + owner() + "/" + repo() + "/labels";
    return await axiosReq.post(url, {
      name: label.name,
      description: label.description,
    });
  },
};

export { userApi, labelApi, issueApi };
