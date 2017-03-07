var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require(`./env/${process.env.NODE_ENV}.config`),
    app = express(),
    compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
    app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// Static files
app.use(express.static(path.join(__dirname,'../web')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../web/index.html'));
});

app.listen(3001, 'localhost', function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});
