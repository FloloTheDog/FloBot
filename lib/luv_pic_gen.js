const request = require("request");
const css = () => `
img {
  width: 555px;
  height: 1080px;
}
html {
  background: #222;
}
`;
const html = (h1, h2, h3) => `
<!DOCTYPE html>
<html>
    <body style="margin:0px;">
        <img src="${h1}">
        <img src="${h3}">
        <img src="${h2}">
    </body>
</html>
`;
const dimensions = {
    x: 384,
    y: 128
}
module.exports = (param1, param2, is_luv) => {
  return new Promise((fulfill, reject) => {
    let heart = is_luv == "false" ?
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/broken-heart_1f494.png"
    : "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/heavy-black-heart_2764.png"
    request.post({
        url: "https://htmlcsstoimage.com/demo_run",
        form: {
            html: html(param1, param2, heart),
            css: css(),
            google_fonts: "Arial"
        } 
    }, function (error, response, body) {
        if (!error && response.statusCode == 200 && JSON.parse(body)) {
            let b = JSON.parse(body);
            if (b.url) {
                fulfill(b.url + ".png?width=" + dimensions.x + "&height=" + dimensions.y)
            } else {
                reject("no body");
            }
        } else {
            reject(error);
        }
    });
  });
};