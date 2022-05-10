import axios from "axios";

export default function getJourneys(origin, destination, startDate) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.REACT_AUTH_KEY}`,
  };

  return axios.post('/getJourneys',
    {
      "device-session": {
        "session-id": localStorage.getItem('sessionId'),
        "device-id": localStorage.getItem('deviceId'),
      },
      "date": "2021-09-01",
      "language": "tr-TR",
      "data": {
        "origin-id": origin,
        "destination-id": destination,
        "departure-date": startDate
      }
    },
    {
      headers: headers,
    })
}