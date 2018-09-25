const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require ('./models/user');
const routes = require('./routes');
const app = express();
var cookieSession = require('cookie-session');
const requireUser = require ('./middlewares/requireUser')
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e){ console.error(e); });
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', routes);

app.listen(3000, () => console.log("Listening on port 3000 ..."));
