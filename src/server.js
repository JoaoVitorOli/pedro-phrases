import { launch } from "puppeteer";
import express from "express";
import { toBase64 } from "./utils/toBase64.js";

const app = express();
app.use(express.json());

app.post("/pedro", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(401).json("Faltou o texto po");
  }

  const browser = await launch({
    defaultViewport: {
      height: 400,
      width: 700,
    },
    args: [
      `--disable-gpu`,
      `--disable-setuid-sandbox`,
      `--no-sandbox`,
      `--no-zygote`,
    ],
  });
  const page = await browser.newPage();

  const html = generateHtml(text);

  await page.setContent(html);

  setTimeout(async () => {
    await page.screenshot({ path: "src/output/image.png" });

    await browser.close();

    const base64String = toBase64("src/output/image.png");

    res.json({
      image64: base64String,
      text,
    });
  }, 1000);
});

app.listen(3000, () => {
  console.log("Server listen to port 3000 👌");
});

function generateHtml(text) {
  const img = [
    "https://i.imgur.com/GJjARNm.png",
    "https://i.imgur.com/vaeonQK.png",
  ];

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>opa</title>
  
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');

        body {
          background-color: rgb(20, 20, 20);
        }
  
        .container {
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          height: 100vh;
          align-items: center;
          gap: 24px;
        }
  
        h1 {
          font-family: "Courgette", cursive;
          font-size: 24px;
          text-align: center;
          text-wrap: balance;
          color: rgb(216, 216, 216);
        }
  
        img {
          width: 100%;
          filter: grayscale(80%);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>
          "${text}"
  
          <p>
            - Welbert, Pedro
          </p>
        </h1>
  
        <img
          src=${img[Math.round(Math.random())]}
          alt=""
        />
      </div>
    </body>
  </html>
  `;

  return html;
}
