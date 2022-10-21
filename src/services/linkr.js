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
function getTrends()
{
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/trends`,
    config
  );
  return promise;
}

async function getUsersBySearch(params) {
  const promise = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/search/${params}`
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

function getUserPosts(id) {
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/user/${id}`,
    config
  );
  return promise;
}

export { newPost, getTimeline, getUsersBySearch, getUserPosts, getTrends };
