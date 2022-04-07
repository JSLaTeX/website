declare module '@windicss/plugin-animations' {
	import { Plugin } from 'windicss';

	const plugin: (props: any) => Plugin;
	export = Plugin;
}
