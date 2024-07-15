module.export = {
	"$schema": "https://json.schemastore.org/eslintrc.json",
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"requireConfigFile": false
	},
	"plugins": ["@typescript-eslint"],
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/typescript",
		"prettier"
	],
	"rules": {
		"import/order": "error",
		"import/no-mutable-exports": "error",
		"import/no-cycle": "error",
		"import/no-unresolved": "off",
		"@typescript-eslint/ban-types": [
			"error",
			{
				"types": {
					"{}": false
				}
			}
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				"prefer": "type-imports",
				"fixStyle": "inline-type-imports",
				"disallowTypeAnnotations": false
			}
		],
		"import/no-duplicates": ["error", { "prefer-inline": true }],
		"import/namespace": ["off"],
		"no-empty-pattern": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/require-await": "off",
		"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
		"@typescript-eslint/no-explicit-any": "off"
	},
	"settings": {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".ts", ".tsx"]
			}
		}
	},
	"ignorePatterns": ["*.js", "*.jsx", "*.cjs"]
}
