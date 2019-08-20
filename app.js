// imports in node.js
const express = require('express');
const morgan = require('morgan');
// just getting the json data from playstore.js
const playstore = require('./playstore');

// express is the server app
const app = express();

// .use() on express app adds middleware
app.use(morgan('dev'));

// create a get location for /apps
app.get('/apps', (req, res) => {
  if ('sort' in req.query && !req.query.sort) {
    console.log('sort');
    res.status(400).json({ error: 'sort param must have value' });
    return;
  }

  // console.log(req.query);

  const { sort, genres } = req.query;
  let sortedPlaystore = [...playstore];

  if (sort) {
    // console.log("sort them");
    if (sort === 'rating') {
      sortedPlaystore.sort(
        (a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)
      );
      res.status(200).send(sortedPlaystore);
      return;
    }
    if (sort === 'app') {
      sortedPlaystore.sort((a, b) => (a.App > b.App ? 1 : -1));
      res.status(200).send(sortedPlaystore);
      return;
    }
  }

  if (genres) {
    console.log(genres);
    if (['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      sortedPlaystore = sortedPlaystore.filter(
        playApp => playApp.Genres === genres
      );
      res.status(200).send(sortedPlaystore);
      return;
    }

    res.status(400).json({ error: 'genre param not recognized' });
    return;
  }

  // res.send(playstore);
  res.send('not sorted');
  return;
});

// start server
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

// package.json has things also...
