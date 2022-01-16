module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    parser: 'vue-eslint-parser',
    rules: {
        indent: [
            'warn',
            4,
            {
                SwitchCase: 1
            }
        ],
        'no-fallthrough': 'off',
        quotes: [1, 'single'],
        semi: [1, 'never'],
        'spaced-comment': 2,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-async-promise-executor': 'off',
        'no-param-reassign': 'off',
        'no-func-assign': 'off',
        'no-useless-escape': 'off'
    },
    globals: {
        App: 'readonly',
        Page: 'readonly',
        getApp: 'readonly',
        wx: 'readonly',
        Component: 'readonly',
        getCurrentPages: 'readonly'
    }
}
