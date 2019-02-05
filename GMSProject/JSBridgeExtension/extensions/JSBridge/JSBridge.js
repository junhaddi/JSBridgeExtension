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
	'tile_index_mask',
	
	// 스프라이트 관련 상수들
	'spritespeed_framespersecond',
	'spritespeed_framespergameframe',
	'sprite_index',
	'sprite_width',
	'sprite_height',
	'sprite_xoffset',
	'sprite_yoffset',
	'image_alpha',
	'image_angle',
	'image_blend',
	'image_index',
	'image_number',
	'image_speed',
	'image_xscale',
	'image_yscale',
	
	// 오디오 관련 상수들
	'audio_falloff_exponent_distance',
	'audio_falloff_exponent_distance_clamped',
	'audio_falloff_inverse_distance',
	'audio_falloff_inverse_distance_clamped',
	'audio_falloff_linear_distance',
	'audio_falloff_linear_distance_clamped',
	'audio_falloff_none',
	'audio_mono',
	'audio_stereo',
	'audio_3d'
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