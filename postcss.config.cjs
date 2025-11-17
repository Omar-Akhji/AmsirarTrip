module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 1, // Enable experimental features
            autoprefixer: {
                grid: true, // Enable grid autoprefixing
                flexbox: true // Enable flexbox autoprefixing
            },
            features: {
                'nesting-rules': true, // Enable CSS nesting
                'custom-properties': {
                    preserve: false // Convert CSS variables to static values for older browsers
                },
            }
        },
        'postcss-merge-rules': {},
        'postcss-combine-media-query': {},
        autoprefixer: {
            grid: true,
            flexbox: true
        },
    },
};
