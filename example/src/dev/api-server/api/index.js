import express from 'express';

import videos from '../../../../data/videos';

export default express.Router ()

	.get ('/montage', (req, res) =>
		res.json (videos)
	)

	.all ('*', ({url}, res) =>
		res.status (404).json ({
			message: `${url} not found`
		})
	);