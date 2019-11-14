var mongoose = require('mongoose');
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/manager'; 

mongoose.connect(DB_CONN_STR, { useNewUrlParser: true,authSource:'manager' }, (err, res) => {
  if (err) {
    console.log(err)
  }
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose;