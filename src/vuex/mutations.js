import {
	TITLE
} from './mutation-types.js'

export default {
	// 记录当前经度纬度
	[TITLE](state, payLoad) {
		document.title = state.title = payLoad.title;
	}

}
