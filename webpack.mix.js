const mix = require('laravel-mix');

mix.js('resources/js/app.tsx', 'public/js')
   .react()
   .css('resources/css/app.css', 'public/css');

mix.webpackConfig({
    resolve: {
        extensions: ['*', '.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
});
