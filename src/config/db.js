const mongoose = require("mongoose");
export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose
      .connect(
        "mongodb://upojuskxjvx0ypll7cfb:B6WPK7tHoG0XWnEar0Az@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bv37vevbbusapud?replicaSet=rs0"
      )
      .then(() => console.log("Connect To Database Successfully."));
  } catch (err) {
    console.log("Database Connected Error:", err);
  }
}
