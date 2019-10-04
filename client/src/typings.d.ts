// declare module 'quill-image-resize-module' {
//   export class ImageResize {

//   }

// }

declare module '@ckeditor/ckeditor5-build-classic' { // or other CKEditor 5 build.
  const ClassicEditorBuild: any;

  export = ClassicEditorBuild;
}

declare module '@ckeditor/ckeditor5-image/src/imagestyle' { // or other CKEditor 5 build.
  const ImageStyle: any;

  export default ImageStyle;
}

declare module '@ckeditor/ckeditor5-image/src/imageresize' {
  const ImageResize: any;

  export default ImageResize;
}

declare module '@ckeditor/ckeditor5-editor-classic/src/classiceditor' {
  const Editor: any;

  export default Editor;
}

declare module '@ckeditor/ckeditor5-essentials/src/essentials' {
  const Essentials: any;

  export default Essentials;
}




