import {join} from 'path'

const include = join(__dirname, 'src');

export default {
    entry: './src/main/eztz',
    output: {
        path: join(__dirname, 'dist/umd'),
        libraryTarget: 'umd',
        library: 'eztz',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', include}
        ]
    }
}