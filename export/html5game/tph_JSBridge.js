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
	//'sprite_width', // 버그
	//'sprite_height', // 버그
	//'sprite_xoffset', // 버그
	//'sprite_yoffset', // 버그
	'image_alpha',
	'image_angle',
	//'image_blend', // 버그
	'image_index',
	//'image_number', // 버그
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
	
	// 쉐이더 관련 상수들
	'MATRIX_VIEW',
	'MATRIX_PROJECTION',
	'MATRIX_WORLD',
	'MATRIX_WORLD_VIEW',
	'MATRIX_WORLD_VIEW_PROJECTION',
	'MATRIX_MAX',
	'MAX_VS_LIGHTS',
	// gm_Matrices[matrix] //TODO: 처리해야 함
	'gm_BaseTexture',
	'gm_LightingEnabled',
	'gm_FogStart',
	'gm_RcpFogRange',
	'gm_PS_FogEnabled',
	'gm_FogColour',
	'gm_VS_FogEnabled',
	'gm_AlphaTestEnabled',
	'gm_AlphaRefValue',
	
	// 버텍스 관련 상수들
	'vertex_type_float1',
	'vertex_type_float2',
	'vertex_type_float3',
	'vertex_type_float4',
	'vertex_type_colour',
	'vertex_type_ubyte4',
	'vertex_usage_position',
	'vertex_usage_colour',
	'vertex_usage_normal',
	'vertex_usage_textcoord',
	'vertex_usage_blendweight',
	'vertex_usage_blendindices',
	'vertex_usage_depth',
	'vertex_usage_tangent',
	'vertex_usage_binormal',
	'vertex_usage_fog',
	'vertex_usage_sample',
	
	// 폰트 관련 상수들
	'font_texture_page_size',
	
	// 타임라인 관련 상수들
	'timeline_index',
	//'timeline_running', // 버그
	'timeline_speed',
	'timeline_position',
	//'timeline_loop', // 버그
	
	// 인스턴스 관련 상수들
	'id',
	'visible',
	'solid',
	'persistent',
	//'depth', // 버그
	//'layer', // 버그
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
	//'bbox_bottom', // 버그
	//'bbox_left', // 버그
	//'bbox_right', // 버그
	//'bbox_top' // 버그
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

let jsbridge_step = (instance) => {

	EACH(window, (func, funcName) => {
		
		if (funcName.substring(0, 11) === 'gmcallback_') {

			funcName = funcName.substring(11);

			if (CHECK_IS_IN({
				array : CONST_NAMES,
				value : funcName
			}) === true) {

				window[funcName] = func(instance, undefined);
			}
		}
	});
};