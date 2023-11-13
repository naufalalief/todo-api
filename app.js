const express = require("express");
const app = express();
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
let swaggerDocument;

const port = process.env.PORT || 3000;
const rootRoute = require("./routes/");

app.use(
  cors({
    origin: "https://todos-apppal.netlify.app",
  })
);

try {
  const file = fs.readFileSync("./api/documentations.yml", "utf8");
  swaggerDocument = YAML.parse(file);
} catch (e) {
  console.log(e);
}

if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Todo Sequelize Server</h1>
    <a href="/api-docs">Check Documentations</a>
  `);
});
app.use(rootRoute);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
