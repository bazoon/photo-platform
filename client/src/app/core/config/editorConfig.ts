import { TheUploadAdapterPlugin } from '../misc/uploadAdapter';

const editorConfig = {
  alignment: {
    options: ['left', 'right', 'center']
  },
  toolbar: {
    viewportTopOffset: 30,
    shouldNotGroupWhenFull: true
  },
  extraPlugins: [TheUploadAdapterPlugin]
};

export default editorConfig;
