const mongoose = require("mongoose");



// connection and creating database if not present
mongoose.connect("mongodb://localhost:27017/playlistChannel",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("connection successfully"))
.catch(err => console.log(err));



// define schema
const playlistSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  ctype : String,
  videos : Number,
  active : Boolean,
  author : String,
  created : {
    type : Date,
    default : Date.now
  }
});

// collection create
const Playlist = mongoose.model("Playlist",playlistSchema);

const schemaModelPlaylist = async () => {
  try {

    const javascriptData = new Playlist({
      name : "Javascript",
      ctype : "Front End",
      videos : 150,
      active : true,
      author : "Thapa Technical"
    });

    const phpData = new Playlist({
      name : "PHP",
      ctype : "Back End",
      videos : 250,
      active : true,
      author : "piyush Shyam"
    });

    const htmlData = new Playlist({
      name : "HTML",
      ctype : "Front End",
      videos : 10,
      active : false,
      author : "Rohit ghodeshwar"
    });

    const pythonData = new Playlist({
      name : "Python",
      ctype : "Backend End",
      videos : 5,
      active : true,
      author : "Thapa Technical"
    });

    // For sing document insert
    // const result = await javascriptData.save();

    // For multiple document insert
    const result = await Playlist.insertMany([javascriptData,phpData,htmlData,pythonData]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// schemaModelPlaylist();

// Read data means get document

const getDocument = async () => {
  try {
    const result = await Playlist.find({ctype : "Back End"}).select({name:1, _id:0}).limit(1);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
 
}

// getDocument();

// read data using comparison operators
const getDataByComparing = async () => {
  try{

    // $eq => Matches values that are equal to a specified value.
    // const result = await Playlist.find({active : {$eq : false}});

    // $gt => Matches values that are greater than a specified value.
    // const result = await Playlist.find({videos : {$gt : 150}});

    // $gte => Matches values that are greater than or equal to a specified value.
    // const result = await Playlist.find({videos : {$gte : 150}});

    // $in => Matches any of the values specified in an array.
    // const result = await Playlist.find({ctype : {$in : ["Back End", "Database"]}});

    // $nin => Matches none of the values specified in an array.
    // const result = await Playlist.find({ctype : {$nin : ["Back End", "Database"]}});

    // $ne => Matches all values that are not equal to a specified value.
    // const result = await Playlist.find({videos : {$ne : 5}});

    // $lt => Matches values that are less than a specified value.
    // const result = await Playlist.find({videos : {$lt : 10}});

    // $lte => Matches values that are less than or equal to a specified value.
    const result = await Playlist.find({videos : {$lte : 10}}, {name:1,_id:0,videos:1});
    console.log(result);
  } catch(err) {

    console.log(`Error : ${err}`);
  }
  
}
 
// getDataByComparing();


// read data using Logical Operators

const getDataUsinglogicalOperators = async () => {
  try{

    // or operators
    // const result = await Playlist.find({$or : [ {ctype : "Back End"}, {active : false} ]});

    // and operators
    // const result = await Playlist.find({$and : [ {ctype : "Back End"}, {active : false} ]});

    // not operators
    // const result = await Playlist.find({videos : { $not : {$lte : 20}}}).select({name:1,videos:1,_id:0});

    // nor operators
    const result = await Playlist.find({$nor : [{videos : 20}, {ctype : "Back End"}]}).select({name:1,videos:1,_id:0});


    console.log(result);

  } catch(err) {
    console.log(`Error : ${err}`);
  }
}

// getDataUsinglogicalOperators();


// Sorting and Counting Query Mongodb
const getDataSortingAndCounting = async () => {

  try {

    // Count Query
    // const result = await Playlist.find({ctype : "Front End"}).countDocuments();

    // Sorting Query Asc
    // const result = await Playlist.find({ctype : "Front End"}).sort({name : 1});

    // Sorting Query Desc
    // const result = await Playlist.find({ctype : "Front End"}).sort({name : -1});

    const results = await Playlist.aggregate([
      {
        $group:
        {
          _id: {name : "$name"},
          minPrice: { $min: "$videos" }
        }
      }
    ]);

    console.log(results);

    // var newData = [];
    // results.forEach(value => newData.push(value.minPrice));

    // console.log(newData);

    //   let basketballPlayers = results.filter(function (result) {
    //     return result.minPrice > 40 ;
    // }).map(function (result) {
    //     return result.minPrice;
    // })

    // console.log(basketballPlayers);

  } catch (err) {
    console.log(`Error : ${err}`);
  }
}

// getDataSortingAndCounting();

// Update documents
const updateDocuments = async (_id) => {
  try{

    const result = await Playlist.updateOne({_id}, {
      $set : {
        videos : 80,
        name : "React",
        ctype : "Front End"
      }
    },{new : true, useFindAndModify : false});

    console.log(result);

  } catch(err) {
    console.log(`Error : ${err}`);
  }

}
// updateDocuments("60b0901b1a8a9e2d4c7f7a16");


// Delete Document
const deleteDocument = async (_id) => {

  try{
    const result = await Playlist.findByIdAndDelete({_id});

    console.log(result);
  } catch(err) {
    console.log(`Error : ${err}`);
  }

  

}
// deleteDocument("60b0901b1a8a9e2d4c7f7a15");


// Mongoose Built-In Validations

// const BuiltInValidationSchema = mongoose.Schema({
//   name : {
//     type : String,
//     required : true,
//     unique : true,
//     lowercase : true,
//     trim : true,
//     minlength : [2, "minimum 2 letters"],
//     maxlength : 30
//   },
//   ctype : {
//     type : String,
//     required : true,
//     lowercase : true,
//     enum : ["frontend", "backend", "database"]
//   },
//   videos : Number,
//   author : String,
//   active : Boolean,
//   date : {
//     type : Date,
//     default : Date.now
//   }
// });

