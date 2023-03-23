const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

const apiURL = 'https://www.ndbc.noaa.gov/data/realtime2/41114.txt';
const pierURL = 'https://www.ndbc.noaa.gov/data/realtime2/LKWF1.txt';

const getBuoyData = async (req, res, next) => {
  try {
    let buoyStuff = await fetch(apiURL);
    let buoyJson = await (await buoyStuff.text()).split('\n');
    res.locals.ocean = buoyJson;
    return next();
  } catch (err) {
    console.log(err);
  }
};
const getPierData = async (req, res, next) => {
  try {
    let pierStuff = await fetch(pierURL);
    let pierJson = await (await pierStuff.text()).split('\n');
    res.locals.pier = pierJson;
    return next();
  } catch (err) {
    console.log(err);
  }
};

app.get('/api/buoy', getBuoyData, getPierData, (req, res) => {
  // console.log('LOCALS: ', res.locals)
  return res
    .status(200)
    .json({ ocean: res.locals.ocean, pier: res.locals.pier });
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
