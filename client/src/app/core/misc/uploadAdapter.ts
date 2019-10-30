export class UploadAdapter {
  loader: any;
  url: any;
  constructor(loader: any, url: any) {
    this.loader = loader;
    this.url = url;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch('/api/upload', {
          method: 'post',
          body: formData
        }).then(r => {
          r.json().then(({ file }) => {
            resolve({ default: file });
          });
        });
      });
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}


export function TheUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader, '/image');
  };
}
