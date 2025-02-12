import express from 'express';

const app = express();

//Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('It Works!');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000...'));