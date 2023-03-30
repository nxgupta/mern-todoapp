let express = require('express');
let tasksRouter = require('./routes/tasks.router');
let dotenv = require('dotenv');
let morgan = require('morgan')
let cors = require('cors')
let connect = require('./db/connect');
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

dotenv.config();
let app = express();
let port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use('/api/v1/tasks', tasksRouter)
app.use(notFound );
app.use(errorHandler);

let start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening at ${port}`);
        })
    }
    catch (error) {
        
    }
}
start()