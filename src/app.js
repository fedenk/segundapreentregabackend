import express from 'express';
import handlebars from 'express-handlebars'; 
import mongoose from 'mongoose';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

const environment = async () => {
	const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use(express.static(`${__dirname}/public`))

    try {
        await mongoose.connect('mongodb+srv://fedenkoptv:86VUQzMmgjkJQ26Z@cluster55575fgs.es4ndyh.mongodb.net/2daPreEntrega?retryWrites=true&w=majority');
        console.log('BDD connected');

        /*const productos = [
            {
                title: "Platos",
		        description: "Loro",
		        code: "abc133",
		        price: 5400,
		        status: true,
		        stock: 24,
		        category: "bazar",
		        image: "image"
            },
            {
                title: "Vasos",
		        description: "Crossmaster",
		        code: "abc134",
		        price: 3500,
		        status: true,
		        stock: 12,
		        category: "bazar",
		        image: "image"
            },
            {
                title: "Cubiertos",
		        description: "Bahco",
		        code: "abc135",
		        price: 4000,
		        status: true,
		        stock: 18,
		        category: "bazar",
		        image: "image"
            },
            {
                title: "Rallador",
		        description: "Bremen",
		        code: "abc136",
		        price: 7500,
		        status: true,
		        stock: 6,
		        category: "bazar",
		        image: "image"
            },
            {
                title: "Sarten",
		        description: "Power",
		        code: "abc137",
		        price: 3200,
		        status: true,
		        stock: 24,
		        category: "bazar",
		        image: "image"
            }
        ];

        await productsModel.insertMany(productos);

        const productsResult = await productsModel.find();
        console.log(productsResult);*/


    } catch (error) {
        console.log(error);
    }
	app.listen(8080, () => console.log('server running'));
};

environment();