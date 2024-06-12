"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayInstance = void 0;
const express_1 = __importDefault(require("express"));
const conn_1 = __importDefault(require("./db/conn"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_2 = require("./auth/passport");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_routes_1 = __importDefault(require("./routes/order_routes"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const razorpay_1 = __importDefault(require("razorpay"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
(0, conn_1.default)();
const port = process.env.PORT;
app.use((0, express_session_1.default)({
    secret: 'copy cat bishnudev',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URI }),
}));
(0, passport_2.loginWithGoogle)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Server is working :)',
    });
});
app.use(index_1.default);
app.use('/auth', auth_1.default);
app.use('/api', order_routes_1.default);
app.use('/api', user_routes_1.default);
exports.razorpayInstance = new razorpay_1.default({
    key_id: 'rzp_test_NH7DutCORAH6gm',
    key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs',
});
app.get('/api/get-key', (req, res) => {
    res.status(201).json({
        key: 'rzp_test_NH7DutCORAH6gm',
    });
});
app.listen(port, () => {
    console.log(`Server has listening on http://localhost:${port}/`);
});
