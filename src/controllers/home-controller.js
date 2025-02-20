import { Router } from "express";

import homeService from "../services/home-service.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const items = await homeService.getAllOffers();
    res.render('home', { items });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;

