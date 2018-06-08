import config from 'config';
import moment from 'moment';

export const formatCreated = (date) =>
	moment (date).format (config.formatCreatedTime);

export const formatVideoTime = (date) =>
	moment.utc (date).format (config.formatVideoTime);