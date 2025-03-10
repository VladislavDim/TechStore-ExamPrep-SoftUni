import { Router } from "express";
import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import profileController from "./controllers/profile-controller.js";
import offerController from "./controllers/offer-controller.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/profile', profileController);
routes.use('/offer', offerController)

//render the not found page
routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;