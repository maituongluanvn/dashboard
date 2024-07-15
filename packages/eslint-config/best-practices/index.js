module.exports = {
	rules: {
		'array-callback-return': ['error', { allowImplicit: true }],

		'block-scoped-var': 'error',

		complexity: ['warn', 31],

		curly: ['error', 'all'],

		'dot-notation': ['error', { allowKeywords: true }],

		'dot-location': ['error', 'property'],

		eqeqeq: ['error', 'allow-null'],

		'guard-for-in': 'error',

		'no-caller': 'error',

		'no-div-regex': 'off',

		'no-else-return': ['error', { allowElseIf: false }],

		'no-empty-function': [
			'error',
			{
				allow: ['arrowFunctions', 'functions', 'methods'],
			},
		],

		'no-empty-pattern': 'error',

		'no-eval': 'error',

		'no-extend-native': 'error',

		'no-extra-bind': 'error',

		'no-extra-label': 'error',

		'no-fallthrough': 'error',

		'no-floating-decimal': 'error',

		'no-implied-eval': 'error',

		'no-invalid-this': 'off',

		'no-iterator': 'error',

		'no-lone-blocks': 'error',

		'no-loop-func': 'error',

		'no-multi-spaces': 'error',

		'no-multi-str': 'error',

		'no-new-wrappers': 'error',

		'no-octal': 'error',

		'no-proto': 'error',

		'no-redeclare': 'error',

		'no-restricted-properties': [
			'error',
			{
				object: 'describe',
				property: 'only',
			},
			{
				object: 'it',
				property: 'only',
			},
			{
				object: 'context',
				property: 'only',
			},
		],

		'no-return-assign': ['error', 'always'],

		'no-return-await': 'error',

		'no-self-compare': 'error',

		'no-sequences': 'error',

		'no-throw-literal': 'error',

		'no-unused-labels': 'error',

		'no-useless-call': 'off',

		'no-useless-concat': 'error',

		'no-useless-return': 'error',

		'no-void': 'off',

		'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],

		yoda: 'error',
	},
};
