import axios from "axios";

export default function getBusLocations(date) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.REACT_AUTH_KEY}`,
  };

  return axios.post('/getBuslocations',
    {
      "data": null,
      "device-session": {
        "session-id": localStorage.getItem('sessionId'),
        "device-id": localStorage.getItem('deviceId'),
      },
      "date": date,
      "language": "tr-TR"
    },
    {
      headers: headers,
    })
}