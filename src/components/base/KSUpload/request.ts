// based on https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js

function getError(action: string, option: any, xhr: any) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err: any = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr: any) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function createFormData(option: any = {}) {
  // const formData = this.autoUpload ? new FormData() : this.formData;
  const { files, filename: name } = option;
  const formData = new FormData();
  for (let index = 0; index < files.length; index += 1) {
    // 建立文件名和文件的映射，重新上传需要用到
    const file = files[index];
    formData.append(name, file);
  }

  // 额外数据
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  }

  return formData;
}

export default function upload(option: any) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const readCookie = function readCookie(name) {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return (match ? decodeURIComponent(match[3]) : null);
  };

  const xhr = new XMLHttpRequest();
  const { action } = option;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e: any) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = createFormData(option);

  // const formData = new FormData();

  // if (option.data) {
  //   Object.keys(option.data).forEach(key => {
  //     formData.append(key, option.data[key]);
  //   });
  // }

  // formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
    return true;
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  headers['X-XSRF-TOKEN'] = readCookie('XSRF-TOKEN') || '';

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  Object.keys(headers).forEach((item) => {
    if (headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  });
  xhr.send(formData);
}
