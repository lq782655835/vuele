import qs from 'qs';

/* 过滤undefined, null等无效值，可选过滤'' */
export const filterEmpty = (data: any) => {
  if (data) {
    if (data instanceof Array) {
      return data;
    }
    const rst: any = {};
    Object.keys(data).forEach((key) => {
      if (key === '_allowSpace') {
        return;
      }
      if (!data[key] && data[key] !== 0 && data[key] !== false) {
        if (data.allowSpace && data[key] === '') {
          rst[key] = data[key];
        }
        return;
      }
      rst[key] = data[key];
    });
    return rst;
  }
  return '';
};

export const blankToComma = (value: any) => {
  if (!value && value !== 0) {
    return '';
  }

  return value.trim().replace(/[ \n\t]+/g, ',')
    .replace(/[,，]+/g, ',').replace(/^[,，]/g, '')
    .replace(/[,，]$/g, '');
};


export const param2query = (url: string, query: any = {}) => {
  let resultUrl = url;
  resultUrl += `?${qs.stringify(query)}`;
  return resultUrl;
};

export const getUrlParams = (url: string = window.location.href) => {
  const arr = url.split('?');
  const param = arr.length ? arr[1] : '';
  return qs.parse(param);
};

// 深度clone
export const clone = (value: any) => {
  const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  const cloned: any = {};
  switch (type) {
    case 'object':
      Object.keys(value).forEach((i: any) => {
        cloned[i] = clone(value[i]);
      });
      return cloned;
    case 'array':
      return value.map(clone);
    default:
      return value;
  }
};

export const download = (url: string, params?: any, isImage:boolean = true) => {
  let resultUrl = url;
  if (!resultUrl) {
    return;
  }

  if (params) {
    resultUrl += '?';
    Object.keys(params).forEach((param: any) => {
      // eslint-disable-next-line
      if (params.hasOwnProperty(param)) {
        if (Array.isArray(params[param])) {
          /* eslint-disable no-loop-func */
          params[param].forEach((el: any) => {
            resultUrl += `${param}[]=${el}&`;
          });
          /* eslint-enable no-loop-func */
        } else if (params[param] !== undefined) {
          resultUrl += `${param}=${params[param]}&`;
        }
      }
    });
  }

  if (isImage) {
    const a: any = document.createElement('a');
    a.href = resultUrl;
    a.download = true;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(resultUrl);
  }
};

export default {
  filterEmpty,
  blankToComma,
  param2query,
  getUrlParams,
  clone,
  download,
};
