import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js';
import Products from '../dao/dbManagers/products.manager.js';
import { cartsModel } from '../dao/dbManagers/models/carts.model.js';

const router = Router();

const cartManager = new Carts();
const productManager = new Products();

router.post('/', async(req,res) => {
    try {
        const cart = await cartManager.save();
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.get('/:cid', async (req,res) => {
    try {
        const cId = req.params.cid;
        const cartById = await cartsModel.findOne({_id : cId}).populate('products.product');
        if(cartById){
            return res.send({ status: 'success', payload: JSON.stringify(cartById, null, '\t') });
        }
    }
    catch (error) {
        res.status(404).send({ status: 'error', error: 'No existe el carrito para el id ingresado' });
    }
})

router.post('/:cid/products/:pid', async (req,res) => {
    try {
        const pId = req.params.pid;
        const cId = req.params.cid;

        const product = await productManager.getById(pId);
       
        const cart = await cartManager.getById(cId);

        if(!cart){
            return res.status(404).send({ status: 'error', error: 'Cart not found'});
        }

        if(product){    
            const indexProductInCart = cart.products.findIndex(product=> product.id === pId);
            if(indexProductInCart !== -1){
                cart.products[indexProductInCart].quantity = cart.products[indexProductInCart].quantity+1;
            }else{
                cart.products.push({id: pId, quantity: 1});
            }

            const cartUpd = await cartManager.update(cId, cart);
            return res.send({ status: 'success', payload: cartUpd });
    
        }
    } catch (error) {
        res.status(404).send( {status: 'error', error: 'Product not found'});
    }
});

router.delete('/:cid/products/:pid', async (req,res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartManager.delete(cid,pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:cid', async (req,res) => {
    try {
        const cid = req.params.cid;
        const result = await cartManager.deleteAll(cid);
        res.send({ status: 'success', payload: result});
    } catch (error) {
        console.log(error);
    }
});

router.put('/:cid', async (req,res) => {
    try {
        const cid = req.params.cid;
        const result = await cartManager.update(cid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
});

router.put('/:cid/products/:pid', async (req,res) => {
    try {
        const { cid, pid } = req.params;
        const {cant} = req.body;

        const result = await cartManager.updateProduct( cid, pid, cant );
        res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
});

export default router;