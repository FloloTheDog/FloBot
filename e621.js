const axios = require("axios");
const getYiff = function(sfw = false, tags = "") {
  return new Promise(function(fulfill, reject) {
    axios.get(`https://e621.net/posts.json`, {
      headers: {
        "user-agent": "flobot using yiff/1.3.0 (ry / codepupper)"
      },
      params: {
        limit: "1000",
        tags: sfw ? "rating:safe" : "rating:explicit " + tags.join(" ")
      }
    })
    .catch(error => {
      reject(error.response);
    })
    .then(response => {
      let posts = response.data.posts;
      let rnd = (Math.floor(Math.random() * posts.length) + 1) - 1;
      let post = posts[rnd];
      if (!post) {
        reject("API Error");
      }
      fulfill({
        file: post.file.url,
        score: post.score.total,
        size: post.file.size
      });
    });
  });
}
module.exports = getYiff;