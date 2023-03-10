// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		member: {
			id: string;
			name: string;
			username: string;
			email: string;
			role: 'MEMBER' | 'AUTHOR' | 'MODERATOR' | 'ADMINISTRATOR';
			status: boolean;
			createdAt: Date;
			updatedAt: Date;
		};
	}
	// interface PageData {}
	// interface Platform {}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}
