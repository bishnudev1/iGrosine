import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    isAuthenticated: () => boolean; // Assuming isAuthenticated is a function that returns boolean
}

export const ensureAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("http://localhost:3000/");
    }
};

export const ensureGuest = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("http://localhost:3000/log");
    }
};
