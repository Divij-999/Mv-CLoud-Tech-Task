const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client
const path = require('path');
const cp = require('cookie-parser');

const app = express();
app.use(cp());

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '../home')));
app.use('/login', express.static(path.join(__dirname, '../login')));
app.use('/media', express.static(path.join(__dirname, '../media')));
app.use('/game-content/:id', express.static(path.join(__dirname, '../game-content')));
app.use('/add-to-cart', express.static(path.join(__dirname, '../add-to-cart')));
app.use('/account', express.static(path.join(__dirname, '../account')));
app.use('/payment', express.static(path.join(__dirname, '../payment')));

// Database connection
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',     // e.g., 'localhost' or the database host
  database: 'streamlite', // Replace with your database name
  password: 'divij28', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Connect to MySQL
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgreSQL!');
  }
  release(); // Release the client back to the pool
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/main.html'));
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  try {
    // Parameterized query to check user credentials
    const sql = 'SELECT * FROM users WHERE username = $1 AND passwords = $2';
    const result = await pool.query(sql, [username, password]);

    if (result.rows.length > 0) {
      console.log(result.rows[0].userid);
      res.cookie('userid', result.rows[0].userid); // Set cookie with user ID
      res.redirect('/'); // Redirect to the home page
    } else {
      res.send('Invalid username or password.');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal server error.');
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  console.log(`${username} ${password} ${email}`);

  try {
    // Check if the user already exists
    const checkSql = 'SELECT * FROM users WHERE username = $1';
    const checkResult = await pool.query(checkSql, [username]);

    if (checkResult.rows.length > 0) {
      res.redirect('/login/register.html'); // User exists, redirect to registration page
    } else {
      // Insert new user into the database
      const insertSql = 'INSERT INTO users (username, email, passwords) VALUES ($1, $2, $3) RETURNING id';
      const insertResult = await pool.query(insertSql, [username, email, password]);

      console.log('1 record inserted, ID:', insertResult.rows[0].id);
      res.redirect('/'); // Redirect to the home page after successful registration
    }
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Internal server error.');
  }
});

app.post('/changeData', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    // Parameterized query to update user data
    const sql = `
      UPDATE users
      SET email = $1,
          firstname = $2,
          lastname = $3
      WHERE userid = $4
    `;
    const result = await pool.query(sql, [email, firstName, lastName, req.cookies.userid]);

    if (result.rowCount > 0) {
      res.status(200).send('Update Successful');
    } else {
      res.status(400).send('User not found or no changes made.');
    }
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/payment', async (req, res) => {
  try {
    // Parameterized query to insert payment record
    const sql = `
      INSERT INTO payment (userid, gameid)
      VALUES ($1, $2)
      RETURNING paymentid
    `;
    const result = await pool.query(sql, [req.cookies.userid, req.cookies.gameid]);
    const paymentId = result.rows[0].paymentid; // Access the ID from the first row

    const sqlUpdate = `
    UPDATE game_cart
    SET purchasestatus = true , paymentid = $1
    WHERE userid = $2 AND gameid = $3`

    await pool.query(sqlUpdate, [paymentId,req.cookies.userid, req.cookies.gameid]);

    res.clearCookie('gameid'); // Clear the gameid cookie after processing payment
    res.redirect('../add-to-cart/cart.html');
  } catch (err) {
    console.error('Error processing payment:', err);
    res.status(500).send('Internal Server Error');
  }
});




