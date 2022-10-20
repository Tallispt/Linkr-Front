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

async function newPost(body) {
  const config = createHeaders();
  const promise = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/posts`,
    body,
    config
  );
  return promise;
}

export { newPost };
