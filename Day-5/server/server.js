// var mysql = require('mysql');
// var expr = require('express')
// var app = expr()

// app.use(expr.urlencoded())

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "divij@28",
//   database:'streamlite'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     sql = 'SELECT * FROM users'
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + JSON.stringify(result));
//     });
//   });
  

// app.get('/login',(req,res)=>{
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         console.log(req.query);
        
//         //Insert a record in the "customers" table:
//         var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//         con.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("1 record inserted");
//         });
//       });
// })

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '../home')));
app.use('/login', express.static(path.join(__dirname, '../login')));
app.use('/media', express.static(path.join(__dirname, '../media')));
app.use('/game-content/:id', express.static(path.join(__dirname, '../game-content')));

// MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "divij@28",
  database: 'streamlite'
});

// Connect to MySQL
con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/main.html'));
});

// Login route (form action)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
    console.log(username);

  // Query to check the user credentials
  const sql = `SELECT * FROM users WHERE username = "${username}" AND passwords = "${password}"`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
    //   res.send('Login successful!');
    // res.sendFile(path.join(__dirname, '../home/main.html'));
    res.redirect('/');
    
    
} else {
      res.send('Invalid username or password.');
    }
  });
});

app.post('/register', (req, res) => {
    const { username, password ,email } = req.body;
    console.log(username+password+email);
  
    // Query to check the user credentials
    const sql = `SELECT * FROM users WHERE username = "${username}" AND passwords = "${password}"`;
    con.query(sql, (err, result) => {
        if (err) throw err;
  
      if (result.length > 0) {
        res.redirect('/login/register.html')
        
  
      } else {
          // res.send('Invalid username or password.');
          var sql = `INSERT INTO users (username,email,passwords) VALUES ("${username}","${email}","${password}")`
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted, ID: " + result.insertId);
              res.redirect('/');
            });
    }
  });
});


app.get('/game-content/search.html/', (req, res) => {
  res.sendFile(path.join(__dirname, '../game-content/search.html'));
});
app.get('/game-content/:id', (req, res) => {
  const productId = req.params.id;

  const sql = `
    SELECT 
      games.game_name, 
      games.game_description, 
      games.image_url, 
      games.publisher,
      games.genre,
      games.release_date,
      games.developer,
      games.mature_content_description,
      game_requirements.os, 
      game_requirements.processor, 
      game_requirements.game_memory, 
      game_requirements.graphics, 
      game_requirements.game_storage 
    FROM games
    INNER JOIN game_requirements 
    ON games.gameid = game_requirements.gameid 
    WHERE games.gameid = ?`;

  con.query(sql, [productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length > 0) {
      const gameData = result[0];
      console.log(gameData);
      
      // Serve the HTML file
      res.sendFile(path.join(__dirname, '../game-content/game-content.html'));

      // Store the game data in the global variable (for the client to fetch)
      app.locals.currentGameData = gameData;
    } else {
      res.status(404).send('Game not found');
    }
  });
});

// API endpoint to send game data
app.get('/api/game-data', (req, res) => {
  if (app.locals.currentGameData) {
    console.log(app.locals.currentGameData);
    
    res.json(app.locals.currentGameData);
  } else {
    res.status(404).send('No game data available');
  }
});

// Serve search.html when the user visits /search.html


app.get('/api/search', (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the URL
  const sql = `
      SELECT * FROM games 
      WHERE game_name LIKE ? 
      OR game_description LIKE ? `;
  
  const wildcardQuery = `%${searchQuery}%`;

  con.query(sql, [wildcardQuery, wildcardQuery], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }

      res.json(results);
  });
});


// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
