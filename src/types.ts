export interface IMember {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
	category: 'member' | 'worker' | 'admin';
	gender: 'M' | 'F';
	verified?: boolean;
	password: string;
}
