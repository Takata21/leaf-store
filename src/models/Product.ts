import { Document, model, Schema } from 'npm:mongoose';

export interface Product extends Document {
	_id: string;
	name: string;
	description?: string;
	price: number;
	category: { _id: string; name: string };
	stock: number;
	images?: string[];
	sizes?: string[];
	features?: string[];
}

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		category: { type: Schema.Types.ObjectId, ref: 'Categories' },
		images: {
			type: [String],
		},
		stock: {
			type: Number,
		},
		sizes: {
			type: [String],
			required: true,
		},
		features: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model('Product', productSchema);
