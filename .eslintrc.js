module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-unused-vars": [
            "error", {
                "argsIgnorePattern": "next"
            }
        ]
    }
};
