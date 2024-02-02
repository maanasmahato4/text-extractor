import PostcssPresetManitne from 'postcss-preset-mantine';
import PostcssSimpleVars from 'postcss-simple-vars';

const plugins = [
	PostcssPresetManitne(),
	PostcssSimpleVars({
		variables: {
			'mantine-breakpoint-xs': '36em',
			'mantine-breakpoint-sm': '48em',
			'mantine-breakpoint-md': '62em',
			'mantine-breakpoint-lg': '75em',
			'mantine-breakpoint-xl': '88em',
		},
	}),
];

export default { plugins };