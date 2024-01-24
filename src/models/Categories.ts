import { model, Schema } from 'npm:mongoose';

const CategoriesSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
}, {
	timestamps: true,
	versionKey: false,
});

export default model('Categories', CategoriesSchema);
