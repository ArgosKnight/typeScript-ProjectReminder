import express, { Request, Response } from 'express';
import { ICategory, Categoria } from '../../primerTrab/model/category.model';
import { ListCategories } from '../buisness-logic/category/list-categories';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categorias: ICategory[] = await new ListCategories(Categoria).execute()
    res.send(categorias);
  } catch (err) {
    next(err)
  }
});

module.exports = router