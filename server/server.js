const express = require('express');
const app = express();
const path = require('path');

const apiURL = 'https://www.ndbc.noaa.gov/data/realtime2/41114.txt';
const buoyData = []
fetch(apiURL)
  .then( res => res.text() )
  .then(data => {
    buoyData.push(...data.split('\n')[3].split(' ').filter(el => el !== ''))
    console.log('BUOYDATA', buoyData) 
  })
//WVHT is wave height
//DPD out of 20 seconds, 10 medium swell, larger better swell, lower is choppy wind waves
//MWT degrees from north
app.get('/api/buoy', (req, res) => {
  return res.status(200).send(buoyData);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}


app.listen(3000, () => {
  console.log('Listening on port 3000...')
}); 