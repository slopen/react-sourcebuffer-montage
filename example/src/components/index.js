import React from 'react';
import {render} from 'react-dom';

import 'styles/styles.less';

import config from 'config';
import App from 'components/routes';


const el = document.getElementById ('root');

if (el) {
	setTimeout (() => render (<App/>, el), 250);

	console.log ('%c COMPONENTS ', 'background: green; color:#fff', config);
} else {
	console.error ('no root node found');
}
