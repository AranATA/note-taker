const fs = require("fs")
// 'uuid' npm package for unique id:
const { v4: uuidv4 } = require('uuid');


// LOAD DATA
// how to read json file? simplest way is to require it:

// const savedNotesData = require("../db/db.json");

// require will only read it once, it will return the cached data from the first time if the file will be read another time so it is not good if the file has changed. We need fs.readFile for such changing files. We still need to convert the JSON string into an object by JSON.parse.

// ROUTING

module.exports = (app) => {

  // API GET Request_________________________

  app.get("/api/notes", (req, res) => {
      
      // Read 'db.json' file 
      let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
         
      // Send the read data as "objects" in response to the 'GET' request
      res.json(savedNotes);
  });


  // API POST Request____________________________
  app.post("/api/notes", (req, res) => {

      // Extracts new note from request body.  
      let newNotes = req.body;
      
      // Assigns unique id 
      newNotes.id = uuidv4();

      // Reads data from 'db.json' file
      let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  
      // Adds new notes to existing notes in 'db.json'
      notesData.push(newNotes);

      // Writes notes data to 'db.json' file
      fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
      
      // Send response
      res.json(notesData);
  });


  // API DELETE request
  app.delete("/api/notes/:id", (req, res) => {

      let noteId = req.params.id;

      // Read data from 'db.json' file
      let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

      // filter data to get notes except the one to delete
      let newSet = notesData.filter( note => note.id !== noteId );

      // Write new data to 'db.json' file
      fs.writeFileSync('./db/db.json', JSON.stringify(newSet));

      // Send response
      res.json(newSet);
  });
};
