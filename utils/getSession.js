import axios from "axios";

export default function getSession() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.REACT_AUTH_KEY}`,
  };

  return axios.post('/getSession',
    {
      "type": 1,
      "connection": {
        "ip-address": "165.114.41.21", "port": "5117"
      },
      "browser": {
        "name": "Chrome", "version": "47.0.0.12"
      }
    },
    {
      headers: headers,
    })
}