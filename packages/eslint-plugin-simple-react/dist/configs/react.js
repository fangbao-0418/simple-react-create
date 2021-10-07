module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/tslint'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  rules: {
    'curly': 2,
    'no-unused-vars': 0,
    'no-console': 0,
    'space-before-blocks': 2,
    'wrap-regex': 2,
    'array-bracket-spacing': 2,
    'block-spacing': 2,
    'brace-style': 2,
    'comma-dangle': 2,
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'function-paren-newline': ['error', 'consistent'],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'semi': ['error', 'never'],
    quotes: ['error', 'single'],
    'operator-linebreak': ['error', 'before'],
    'object-property-newline': ['error', {
      'allowAllPropertiesOnSameLine': true
    }],
    'no-whitespace-before-property': 2,
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      maxBOF: 0,
      maxEOF: 0
    }],
    'new-cap': ['error', {
      'capIsNew': false
    }],
    // 'multiline-comment-style': ['error', 'starred-block'],
    'keyword-spacing': ['error', {
      'after': true
    }],
    'indent': ['error', 2, {
      SwitchCase: 1,
      ImportDeclaration: 'first',
      'VariableDeclarator': 'first'
      /*
       * FunctionDeclaration: {
       *   parameters: 'first',
       *   body: 'first'
       * }
       */

    }],
    'key-spacing': 'error',
    'space-in-parens': 2,
    'no-multi-spaces': 2,
    'no-trailing-spaces': 2,
    'no-duplicate-imports': 2,
    'prefer-const': 2,
    'no-var': 'error',
    'react/jsx-indent-props': [2, 'first'],
    'react/jsx-wrap-multilines': [2],
    'react/jsx-tag-spacing': 2,

    /** 闭合标签在同一行 */
    'react/jsx-closing-tag-location': 2,
    'react/jsx-child-element-spacing': [0],
    'react/display-name': 0
  },
  parserOptions: {
    sourceType: 'module',
    'useJSXTextNode': true,
    // project: 'tsconfig.json',
    ecmaFeatures: {
      legacyDecorators: true,
      'jsx': true
    }
  },
  overrides: [{
    files: ['*.ts?(x)'],
    rules: {
      '@typescript-eslint/tslint/config': ['error', {
        // "lintFile": "", // path to tslint.json of your project
        'rules': {
          'class-name': true
        }
      }]
    }
  }]
};