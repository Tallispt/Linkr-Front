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
  const promise = await axios.post(`http://localhost:5000/posts`, body, config);
  return promise;
}

export { newPost };
