require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express()

const cors = require('cors')

const cookieParser=require('cookie-parser')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const connectDB=require('./db/connect')
const authMiddleware = require('./middleware/authentication');


app.use(express.json())
// app.use(cookieParser())
app.use(cors())

const authRouter = require('./routes/auth')
const skillsRouter = require('./routes/skills');

app.get('/', (req,res)=>{
    res.status(200).send('Hello')
})

app.use('/api/v1/auth', authRouter )

app.use('/api/v1/skills', authMiddleware,skillsRouter )

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
