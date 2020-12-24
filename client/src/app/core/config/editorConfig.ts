import { TheUploadAdapterPlugin } from '../misc/uploadAdapter';

const editorConfig = {
  alignment: {
    options: ['left', 'right', 'center']
  },
  toolbar: {
    viewportTopOffset: 30,
    shouldNotGroupWhenFull: true
  },
  extraPlugins: [TheUploadAdapterPlugin],
	image: {
			resizeUnit: "%",
			resizeOptions: [ {
				name: 'imageResize:original',
				value: null
			},
			{
				name: 'imageResize:50',
				value: '50'
			},
			{
				name: 'imageResize:75',
				value: '75'
			} ]
	}
};

export default editorConfig;
