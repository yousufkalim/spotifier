// Init
const axios = require("axios");
const { auth } = require("../utils/auth.js");

// Get Albums
exports.getAlbums = async (req, res) => {
  let access_token = (await auth()).data;

  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/search?q=a&type=album&limit=50",
    headers: {
      Authorization: `${access_token.token_type} ${access_token.access_token}`,
    },
  };
  let albums = (await axios(config)).data.albums.items;

  albums = albums.map((album) => {
    delete album.available_markets;
    delete album.artists;
    delete album.external_urls;
    delete album.href;
    delete album.release_date_precision;
    delete album.uri;
    delete album.album_type;
    delete album.type;

    return album;
  });

  res.status(200).send(albums);
};
