const express = require('express');
const config = require('config');
let models = require("./models");
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/user.routes'));

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`app5000 ${PORT}`))

models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});


// models.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });