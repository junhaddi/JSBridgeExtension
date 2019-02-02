const CONST_NAMES = [
	
	// 룸 관련된 상수들
	'room_first',
	'room_last',
	'room',
	'room_height',
	'room_width',
	'room_persistent'
];

let jsbridge_init = () => {

	EACH(global, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_NAMES,
				value : funcName
			}) !== true) {

				global[funcName] = function() {
					let args = [undefined, undefined];
					EACH(arguments, (argument) => {
						args.push(argument);
					});
					return func.apply(undefined, args);
				};
			}
		}
	});
};

let jsbridge_step = () => {

	EACH(global, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_NAMES,
				value : funcName
			}) === true) {

				global[funcName] = func(undefined, undefined);
			}
		}
	});
};