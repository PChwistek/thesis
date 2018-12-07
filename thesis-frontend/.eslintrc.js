module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "window": true,
        "define": true,
        "require": true,
        "module": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "es6": true,
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react"
    ],
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],
        "no-console": 0,
        "no-case-declarations": 0,
        "semi": [ "error", "never"],
        "react/jsx-boolean-value": 0,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-curly-spacing": [2, "always"],
        "react/jsx-indent-props": [1, 2],
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/wrap-multilines": 1,
        "react/react-in-jsx-scope": 1,
        "react/prefer-es6-class": 1,
        "react/jsx-no-bind": 0,
    }
};