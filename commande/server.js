const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

require('dotenv').config()

const uri = process.env.DATABASE_URL

const cocktailsRouter = require('./routes/cocktails')
const mocktailsRouter = require('./routes/mocktails')
const shotsRouter = require('./routes/shots')
const spiritsRouter = require('./routes/spirits')
const goatRouter = require('./routes/goat')
const orderRouter = require('./routes/orders')
const userRouter = require('./routes/user')


const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? 'http://localhost:5173' : 'https://www.la-taverne-de-ja.fr',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

app.use('/cocktails', cocktailsRouter)
app.use('/mocktails', mocktailsRouter)
app.use('/shots', shotsRouter)
app.use('/spirits', spiritsRouter)
app.use('/orders', orderRouter)
app.use('/admin', goatRouter)
app.use('/users', userRouter)

const mongoose = require('mongoose');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Cocktail DB'))
app.listen(5000, () => console.log('Server started on port 5000'))