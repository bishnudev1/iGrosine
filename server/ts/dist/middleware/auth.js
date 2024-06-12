"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureGuest = exports.ensureAuth = void 0;
const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("http://localhost:3000/");
    }
};
exports.ensureAuth = ensureAuth;
const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("http://localhost:3000/log");
    }
};
exports.ensureGuest = ensureGuest;
