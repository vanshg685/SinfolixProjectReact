const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood:02112002@cluster0.zffrknk.mongodb.net/Cluster0?retryWrites=true&w=majority";
const mongoDB = async() => {
   mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("Connected");
      const fetched_data = await mongoose.connection.db.collection("food_iteams");
      fetched_data.find({}).toArray( async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("food_categories");
        foodCategory.find({}).toArray( async function (err, catData) {
            if (err) console.log(err);
            else{
              global.food_items= data;
              global.foodCategory= catData;
            }
      })
        // if (err)
        //   console.log(err);
        // else{
        //   global.food_items= data;
        //   console.log(global.food_items);
        // }
        
      });

    }
  });
};
module.exports = mongoDB;
