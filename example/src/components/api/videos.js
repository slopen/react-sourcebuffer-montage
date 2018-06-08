import config from 'config';
import request from 'components/lib/request';


export default {

	getMontage () {
		return request ({
			uri: `${config.appHost}/montage`
		});
	},

	saveMontage (data) {
		console.log ('save montage', data);

		return Promise.resolve (data);
	}

}