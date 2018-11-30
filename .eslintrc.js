module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": 0,
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-param-reassign": ["error", { "props": false }],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    }
};