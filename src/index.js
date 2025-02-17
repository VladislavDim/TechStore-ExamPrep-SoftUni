import express from 'express';
import handlebars from 'express-handlebars';

import routes from './routes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

//Db setup
try {
    const uri = 'mongodb://127.0.0.1:27017/techStore'
    await mongoose.connect(uri);
    console.log('Db Connected!');
} catch (error) {
    console.error('Cannot connect to DB!');
    console.log(error.message);
}


//Handlebars setup 
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

//Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);



app.listen(3000, () => console.log('Server is running on http://localhost:3000...'));