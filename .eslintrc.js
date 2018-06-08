module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'import',
        'async-await',
        'babel'
    ],
    'settings': {
    },
    "globals": {
        "chrome": true
    },
    'rules': {
        'accessor-pairs': 'error',
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'array-callback-return': 'error',
        'arrow-body-style': 'off',
        'arrow-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            '1tbs'
        ],
        'callback-return': 'off',
        'camelcase': [
            'error',
            {
                'properties': 'never'
            }
        ],
        'class-methods-use-this': 'off',
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        'complexity': 'error',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': 'error',
        'curly': 'off',
        'default-case': 'off',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': [
            'error',
            {
                'allowKeywords': true
            }
        ],
        'eol-last': 'off',
        'eqeqeq': 'off',
        'func-call-spacing': 'off',
        'func-names': [
            'error',
            'never'
        ],
        'generator-star-spacing': 'error',
        'global-require': 'warn',
        'guard-for-in': 'error',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-length': 'off',
        'id-match': 'error',
        'indent': 'off',
        'init-declarations': 'error',
        'jsx-quotes': 'error',
        'key-spacing': 'error',
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'line-comment-position': 'off',
        'linebreak-style': [
            'error',
            'unix'
        ],
        'lines-around-comment': 'error',
        'lines-around-directive': 'error',
        'max-depth': 'error',
        'max-len': 'off',
        'max-lines': [
            'warn',
            {
                'max': 350
            }
        ],
        'max-nested-callbacks': 'error',
        'max-params': 'off',
        'max-statements': [
            'warn',
            {
                'max': 25
            }
        ],
        'max-statements-per-line': 'error',
        'multiline-ternary': 'off',
        'new-parens': 'off',
        'newline-after-var': [
            'error',
            'always'
        ],
        'newline-before-return': 'error',
        'newline-per-chained-call': 'error',
        'no-alert': 'error',
        'no-cond-assign': 'warn',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-confusing-arrow': 'off',
        'no-console': 'off',
        'no-continue': 'off',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'off',
        'no-else-return': 'off',
        'no-empty-function': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': 'off',
        'no-floating-decimal': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': 'off',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'off',
        'no-inner-declarations': [
            'error',
            'functions'
        ],
        'no-invalid-this': 'off',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-mixed-operators': 'error',
        'no-mixed-requires': 'error',
        'no-multi-spaces': 'off',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'off',
        'no-negated-condition': 'off',
        'no-nested-ternary': 'error',
        'no-new': 'off',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': [
            'error',
            {
                'props': false
            }
        ],
        'no-path-concat': 'off',
        'no-process-env': 'error',
        'no-process-exit': 'off',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'off',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'off',
        'no-sync': 'warn',
        'no-tabs': 'off',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': [
            'error',
            {
                'skipBlankLines': true
            }
        ],
        'no-undef-init': 'error',
        'no-undefined': 'error',
        'no-underscore-dangle': 'off',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': 'warn',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'warn',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-var': 'off',
        'no-void': 'error',
        'no-warning-comments': 'warn',
        'no-whitespace-before-property': 'off',
        'no-with': 'error',
        'object-curly-newline': 'off',
        'object-curly-spacing': [
            'error',
            'never'
        ],
        'object-property-newline': 'off',
        'object-shorthand': 'off',
        'one-var': 'off',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'operator-linebreak': [
            'error',
            null
        ],
        'padded-blocks': 'off',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'off',
        'prefer-numeric-literals': 'error',
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'off',
        'quote-props': 'off',
        'quotes': [
            'error',
            'single'
        ],
        'radix': 'off',
        'require-jsdoc': 'off',
        'rest-spread-spacing': 'error',
        'semi': 'off',
        'semi-spacing': 'error',
        'sort-imports': 'off',
        'sort-keys': 'off',
        'sort-vars': 'off',
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'off',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always'
        ],
        'strict': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'unicode-bom': [
            'error',
            'never'
        ],
        'valid-jsdoc': 'error',
        'vars-on-top': 'off',
        'wrap-iife': 'error',
        'wrap-regex': 'off',
        'yield-star-spacing': 'error',
        'yoda': [
            'error',
            'never'
        ],

        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'require-yield': 'off',
        'import/no-unresolved': 'off',
        'func-style': 'off',
        'no-plusplus': 'off',
        'no-empty-pattern': 'off',
        'arrow-parens': 2
    }
}