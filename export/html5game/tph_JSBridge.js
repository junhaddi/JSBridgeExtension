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
	'audio_3d',
	
	// 경로 관련 상수들
	'path_index',
	'path_position',
	'path_positionprevious',
	'path_speed',
	'path_scale',
	'path_orientation',
	'path_endaction',
	
	// 폰트 관련 상수들
	'font_texture_page_size',
	
	// 타임라인 관련 상수들
	'timeline_index',
	'timeline_running',
	'timeline_speed',
	'timeline_position',
	'timeline_loop',
	
	// 인스턴스 관련 상수들
	'id',
	'visible',
	'solid',
	'persistent',
	'depth',
	'layer',
	// alarm //TODO: 처리해야 함
	'object_index',
	'health',
	'lives',
	'score',
	'direction',
	'friction',
	'gravity',
	'gravity_direction',
	'hspeed',
	'vspeed',
	'speed',
	'xstart',
	'ystart',
	'x',
	'y',
	'xprevious',
	'yprevious',
	'mask_index',
	'bbox_bottom',
	'bbox_left',
	'bbox_right',
	'bbox_top'
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