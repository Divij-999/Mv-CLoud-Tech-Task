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
var cp = require('cookie-parser')
const app = express();
app.use(cp())

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '../home')));
app.use('/login', express.static(path.join(__dirname, '../login')));
app.use('/media', express.static(path.join(__dirname, '../media')));
app.use('/game-content/:id', express.static(path.join(__dirname, '../game-content')));
app.use('/add-to-cart', express.static(path.join(__dirname, '../add-to-cart')));
app.use('/account', express.static(path.join(__dirname, '../account')));
app.use('/payment', express.static(path.join(__dirname, '../payment')));

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
    console.log(result[0].userid);
    
    res.cookie('userid',result[0].userid)
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


app.post('/changeData', (req, res) => {
  const { firstName , lastName ,email } = req.body;
  // console.log(username+password+email);

  // Query to check the user credentials
  const sql = `
  UPDATE users
    SET 
        email = '${email}',
        firstname = '${firstName}',
        lastname = '${lastName}'
    WHERE 
    userid = ${req.cookies.userid}`;
    con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
  }

  res.status(200).send('Insert Successfull')
  // res.redirect('../account/changeData.html')

});
});

app.post('/payment', (req, res) => {
  // console.log(username+password+email);

  // Query to check the user credentials
  const sql = `
        INSERT INTO payment(userid , gameid)
        VALUES (${req.cookies.userid},${req.cookies.gameid}) `;
    con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
  }

  // res.status(200).send('Purchase Successfull')
  res.clearCookie("gameid");
  res.redirect('../add-to-cart/cart.html')

});
});




app.get('/api/user_data/',(req,res)=>{

  const sql = `SELECT * FROM users WHERE userid=${req.cookies.userid}`;
  con.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
    console.log(result);
    
    res.json(result);
    }
  })

})

app.get('/game-content/search.html/', (req, res) => {
  res.sendFile(path.join(__dirname, '../game-content/search.html'));
});


app.get('/add-to-cart/cart.html/', (req, res) => {
  res.sendFile(path.join(__dirname, '../add-to-cart/cart.html'));
});


app.get('/account/account.html/', (req, res) => {
  res.sendFile(path.join(__dirname, '../account/account.html'));
});


app.get('/account/changeData.html/', (req, res) => {
  res.sendFile(path.join(__dirname, '../account/changeData.html'));
});

app.get('/payment/payment.html/', (req, res) => {
  const addQuery = req.query.q; // Get the search query from the URL
  console.log(addQuery);
  res.send(addQuery)
  // res.sendFile(path.join(__dirname, '../payment/payment.html'));
});

app.get('/api/addCart',(req,res)=>{
  const addQuery = req.query.q; // Get the search query from the URL
  const sql1 = `SELECT * from game_cart WHERE userid = ${req.cookies.userid} and gameid = ${addQuery}`
  // console.log(req.cookies.userid+" "+addQuery);
  
  con.query(sql1,(err1,result1)=>{
    // console.log(sql1);
    
      if (err1) {
        console.error(err1);
        return res.status(500).send('Internal Server Error');
      }

      if(result1.length > 0){
        return res.status(409).send('Data already exists')
      }
      else{
        // console.log(result1);
        
        const sql = `
        INSERT INTO game_cart(userid , gameid , purchaseStatus )
        VALUES (${req.cookies.userid},${addQuery} , false) `;
        
        // const wildcardQuery = addQuery;
      
        con.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
      
            res.status(200).send('Insert Successfull');
        });
      }
  })
  
})


app.get('/game-content/:id', (req, res) => {
  const productId = req.params.id;

  const sql = `
    SELECT 
      games.gameid,
      games.game_name, 
      games.game_description, 
      games.image_url,
      games.publisher,
      games.genre,
      games.release_date,
      games.price,
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
      
      res.sendFile(path.join(__dirname, '../game-content/game-content.html'));

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


app.get('/api/searchAll', (req, res) => {
  // const searchQuery = req.query.q; // Get the search query from the URL
  const sql = `
      SELECT * FROM games `;
  
  // const wildcardQuery = `%${searchQuery}%`;

  con.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }

      res.json(results);
  });
});



app.get('/api/searchCart',(req,res)=>{
  const cartQuery = req.query.q 
  console.log('Server : '+cartQuery);
  
  const sql = `
      SELECT
      game_cart.cartid,
      games.game_name, 
      games.image_url,
      games.price,
      games.developer
      FROM game_cart
      INNER JOIN games 
      ON games.gameid = game_cart.gameid
      WHERE games.game_name LIKE ? 
      OR games.developer LIKE ? `

      const wildcardQuery = `%${cartQuery}%`;

  con.query(sql, [wildcardQuery, wildcardQuery], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }

      res.json(results);
  });
})


app.get('/api/search', (req, res) => {
  const searchQuery = req.query.q.split(','); // Get the search query from the URL
  console.log(searchQuery);
  console.log(searchQuery in ['RPG','Sci-fi','Sandbox','Survival','Action','Adventure','Shooter','Social','Party','Competative','Multiplayer','Strategy','Sports','Platformer','Puzzele','Simulation','Card Game']);
  
  
  if(!searchQuery.every(item =>['RPG','Sci-fi','Sandbox','Survival','Action','Adventure','Shooter','Social','Party','Competative','Multiplayer','Strategy','Sports','Platformer','Puzzele','Simulation','Card Game'].includes(item) )){
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
  }
  else{
    // const sql = `
    //     SELECT * FROM games 
    //     WHERE genre IN ? `;
    console.log('Hereeeee');

    const placeholders = searchQuery.map(() => 'FIND_IN_SET(?, genre) > 0').join(' OR ');
    
    console.log(placeholders);
    
    const sql = `SELECT * FROM games WHERE ${placeholders}`;
        
    const wildcardQuery = searchQuery;

    con.query(sql, wildcardQuery, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        res.json(results);
    });
  }
});

app.get('/api/search_newReleases',(req,res)=>{
  const sql = `
  SELECT
  * from games 
  ORDER BY release_date ASC
  LIMIT 9`

  const wildcardQuery = `${req.cookies.userid}`;

con.query(sql, [wildcardQuery], (err, results) => {
  if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
  }
  console.log(results);
  
  res.json(results);
})
})

app.get('/api/game-cart-data', (req, res) => {
  // if (req.cookies.userid) {
  //   console.log(req.cookies.userid);
    
  //   res.json();
  // } else {
  //   res.status(404).send('No game data available');
  // }
  const sql = `
      SELECT
      game_cart.cartid,
      games.game_name, 
      games.image_url,
      games.price,
      games.developer,
      games.gameid
      FROM game_cart
      INNER JOIN games 
      ON games.gameid = game_cart.gameid
      INNER JOIN users 
      ON game_cart.userid = users.userid
      WHERE game_cart.userid = ?`

      const wildcardQuery = `${req.cookies.userid}`;

  con.query(sql, [wildcardQuery], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }
      console.log(results);
      
      res.json(results);
  })
});


// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
