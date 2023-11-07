import { cartsModel } from '../dbManagers/models/carts.model.js';

export default class Carts {
    constructor() {
        console.log('Working Carts with DB');
    }

    getAll = async () => {
        const carts = await cartsModel.find().lean();
        return carts;
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    getById = async (id) => {
        const result = await cartsModel.findOne({ _id: id});
        return result;
    }

    update = async (cid, cart) => {
        const result = await cartsModel.updateOne({ _id: cid}, cart);
        return result;
    }

    updateProduct = async (cid,pid, cant) => {
        const cart = await cartsModel.findOne({ _id: cid });
        const product =  cart.products.find( prod => prod.id === pid );
        const quantity = product.quantity + cant;
        console.log(quantity);
        return product;
    }

    delete = async (cid, pid) => {
        const result = await cartsModel.updateOne({ _id : cid }, { $pull: { products: { product: { _id : pid }}}});
        return result;
    }

    deleteAll = async (cid) => {
        const cart = await cartsModel.deleteOne({ _id: cid})
        return cart;
    }
}