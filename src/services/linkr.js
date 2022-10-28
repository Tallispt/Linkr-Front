import axios from "axios";

function handleTextAreaHeight(event, height = "39px") {
  event.target.style.height = height;
  const addHeight = event.target.scrollHeight;
  event.target.style.height = `${addHeight}px`;
}

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  return config;
}

function getHashtagsPosts(hashtag,cut) {
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/hashtag/${hashtag}?cut=${cut}`,
    config
  );
  return promise;
}

async function getTimeline(cut) {
  const config = createHeaders();
  const promise = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/timeline?cut=${cut}`,
    config
  );
  return promise;
}
function getTrends() {
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/trends`,
    config
  );
  return promise;
}
async function getUsersBySearch(params) {
  const config = createHeaders();
  const promise = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/search/${params}`,
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
  const config = createHeaders();
  return await axios.put(
    `
  ${process.env.REACT_APP_API_BASE_URL}/posts/${id}`,
    body,
    config
  );
}

async function deletePost(id) {
  const config = createHeaders();
  return await axios.delete(
    `
  ${process.env.REACT_APP_API_BASE_URL}/posts/${id}`,
    config
  );
}

function getUserPosts(id,cut) {
  const config = createHeaders();
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/user/${id}?cut=${cut}`,
    config
  );
  return promise;
}

async function signIn(login) {
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/signin`,
    login
  );
  return promise;
}

async function likePost(body) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/posts/like`,
    body,
    config
  );
  return promise;
}
async function dislikePost(body) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/posts/dislike`,
    body,
    config
  );
  return promise;
}

async function signUp(data) {
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/signup`,
    data
  );
  return promise;
}

async function commentOnPost({ body, id }) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/comment/${id}`,
    body,
    config
  );
  return promise;
}

async function follow(data) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/follow`,
    data,
    config
  );

  return promise;
}

async function unfollow(data) {
  const config = createHeaders();
  const promise = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/unfollow`,
    data,
    config
  );

  return promise;
}

async function verifyFollowers() {
  const config = createHeaders();
  const promise = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/verifyFollowers`,
    config
  );

  return promise;
}

async function getFollowers() {
  const config = createHeaders();
  const promise = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/followers/user`,
    config
  );
  return promise;
}

export {
  handleTextAreaHeight,
  newPost,
  getTimeline,
  getUsersBySearch,
  getUserPosts,
  signIn,
  likePost,
  getTrends,
  getHashtagsPosts,
  dislikePost,
  editPostDescription,
  deletePost,
  signUp,
  commentOnPost,
  follow,
  unfollow,
  verifyFollowers,
  getFollowers
}
