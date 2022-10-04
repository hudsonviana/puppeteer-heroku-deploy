const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.set("port", process.env.PORT || 3000);

const browserP = puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

app.get("/", (req, res) => {
  // FIXME move to a worker task; see https://devcenter.heroku.com/articles/node-redis-workers
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.setContent(`<p>Hudson Andrade - web running at ${Date()}</p>`); //teste
    res.send(await page.content());
  })()
    .catch(err => res.sendStatus(500))
    .finally(() => page.close())
  ;
});

app.get("/teste", (req, res) => {
    let page;
    (async () => {
      page = await (await browserP).newPage();
      await page.setContent(`
      <h1>Teste</h1>  
      <p>outro teste</p>
      `); //teste
      res.send(await page.content());
    })()
      .catch(err => res.sendStatus(500))
      .finally(() => page.close())
    ;
  });

app.listen(app.get("port"), () => 
  console.log("app running on port", app.get("port"))
);
