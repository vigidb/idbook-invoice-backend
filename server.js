const app = require("./app");
const constants = require("./config/constants");

const PORT = constants.PORT;

app.listen(PORT, () => {
  const HOST = constants.HOST
  const PROTOCOL = constants.PROTOCOL
  console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`);
});
