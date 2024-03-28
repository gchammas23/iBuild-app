
var http = require("http");
var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
var app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
// SETUP MIDDLEWARE
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors(corsOptions));
app.use(helmet());
app.enable('trust proxy');

var userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

var customerRoutes = require('./routes/customer.routes');
app.use('/api/customer', customerRoutes);

var productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

var orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);

var templateRoutes = require('./routes/template.routes');
app.use('/api/templates', templateRoutes);

server.listen(port, () => console.log(`Listening on port ${port}`));