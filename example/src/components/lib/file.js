
export default (path, type = 'arrayBuffer') =>
	fetch (path)
		.then ((res) =>
			res.ok
				? res [type] ()
				: Promise.reject (
					new Error ('get file error')
				)
		);
