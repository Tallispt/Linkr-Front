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
  const promise = await axios.post(`http://localhost:5000/posts`, body, config);
  return promise;
}

export { newPost, getTimeline };
