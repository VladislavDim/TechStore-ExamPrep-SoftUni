import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
    res.send('It Works!');
});

export default routes;