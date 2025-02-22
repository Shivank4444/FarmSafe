const request = require("request");

const headers = {
  Authorization: "Bearer YOUR_API_KEY",
};

const url = "https://api.edenai.run/v2/text/ai_detection";

function detectAIContent(text) {
  const payload = {
    providers: "originalityai",
    text: text,
    fallback_providers: "",
  };

  const options = {
    url: url,
    method: "POST",
    headers: headers,
    json: payload,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const aiScore = body.originalityai.items[0].ai_score;
        resolve(aiScore > 0.6);
      }
    });
  });
}

const textToAnalyze = input("Enter the text: ");

detectAIContent(textToAnalyze)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
