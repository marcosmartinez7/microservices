import axios from "axios";
export default ({ req }) => {
  if (typeof window === "undefined") {
    // Server side
    return axios.create({
      baseURL: "ticketing-nft.org/",
      headers: req.headers,
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};
