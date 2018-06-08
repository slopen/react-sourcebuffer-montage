const path = require ('path');
const env = require ('process-env');
const webpack = require ('webpack');
const CopyWebpackPlugin = require ('copy-webpack-plugin');
const UglifyJsPlugin = require ('uglifyjs-webpack-plugin');

const config = require ('../../config/default.json');
const projectRoot = path.resolve (__dirname, '../../');

const SRC_PATH = path.resolve (projectRoot, 'src');
const BUILD_PATH = path.resolve (projectRoot, 'build/components');
const MODULES_PATH = path.resolve (projectRoot, 'node_modules');

const NODE_ENV = env.get ('NODE_ENV') || 'development';
const PRODUCTION = NODE_ENV === 'production';

module.exports = {

	target: 'web',

	mode: NODE_ENV,

	entry: path.resolve (SRC_PATH, 'index.js'),

	output: {
		path: BUILD_PATH,
		filename: 'index.js',
		publicPath: PRODUCTION ? '/' : `http://localhost:${config.APP_DEVPORT}/`
	},

	performance: {
		hints: false
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			SRC_PATH,
			MODULES_PATH
		]
	},

	module: {
		rules: [
			{
				test: /\.(js|mjs)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.(png|jpg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(css|less)$/,
				loaders: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
							sourceMap: !PRODUCTION
						}
					},
					'less-loader'
				]
			}
		],
		noParse: /lie\.js|[\s\S]*.(svg|ttf|eot)/
	},
	plugins: [
		new CopyWebpackPlugin ([
			{
				from: path.resolve (SRC_PATH + '/html/index.html'),
				to: 'index.html'
			}
		]),
		new webpack.NoEmitOnErrorsPlugin (),
		new webpack.DefinePlugin ({
			'process.env': {
				'NODE_ENV': JSON.stringify (NODE_ENV)
			}
		})
	].concat (PRODUCTION ? [
		new UglifyJsPlugin ({
			sourceMap: false,
			uglifyOptions: {
				warnings: false,
				output: {
					comments: false
				},
				compress: {
					conditionals: true,
					dead_code: true,
					evaluate: true,
					loops: true,
					passes: 3,
					booleans: true,
					unused: true,
					join_vars: true,
					collapse_vars: true,
					reduce_vars: true
				},
				mangle: false
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin
	] : []),

	stats: false,

	devServer: {
		port: config.APP_DEVPORT,
		contentBase: BUILD_PATH,
		disableHostCheck: true,
		stats: 'minimal',
		hot: true,
		inline: true
	},

	cache: true,
	devtool: 'source-map'

}
