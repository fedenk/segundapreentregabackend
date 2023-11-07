import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import productsModel from '../dao/dbManagers/models/products.model.js';

const router = Router();

const productManager = new Products();
const cartManager = new Carts();

router.get('/products-view', async (req,res) => {
    try {
        const products = await productManager.getAll();
        res.render('products', { products });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/carts-view', async (req,res) => {
    try {
        const carts = await cartManager.getAll();
        res.render('carts', { carts });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/products', async (req,res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: limit, page: page, lean: true });

        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/product/:pid', async (req,res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getById(pid);
        res.render('product', { product });
    } catch (error) {
        console.log(error);
    }
});

router.get('carts/:cid', async (req,res) => {
    try {
        const cid = req.params.cid;
        const result = await cartManager.getById(cid);
        res.render('carts', { result });
    } catch (error) {
        console.log(error);
    }
})



export default router;