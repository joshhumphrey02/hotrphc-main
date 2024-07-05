import mongoose from 'mongoose';
import { IMember } from '@/types';

const MemberSchema = new mongoose.Schema<IMember>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ['member', 'worker', 'admin'],
		default: 'member',
		required: true,
	},
	gender: {
		type: String,
		enum: ['M', 'F'],
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Members ||
	mongoose.model<IMember>('Members', MemberSchema);
