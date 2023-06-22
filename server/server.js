const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./userSchema.js');
const cookieParser = require('cookie-parser');

//do I need this?
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
//mongodb connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, dbOptions);
    console.log('Success connecting to mongodb');
  } catch (error) {
    console.log('error connecting to mongodb');
  }
})();
// mongoConnect();

// const connection = mongoose.connection;
// console.log(connection);

// mongo session store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 second, 1 min, 1 hour, 1 day
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(cors());
app.use(urlencoded({ extended: true }));

//passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('user profile is: ', profile);
      const id = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;
      const profilePic = profile.photos[0].value;

      let currentUser = await User.findOne({ email });
      if (!currentUser) {
        const user = new User({
          id,
          email,
          firstName,
          lastName,
          profilePic,
        });
        currentUser = user.save();
      }
      return done(null, currentUser);
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/',
    failureFlash: true,
    successFlash: 'Successfully logged in!',
  })
);

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
    return res.status(200).sendFile(path.join(__dirname, './index.html'));
  });
} else {
  // app.use('/src', express.static(path.join(__dirname, '../src')));
  app.get('/', (req, res) => {
    // return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
    res.send('<h1>Hey there</h1>');
  });
}

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
