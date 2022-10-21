import axios from "axios";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  return config;
}

function getTimeline() {
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/timeline`,
    config
  );
  return promise;
}

async function newPost(body) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/posts`,
    body,
    config
  );
  return promise;
}

async function editPostDescription({ body, id }) {
  const config = createHeaders()
  return await axios.put(`
  ${process.env.REACT_APP_API_BASE_URL}/posts/${id}`,
    body,
    config)
}

async function deletePost(id) {
  const config = createHeaders()
  return await axios.delete(`
  ${process.env.REACT_APP_API_BASE_URL}/posts/${id}`,
    config)
}

export { newPost, getTimeline, editPostDescription, deletePost };
