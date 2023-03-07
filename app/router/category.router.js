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
const category_model_1 = require("../model/category.model");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield category_model_1.Categoria.find({});
        res.send(categorias);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener las categorias');
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield category_model_1.Categoria.findById(req.params.id);
        if (categoria) {
            res.send(categoria);
        }
        else {
            res.status(404).send('Categoria no encontrada');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener la categoria');
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategoria = new category_model_1.Categoria({
            name: req.body.name,
        });
        const savedCategoria = yield newCategoria.save();
        res.status(200).json({ code: 200, message: 'CATEGORIA CORRECTAMENTE AGREGADO', addCategoria: savedCategoria });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error al agregar la categoria');
    }
}));
module.exports = router;
