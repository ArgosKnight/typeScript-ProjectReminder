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
const express_1 = __importDefault(require("express"));
const product_model_1 = require("../model/product.model");
const router = express_1.default.Router();
//mostrar todo
router.get('/', (req, res) => {
    router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.Product.find().exec();
            res.status(200).send(products);
        }
        catch (err) {
            next(err);
        }
    }));
});
//mostrar por id:
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield product_model_1.Product.findById(productId).exec();
        res.status(200).send(product);
    }
    catch (err) {
        next(err);
    }
}));
//mostrar promedio de precio
router.get('/prom-price', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.aggregate([{ $group: { _id: null, avgPrice: { $avg: '$price' } } }]);
        res.status(200).send({ avgPrice: result[0].avgPrice });
    }
    catch (err) {
        next(err);
    }
}));
//agregamos 
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = req.body;
        const product = new product_model_1.Product(newProduct);
        yield product.validate();
        yield product.save();
        res.status(200).json({ code: 200, message: 'PRODUCTO CORRECTAMENTE AGREGADO', addProduct: product });
    }
    catch (error) {
        next(error);
    }
}));
// Editar por id
router.put('/edit/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(productId, req.body, { new: true }).exec();
        res.status(200).send(updatedProduct);
    }
    catch (err) {
        next(err);
    }
}));
//agregamos precio
router.put('/:id/price', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const newPrice = req.body.price; // asumiendo que en el body de la petición viene un objeto con el nuevo precio
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(productId, { price: newPrice }, { new: true }).exec();
        res.status(200).send(updatedProduct);
    }
    catch (err) {
        next(err);
    }
}));
router.put('/:id/status', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const newStatus = req.body.status;
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(productId, { isActive: newStatus }, { new: true }).exec();
        if (!updatedProduct) {
            res.status(404).send({ message: 'Producto no encontrado.' });
            return;
        }
        res.status(200).send(updatedProduct);
    }
    catch (err) {
        next(err);
    }
}));
//eliminamos
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const deletedProduct = yield product_model_1.Product.findByIdAndDelete(productId).exec();
        if (!deletedProduct) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        res.status(200).send({ message: 'Producto eliminado correctamente' });
    }
    catch (err) {
        next(err);
    }
}));
module.exports = router;
