import {
	HEAD_TOP
} from './mutation-types.js'

export default {
	// 记录当前经度纬度
	[HEAD_TOP](state) {
		
		state.headTop = !state.headTop;
	}

}
