import config from '../config/default.json';

const camelCase = (str) =>
	str.toLowerCase ()
		.replace (/(_\w)/g, (w) =>
			w [1].toUpperCase ()
		);


export default Object.keys (config)
	.reduce ((result, key) => {
		result [
			camelCase (key)
		] = config [key];

		return result;
	}, {});