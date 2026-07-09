require("dotenv").config();

const app = require("./temp");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port - http://localhost:${PORT}`);
});