const CONST_VAL_NAMES = [
	'room_first'
];

let jsbridge_init = () => {

	EACH(global, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_VAL_NAMES,
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
				array : CONST_VAL_NAMES,
				value : funcName
			}) === true) {

				global[funcName] = func(undefined, undefined);
			}
		}
	});
};