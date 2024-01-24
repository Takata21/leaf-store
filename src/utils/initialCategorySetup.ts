import Categories from '../models/Categories.ts';

export const createCategories = async () => {
	try {
		const count = await Categories.estimatedDocumentCount();

		if (count > 0) return;

		const values = await Promise.all([
			new Categories({ name: 'bags' }).save(),
			new Categories({ name: 'Drinkware' }).save(),
			new Categories({ name: 'Electronics' }).save(),
			new Categories({ name: 'Footware' }).save(),
			new Categories({ name: 'Headwear' }).save(),
			new Categories({ name: 'Hoodies' }).save(),
			new Categories({ name: 'Jackets' }).save(),
			new Categories({ name: 'Kids' }).save(),
			new Categories({ name: 'Pets' }).save(),
			new Categories({ name: 'Shirts' }).save(),
			new Categories({ name: 'Stickers' }).save(),
		]);
		console.log(values);
	} catch (error) {
		console.log(error);
	}
};
