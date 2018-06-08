import getFile from 'util/file';

const mode = 'segments';

const isOpen = ({readyState}) =>
	new Promise ((resolve, reject) =>
		readyState === 'open'
			? resolve (readyState)
			: reject (
				new Error ('media source closed')
			)
	);


const appendAndRemoveBuffer = async ({
	mediaSource,
	dataBuffer
}) => {
	await isOpen (mediaSource);

	const [sourceBuffer] = mediaSource.sourceBuffers;
	const buffer = new Uint8Array (dataBuffer);

	const start = mediaSource.duration || 0;
	const end = await new Promise ((resolve) => {
		sourceBuffer.onupdateend = () =>
			resolve (mediaSource.duration);

		sourceBuffer.timestampOffset = start;
		sourceBuffer.appendBuffer (buffer);
	});

	await isOpen (mediaSource);

	await new Promise ((resolve) => {
		if (start !== 0) {
			sourceBuffer.onupdateend = resolve;
			sourceBuffer.remove (start, end);
		} else {
			resolve ();
		}
	});

	sourceBuffer.onupdateend = null;

	return {start, end, buffer};
}


export const getFilesData = async ({
	files,
	mediaSource,
	videoCodecs,
	onVideoProgress
}) => {
	await isOpen (mediaSource);

	const filesData = [];
	const sourceBuffer = mediaSource
		.addSourceBuffer (videoCodecs);

	sourceBuffer.mode = mode;

	for (let i = 0; i < files.length; i++) {
		const {src} = files [i];

		try {
			const dataBuffer = await getFile (src);
			const data = await appendAndRemoveBuffer ({mediaSource, dataBuffer});

			filesData.push ({...files [i], ...data});

			if (onVideoProgress) {
				onVideoProgress (100 * (i + 1) / files.length);
			}

		} catch (e) {
			return Promise.reject (e);
		}
	}

	return filesData;
}

export const findBufferData = (filesData, position) => {
	const index = filesData.findIndex (({start, end}) =>
		start <= position && position <= end
	);

	if (index !== -1) {
		return [
			filesData [index],
			filesData [index - 1],
			filesData [index + 1]
		];
	}
}


export const removeSourceBuffer = (buffer, bufferData) =>
	bufferData && new Promise ((resolve) => {
		if (buffer.updating) {
			buffer.abort ();
		}

		const listener = () => {
			buffer.removeEventListener ('updateend', listener);
			resolve ();
		};

		buffer.addEventListener ('updateend', listener);
		buffer.remove (bufferData.start, bufferData.end);
	});

export const addSourceBuffer = (buffer, bufferData) =>
	bufferData && new Promise ((resolve) => {
		if (buffer.updating) {
			buffer.abort ();
		}

		const listener = () => {
			buffer.removeEventListener ('updateend', listener);
			resolve ();
		};

		buffer.addEventListener ('updateend', listener);
		buffer.timestampOffset = bufferData.start;
		buffer.appendBuffer (bufferData.buffer);
	});

export const prepareSourceBuffer = async ({
	mediaSource,
	filesData,
	position
}) => {
	const buffersData = findBufferData (filesData, position);
	const currentData = mediaSource._current || [];
	const addition = buffersData.filter ((buf) =>
		currentData.indexOf (buf) === -1
	);
	const removal = currentData.filter ((buf) =>
		buffersData.indexOf (buf) === -1
	);

	const [sourceBuffer] = mediaSource.sourceBuffers;

	for (let i = 0; i < addition.length; i++) {
		const bufferData = addition [i];

		await addSourceBuffer (sourceBuffer, bufferData);
	}

	for (let i = 0; i < removal.length; i++) {
		const bufferData = removal [i];

		await removeSourceBuffer (
			sourceBuffer,
			bufferData
		);
	}

	mediaSource._current = buffersData;
}