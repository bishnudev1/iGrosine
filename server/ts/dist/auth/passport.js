"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
const loginWithGoogle = (passport) => {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || '',
            lastName: ((_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName) || '',
            image: ((_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || '',
            email: ((_f = (_e = profile.emails) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value) || ''
        };
        try {
            let user = yield User_1.default.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
        }
        catch (error) {
            console.log(error);
            done(error, false);
        }
    })));
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User_1.default.findById(id)
            .then(user => {
            done(null, user);
        })
            .catch(err => {
            done(err, null);
        });
    });
};
exports.loginWithGoogle = loginWithGoogle;
