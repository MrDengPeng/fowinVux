import {
	TITLE
} from './mutation-types.js'

export default {
	[TITLE](state, payLoad) {
		document.title = state.title = payLoad.title;
	}

}
