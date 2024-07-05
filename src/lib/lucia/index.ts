import { adapter } from '@/models/session';
import { Lucia, TimeSpan } from 'lucia';
import { env } from '@/env';
import { IMember } from '@/types';

export const lucia = new Lucia(adapter, {
	getUserAttributes: (attributes) => {
		return {
			id: attributes._id,
			email: attributes.email,
			verified: attributes.verified,
			createdAt: attributes.createdAt,
			updatedAt: attributes.updatedAt,
		};
	},
	sessionExpiresIn: new TimeSpan(30, 'd'),
	sessionCookie: {
		name: 'session',
		expires: false,
		attributes: {
			secure: env.NODE_ENV === 'production',
		},
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<IMember, 'password'> {}
