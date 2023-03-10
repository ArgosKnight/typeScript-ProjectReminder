import express, { Request, Response } from 'express';
import { Categoria, ICategory } from '../model/category.model';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorias: ICategory[] = await Categoria.find({});
    res.send(categorias);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error al obtener las categorias');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoria: ICategory | null = await Categoria.findById(req.params.id);
    if (categoria) {
      res.send(categoria);
    } else {
      res.status(404).send('Categoria no encontrada');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error al obtener la categoria');
  }
});

router.post('/add', async (req, res) => {
  try {
    const newCategoria: ICategory = new Categoria({
      name: req.body.name,
    });
    const savedCategoria: ICategory = await newCategoria.save();
    res.status(200).json({ code: 200, message: 'CATEGORIA CORRECTAMENTE AGREGADO', addCategoria: savedCategoria });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error al agregar la categoria');
  }
});

module.exports = router;