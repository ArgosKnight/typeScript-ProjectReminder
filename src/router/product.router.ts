import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Categoria, ICategory } from '../model/category.model';
import { IProduct, Product } from '../model/product.model';

const router: Router = express.Router();

//mostrar todo
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive } = req.query;
    let products;
    if (isActive === undefined) {  // si no se proporciona el parámetro isActive
      products = await Product.find(); // buscar todos los productos
    } else {
      products = await Product.find({ isActive }); // buscar productos según el valor del parámetro isActive
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});


//mostrar promedio de precio
router.get('/prom-price', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Product.aggregate([
      { 
          $group: { 
              _id: 'null', 
              avgPrice: { $avg: '$price' } 
          } 
      }
  ]);
    res.status(200).send({ avgPrice: result[0].avgPrice });
  } catch (err) {
    next(err);
  }
});

//mostrar por id:
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).exec();
        res.status(200).send(product);
      } catch (err) {
        next(err);
      }
})



//agregamos 
router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct: IProduct = req.body;
      const product: IProduct = new Product(newProduct);
  
      await product.validate();
  
      await product.save();
      
      res.status(200).json({ code: 200, message: 'PRODUCTO CORRECTAMENTE AGREGADO', addProduct: product });
    } catch (error) {
      next(error);
    }
});
  
// Editar por id
router.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const updateProduct = req.body; // el objeto updateProduct viene del cuerpo de la petición

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateProduct, { new: true }).exec();
    if (!updatedProduct) {
      res.status(404).send({ message: 'Producto no encontrado.' });
      return;
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

//agregamos precio
router.put('/:id/price', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;
      const newPrice = req.body.price; // asumiendo que en el body de la petición viene un objeto con el nuevo precio
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { price: newPrice },
      ).exec();
      res.status(200).send(updatedProduct);
    } catch (err) {
      next(err);
    }
});  

//editamos el status del producto
router.put('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const newStatus = !!req.body.isActive;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isActive: newStatus },
    ).exec();
    if (!updatedProduct) {
      res.status(404).send({ message: 'Producto no encontrado.' });
      return;
    }
    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});


//eliminamos
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();
    if (!deletedProduct) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }
    res.status(200).send({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    next(err);
  }
});




module.exports = router;