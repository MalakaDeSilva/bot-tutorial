const fetch = require("node-fetch");

const ENDPOINT = "https://hpb.health.gov.lk/api/get-current-statistical";

function getUpdates() {
  let updates = fetch(ENDPOINT, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((jsonRes) => {
      return jsonRes;
    })
    .catch((err) => console.log(err));

  return updates;
}

module.exports = {
  getUpdates,
};
