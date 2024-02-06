import { model, Schema } from 'npm:mongoose';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		image: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},

		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
		addresses: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Address',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.methods.generateHash = async function (password: string) {
	const salt = await bcrypt.genSalt(8);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.validPassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};
export default model('User', userSchema);
