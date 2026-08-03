import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				blueprint: {
					bg: '#0a0f1e',
					panel: '#101a30',
					line: '#1e3a5f',
					accent: '#22d3ee',
					accent2: '#0ea5e9',
				},
			},
			typography: {
				invert: {
					css: {
						'--tw-prose-body': '#cbd5e1',
						'--tw-prose-headings': '#f1f5f9',
						'--tw-prose-links': '#22d3ee',
						'--tw-prose-bold': '#f1f5f9',
						'--tw-prose-counters': '#22d3ee',
						'--tw-prose-bullets': '#1e3a5f',
						'--tw-prose-hr': '#1e3a5f',
						'--tw-prose-quotes': '#f1f5f9',
						'--tw-prose-quote-borders': '#22d3ee',
						'--tw-prose-code': '#22d3ee',
						'--tw-prose-pre-code': '#cbd5e1',
						'--tw-prose-pre-bg': '#101a30',
						'--tw-prose-th-borders': '#1e3a5f',
						'--tw-prose-td-borders': '#1e3a5f',
						code: {
							backgroundColor: '#101a30',
							borderRadius: '0.25rem',
							padding: '0.15rem 0.4rem',
						},
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						'pre code': {
							backgroundColor: 'transparent',
							borderRadius: '0',
							padding: '0',
						},
						pre: {
							border: '1px solid #1e3a5f',
						},
						a: {
							textDecoration: 'none',
							'&:hover': { textDecoration: 'underline' },
						},
					},
				},
			},
		},
	},
	plugins: [typography],
}