// API route to fetch user data
app.get('/api/user_data/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM users WHERE userid = $1';
    const result = await pool.query(sql, [req.cookies.userid]);

    if (result.rows.length > 0) {
      console.log(result.rows);
      res.json(result.rows); // Send user data as JSON
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Serve static files
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

// Serve payment page and log query string
app.get('/payment/payment.html/', (req, res) => {
  const addQuery = req.query.q; // Get the search query from the URL
  console.log(addQuery);
  res.send(addQuery); // Respond with the query for demonstration
  // res.sendFile(path.join(__dirname, '../payment/payment.html')); // Uncomment to serve the file instead
});

// Add game to cart
app.get('/api/addCart', async (req, res) => {
  const addQuery = req.query.q; // Game ID from the query
  const userId = req.cookies.userid;
  console.log(parseInt(addQuery)+" "+userId);
  

  try {
    // Check if the game already exists in the user's cart
    const checkSql = `SELECT * FROM game_cart WHERE userid = $1 AND gameid = $2`;
    const checkResult = await pool.query(checkSql, [userId, addQuery]);

    if (checkResult.rows.length > 0) {
      return res.status(409).send('Data already exists');
    }

    // Insert new game into the cart
    const insertSql = `
      INSERT INTO game_cart (userid, gameid, purchaseStatus)
      VALUES ($1, $2, false)
    `;
    await pool.query(insertSql, [userId, addQuery]);

    res.status(200).send('Insert Successful');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Serve game content for a specific game
app.get('/game-content/:id', async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  

  try {
    const sql = `SELECT 
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
      game_requirements.game_storage,
      game_cart.purchasestatus
    FROM games
    LEFT JOIN game_requirements 
      ON games.gameid = game_requirements.gameid
    LEFT JOIN game_cart
      ON games.gameid = game_cart.gameid
    WHERE games.gameid = $1`;
    const result = await pool.query(sql, [productId]);
    console.log(result.rows);
    
    if (result.rows.length > 0) {
      const gameData = result.rows[0];
      console.log(gameData);

      app.locals.currentGameData = gameData; // Store game data for further use if needed
      res.status(200).sendFile(path.join(__dirname, '../game-content/game-content.html'));
    } else {
      res.status(404).send('Game not found');
    }
  } catch (err) {
    console.error('Error fetching game content:', err);
    res.status(500).send('Internal Server Error');
  }
});


// API endpoint to fetch current game data
app.get('/api/game-data', (req, res) => {
  if (app.locals.currentGameData) {
    console.log(app.locals.currentGameData);
    res.json(app.locals.currentGameData);
  } else {
    res.status(404).send('No game data available');
  }
});

// API endpoint to fetch all games
app.get('/api/searchAll', async (req, res) => {
  try {
    const sql = 'SELECT * FROM games';
    const result = await pool.query(sql); // No parameters needed for fetching all games
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all games:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to search games in the cart by name or developer
app.get('/api/searchCart', async (req, res) => {
  const cartQuery = req.query.q || ''; // Get the search query from the URL, default to an empty string
  console.log('Server:', cartQuery);

  try {
    const sql = `
      SELECT
        game_cart.cartid,
        game_cart.purchasestatus,
        games.game_name, 
        games.image_url,
        games.price,
        games.developer
      FROM game_cart
      INNER JOIN games 
      ON games.gameid = game_cart.gameid
      WHERE games.game_name ILIKE $1 
      OR games.developer ILIKE $2
    `;

    const wildcardQuery = `%${cartQuery}%`;
    const result = await pool.query(sql, [wildcardQuery, wildcardQuery]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error searching games in cart:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint for search functionality
app.get('/api/search', async (req, res) => {
  try {
    const searchQuery = req.query.q ? req.query.q.split(',') : [];

    if (!searchQuery || searchQuery.length === 0) {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const validGenres = ['RPG', 'Sci-fi', 'Sandbox', 'Survival', 'Action', 'Adventure', 'Shooter', 'Social', 'Party', 'Competitive', 'Multiplayer', 'Strategy', 'Sports', 'Platformer', 'Puzzle', 'Simulation', 'Card Game'];
    const allGenresValid = searchQuery.every(item => validGenres.includes(item.trim())); // Trim whitespace

    if (!allGenresValid) {
      // Full-text search (using ILIKE and joining search terms with wildcards)
      const wildcardQuery = `%${searchQuery.map(term => term.trim()).join('%')}%`; // Trim and join
      const sql = `
        SELECT * FROM games
        WHERE game_name ILIKE $1 OR game_description ILIKE $1
      `;
      const result = await pool.query(sql, [wildcardQuery]);
      res.json(result.rows);
    } else {
      // Genre filtering (using array overlap and explicit type casting)
      const sql = `
        SELECT * FROM games
        WHERE genre && $1::TEXT[]
      `;
      const result = await pool.query(sql, [searchQuery.map(term => term.trim())]); // Trim before passing to query
      res.json(result.rows);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for fetching new releases
app.get('/api/search_newReleases', async (req, res) => {
  try {
    const sql = `
      SELECT *
      FROM games
      ORDER BY release_date ASC
      LIMIT 9
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching new releases:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/game-cart-data', async (req, res) => {
  try {
    const userId = req.cookies.userid; // Assuming userid is stored in cookies
    console.log(userId);
    
    // Check if the userId exists in cookies
    if (!userId) {
      return res.status(400).send('User not logged in or cookie not found');
    }

    const sql = `
      SELECT
        game_cart.purchasestatus,
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
      WHERE game_cart.userid = $1
    `;

    // Query the database
    const result = await pool.query(sql, [userId]);

    // Check if no rows are found
    if (result.rows.length === 0) {
      return res.status(404).send('No game data available for the user');
    }

    // Return the results as JSON
    res.json(result.rows); 
  } catch (err) {
    console.error('Error fetching game cart data:', err);
    res.status(500).send('Internal Server Error');
  }
});



// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
