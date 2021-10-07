// Init
const axios = require("axios");
var qs = require("qs");

// Auth
exports.auth = async () => {
  var data = qs.stringify({
    grant_type: "client_credentials",
  });
  const my_clientID = "6d5a509b60f64835bae27c6b989fe914";
  const clientSecret = "21fafc5339d4447bb454240ea693b371";
  var config = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: my_clientID,
      password: clientSecret,
    },
    data: data,
  };

  // Done
  return axios(config);
};
