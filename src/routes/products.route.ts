// authors.ts
import { Hono } from 'https://deno.land/x/hono@v4.0.0-rc.2/mod.ts';
import createError from 'npm:http-errors';
import Products from '../models/Product.ts';
import Category from '../models/Categories.ts';

const app = new Hono();

// GET ALL PRODUCTS

app.get('/products', async (c) => {
	try {
		const products = await Products.find();
		console.log(products);
		return c.json({ 'products': products });
	} catch (error) {
		console.log(error);
		return c.json({ error: 'Failed to retrieve products' }, 500);
	}
});

// GET  PRODUCT

app.get('/products/:id', async (c) => {
	const id = c.req.param('id');

	try {
		const productFound = await Products.findById(id).populate(
			'category',
			'name _id',
		);

		console.log(productFound);

		if (!productFound) return c.json({ error: 'Product not found' }, 404);

		return c.json({ product: productFound }, 200);
	} catch (error) {
		console.log(error);
		return c.json({
			error: 'An error occurred while retrieving the product',
		}, 500);
	}
});

// CREATE PRODUCT
app.post('/products', async (c) => {
	const body = await c.req.json();
	try {
		let imageURL = '';
		const {
			name,
			description,
			price,
			category,
			sizes,
			features,
			images,
			stock,
		} = body;

		const productFound = await Products.findOne({ name: name });

		if (productFound) throw createError.Conflict('Product Already exists');

		const foundCategory = await Category.findOne({ name: category });

		const newProduct = new Products({
			name,
			description,
			price,
			category,
			sizes,
			features,
			images,
			stock,
		});
		newProduct.category = foundCategory?._id;
		await newProduct.save();

		return c.json(newProduct, 201);
	} catch (error) {
		console.log(error);
		return c.json('create an author', 201);
	}
	// const body = await c.req.parseBody()
});

// UPDATE PRODUCT

app.put('/products/:id', async (c) => {
	const id = c.req.param('id');
	const body = await c.req.json();
	try {
		const updateProduct = await Products.findByIdAndUpdate(id, {
			$set: body,
		}, { new: true });

		if (!updateProduct) return c.json({ error: 'Product not found' }, 404);
		return c.json({
			message: 'Product updated successfully',
			product: updateProduct,
		}, 200);
	} catch (error) {
		console.log(error);
		return c.json(
			{ error: 'An error occurred while updating the product' },
			500,
		);
	}
});

app.delete('/products/:id', async (c) => {
	const id = c.req.param('id');
	try {
		const deletedProduct = await Products.findByIdAndDelete(id);

		if (!deletedProduct) {
			return c.json({ error: 'Product not found' }, 404);
		}
		return c.json(deletedProduct, 200);
	} catch (error) {
		console.log(error);
		return c.json(
			{ error: 'An error occurred while deleting the product' },
			500,
		);
	}
});

// app.post('/verify', (c) => c.json('create an author', 201))

export default app;
