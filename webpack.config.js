module.exports = {
    entry : './blocks/index.js',
    output : {
        filename : 'toolkit.js'
    },

    module : {
        rules : [
            {
                test : /\.js$/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['babel-preset-env']
                    }
                }
            }
        ]
    }
};