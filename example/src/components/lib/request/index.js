const stringify = (body) =>
	typeof body === 'object'
		? JSON.stringify (body)
		: null;


const jsonSuccess = (res) =>
	res.json ()
		.then ((result) => {
			// console.log ('< fetch response', uri, result);

			return Promise.resolve (result);
		});

const jsonError = (res) => {
	const {status} = res;
	const response = res.clone ();

	return res.json ()
		.then ((result) => {
			// console.error ('< fetch response', uri, result);

			return Promise.reject ({...result, status});
		})
		.catch ((e) => {
			if (e instanceof SyntaxError) {
				return response.text ()
					.then ((message) => Promise.reject ({
						message,
						status
					}));
			}

			return Promise.reject (e);
		});
}


export default ({
	uri,
	method = 'GET',
	headers = {},
	body
}) => {
	const options = {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers
		},
		credentials: 'include',
		mode: 'cors'
	};

	if (method !== 'GET') {
		options.body = stringify (body);
	}

	// console.log ('> fetch request', uri, options);

	return fetch (uri, options)
		.catch (() => {
			throw new Error ('connection error');
		})
		.then ((res) =>
			res.ok
				? jsonSuccess (res, uri)
				: jsonError (res, uri)
		);
}