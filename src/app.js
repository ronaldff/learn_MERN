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

    const result = await Playlist.insertMany([javascriptData,phpData,htmlData,pythonData]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

schemaModelPlaylist();