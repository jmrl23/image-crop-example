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
const os_1 = require("os");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
/**
 * Express application instance
 *
 * @type {express.Application}
 */
const app = (0, express_1.default)();
/**
 * Multer instance
 *
 * @type {Multer}
 */
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    dest: (0, os_1.tmpdir)(),
    limits: {
        fileSize: 1e+7
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return callback(new Error('Please upload an IMAGE'));
        callback(null, true);
    },
});
// API for image upload
app.post('/upload', upload.single('image'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = request.file) === null || _a === void 0 ? void 0 : _a.buffer))
        return response.status(400).end('BAD REQUEST');
    const fileName = (0, path_1.join)(__dirname, '../uploads', `${Date.now()}-${(_b = request.file) === null || _b === void 0 ? void 0 : _b.originalname}`);
    yield (0, sharp_1.default)(request.file.buffer)
        .png()
        .resize({ width: 300, height: 300 })
        .toFile(fileName);
    response.status(200).end('OK');
}));
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
