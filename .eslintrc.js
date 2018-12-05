module.exports = {
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "comma-dangle": 0,
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-param-reassign": 0,
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    }
};