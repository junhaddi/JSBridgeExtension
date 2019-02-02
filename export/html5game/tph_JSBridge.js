const CONST_NAMES = [
	
	// 룸 관련 상수들
	'room_first',
	'room_last',
	'room',
	'room_height',
	'room_width',
	'room_persistent',
	
	// 레이어 관련 상수들
	'layerelementtype_background',
	'layerelementtype_instance',
	'layerelementtype_sprite',
	'layerelementtype_tilemap',
	'layerelementtype_particlesystem',
	'layerelementtype_tile',
	
	// 타일맵 관련 상수들
	'tile_rotate',
	'tile_mirror',
	'tile_flip',
	'tile_index_mask'
];

let jsbridge_init = () => {

	EACH(window, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_NAMES,
				value : funcName
			}) !== true) {

				window[funcName] = function() {
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

	EACH(window, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_NAMES,
				value : funcName
			}) === true) {

				window[funcName] = func(undefined, undefined);
			}
		}
	});
};