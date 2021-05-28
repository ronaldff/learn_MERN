const mongoose = require("mongoose");

// connection and creating database if not present
mongoose.connect("mongodb://localhost:27017/playlistChannel",{
  useNewUrlParser : true,
  useUnifiedTopology:true
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
 
getDataByComparing();