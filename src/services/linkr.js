import axios from "axios";

function getTimeline() {
  const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline`);
  return promise;
}

export { getTimeline };
