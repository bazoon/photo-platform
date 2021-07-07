export class UploadAdapter {
  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then(file => {
        const formData = new FormData();
        formData.append("file", file);
        return fetch("/api/upload", {
          method: "post",
          body: formData
        }).then(r => {
          r.json().then(({ file }) => {
            resolve({ default: file });
          });
        });
      });
    });
  }

  abort() {}
}

export function TheUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new UploadAdapter(loader, "/image");
  };
}
