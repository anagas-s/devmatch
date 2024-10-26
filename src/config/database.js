const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(
    "mongodb+srv://anagas:devmatch@namastedev.vv0gj.mongodb.net/devMatch"
  );
}

module.exports = connect;
