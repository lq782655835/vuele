import { Vue, Component, Watch } from 'vue-property-decorator';
import { Message } from 'element-ui';
import { clone, download } from '../../../../utils';
import request from '../request';
import { flagMap, sizeMap, typeMap } from '../const';

@Component
export default class Mixin extends Vue {
  private flagMap = flagMap;

  private sizeMap = sizeMap;

  private typeMap = typeMap;

  private fileUnitWidth = 60;

  private fileUnitMargin = 25;

  private dragover = false;

  private dragenterCount = 0;

  private encType = 'multipart/form-data';

  private fileList = [];


  private get wrapWidth() {
    // unitWidth + border + padding
    const { fileUnitWidth, fileUnitMargin, numPerLine } = this as any;
    const width = fileUnitWidth * numPerLine + fileUnitMargin * (numPerLine - 1) + 25 * 2 + 2;
    return numPerLine === Infinity ? '100%' : `${width}px`;
  }

  private get showAddBtn() {
    return !(this as any).readonly && this.getFileCount() < (this as any).limit;
  }

  @Watch('value', { deep: true, immediate: true })
  private onValueChanged(data: any): void {
    // console.log(data, 'internal: value updated');
    if ((this as any).autoUpload) {
      if (data.constructor !== Array) {
        throw new Error('自动上传模式下绑定value类型须为Array');
      }
      this.fileList = clone(data).map((i: any) => {
        const item = i;
        item.status = item.status || 'success';
        item.uid = item.uid || this.genUid();
        if ((this as any).flagMode) {
          item.flag = item.flag || flagMap.ORIGINAL;
        }
        item.type = item.type || this.getFileType(item);
        return item;
      });
    } else {
      if (data.constructor !== FormData) {
        throw new Error('非自动上传模式下绑定value类型须为FormData');
      }
      this.fileList = data.getAll((this as any).name).map((i: any) => {
        const item = i;
        item.url = window.URL.createObjectURL(item);
        item.status = item.status || 'success';
        item.uid = item.uid || this.genUid();
        if ((this as any).flagMode) {
          item.flag = item.flag || flagMap.ORIGINAL;
        }
        return {
          ...item, type: this.getFileType(item),
        };
      });
    }
  }

  updateFileList(fileList: any) {
    const { autoUpload } = (this as any);
    this.$emit('input', autoUpload ? this.formatFileList(fileList) : fileList);
  }

  private callHook(name: string, data: any) {
    this.$emit(name, data);
  }

  private onDragEnter(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.dragover = true;
    this.dragenterCount += 1;
  }

  private onDragLeave(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.dragenterCount -= 1;
    if (this.dragenterCount === 0) {
      this.dragover = false;
    }
  }

  private onDragOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  private onDragDrop(e: any) {
    this.dragover = false;
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const { files } = dt;
    if (!(this as any).multiple && files.length > 1) {
      Message.warning('只能拖拽一个文件上传');
      return;
    }
    this.uploadFile(files);
  }

  private onFileSelectChange() {
    (this as any).uploadFile();
  }

  private onAddBtnClick() {
    const { inputNode } = this.$refs;
    (inputNode as any).click();
  }

  private remove(file: any) {
    const { autoUpload, value, name } = this as any;
    if (!autoUpload) {
      const files = value.getAll(name).filter((item: any) => item.uid !== file.uid);
      this.updateFileList(this.createFormData(files));
    } else {
      const { flagMap: { ORIGINAL, DELETED }, fileList, flagMode } = (this as any);
      let newFileList: any[];
      if (flagMode) {
        newFileList = fileList.map((item) => {
          if (item.uid === file.uid) {
            return { ...item, flag: DELETED };
          }
          return item;
        });
      } else {
        newFileList = fileList.filter((item: any) => item.uid !== file.uid);
      }
      this.updateFileList(newFileList);
    }
    this.callHook('change', {
      type: 'remove',
      file,
      fileList: this.fileList,
    });
  }

  private preview(file: any) {
    // 非图片抛出事件，自定义处理
    if (file.type !== 'image') {
      return this.$emit('preview', { file });
    }
    const list = this.getImageList();
    const curIndex = list.findIndex((item: any) => item.src === file.url) || 0;
    (this as any).$preview(list, { curIndex });
    return true;
  }

  private urlAddDownload(url, filename = '') {
    let str = url.split('#')[0];
    // 对文件名进行编码，主要用于处理如&等特殊字符
    const name = encodeURIComponent(filename);
    if (/\?/g.test(url)) {
      str += `&download=${name}`;
    } else {
      str += `?download=${name}`;
    }
    if (url.split('#')[1]) {
      str += `#${url.split('#')[1]}`;
    }
    return str;
  }

  private onDownLoad(file: any) {
    const url = this.urlAddDownload(file.url, file.name);
    download(url);
  }

  private genUid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  private getFileType(file: any) {
    const type = file.type || '';
    const name = file.name || '';
    let typeStr = 'unknown';

    Object.keys(typeMap).forEach((key) => {
      const reg = new RegExp(`${key}$`);
      // 名称后缀不区分大小写
      if (reg.test(type) || reg.test(`${name}`.toLowerCase())) {
        typeStr = (typeMap as any)[key];
      }
    });
    return typeStr;
  }

  private formatFileList(fileList: any) {
    const { flagMode } = this as any;
    return fileList.filter((file: any) => file.status === 'success')
      .map(({ name, url, flag }: any) => (flagMode ? { name, url, flag } : { name, url }));
  }

  private getImageList() {
    return (this as any).fileList.filter((file: any) => file.status === 'success' && file.type === 'image').map((file: any) => ({
      name: file.name,
      src: file.url,
    }));
  }

  private getFileCount() {
    return ((this as any).fileList || []).reduce((total: number, file: any) => (file.status === 'success' && file.flag !== 2 ? total + 1 : total), 0);
  }

  private getRemainLimit() {
    return (this as any).limit - this.getFileCount();
  }

  private isAcceptedFileType(file: any) {
    const type = this.getFileType(file).toLowerCase();
    let isValid = false;
    (this as any).accept.split(',').forEach((cond: string) => {
      if (cond === '*') {
        isValid = true;
      } else if (/image\/.*/.test(cond)) {
        isValid = isValid || type === 'image';
      } else if (/audio\/.*/.test(cond)) {
        isValid = isValid || type === 'audio';
      } else if (/video\/.*/.test(cond)) {
        isValid = isValid || type === 'video';
      } else {
        isValid = isValid || type === (typeMap as any)[cond];
      }
    });
    return isValid;
  }

  private isAcceptedFileSize(file: any) {
    const patterns = (this as any).maxSize.match(/(\d+)(\D+)?/i);
    let size = patterns && patterns[1];
    const unit = patterns && patterns[2];
    if (!size) {
      return true;
    }
    if (unit) {
      size *= (sizeMap as any)[unit.toUpperCase()];
    }
    return size >= file.size;
  }

  private async uploadFile(paramFiles: any) {
    const { inputNode } = this.$refs;
    const files = paramFiles || (inputNode as any).files;

    const validate = this.preCheck(files);
    if (!validate) {
      return false;
    }

    // 非自动上传保存完formData就返回
    const { autoUpload, value, name } = this as any;
    if (!autoUpload) {
      const newFiles = [...value.getAll(name), ...files];
      this.updateFileList(this.createFormData(newFiles));
      this.callHook('change', {
        type: 'add',
        file: [...files],
        fileList: newFiles,
      });
      (inputNode as any).value = '';
      return true;
    }

    const {
      action, name: filename = 'file', data, withCredentials, headers,
    } = this as any;

    request({
      action,
      filename,
      files,
      data,
      headers,
      withCredentials,
      onProgress: (event: any) => {
        this.callHook('change', {
          type: 'progress', file: files, fileList: this.fileList, event,
        });
      },
      onSuccess: (resp: any) => {
        this.onLoad(resp, files);
      },
      onError: (error: any) => {
        this.callHook('change', {
          type: 'error', file: files, fileList: this.fileList, error,
        });
      },
    });
    (inputNode as any).value = '';
    return true;
  }

  private preCheck(files: any) {
    const remainCount = this.getRemainLimit();
    if (files.length > remainCount) {
      Message.warning(`当前最多只能选择${remainCount}个文件，请重新选择`);
      return false;
    }

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (!this.isAcceptedFileType(file)) {
        Message.warning('文件类型错误');
        return false;
      }
      if (!this.isAcceptedFileSize(file)) {
        Message.warning(`单个文件大小超过${(this as any).maxSize}`);
        return false;
      }
    }

    return true;
  }

  private createFormData(files: any, options = {}) {
    const formData = new FormData();
    files.forEach((item: any) => {
      formData.append((this as any).name, item);
    });
    return formData;
  }

  // 接口形式定义为:
  // {code: 200 | 0, message: String, data|result: Object | Array}
  // data|result: {url: String, name: String, success: Boolean}
  private onLoad(res: any = {}, files: any) {
    // 默认为nos上传接口做了兼容
    // res = JSON.parse('{"code":"200","message":null,"result":{"name":"8000.jpg","url":"http://nos.netease.com/haitao-sec-storage-permanent/e55e05955da94d5bb3591f9b228f6955.jpg?Signature=os129zEPCgESv5WNsCFE6dl8OtwN00dciWD9nIV1DiY%3D&Expires=3133846279&NOSAccessKeyId=33b4f5928df44d94a03f8be77ef3ffd1"},"success":true}');

    // 若返回了业务code，则必须是0或200
    if (res.code && +res.code !== 200) {
      return this.callHook('change', {
        type: 'error', file: files, fileList: this.fileList, error: res,
      });
    }

    let result = (this as any).responseHandler && (this as any).responseHandler(res);
    // 若自定义响应处理器返回结果则继续处理（默认true）
    if (result) {
      // 若自定义响应处理器返回数组或对象，则将其作为结果
      // 否则使用默认的response.data(response.result)作为响应
      if (!(result instanceof Object)) {
        result = res.data || res.result;
        if (!result) {
          throw new Error('上传接口返回格式不合法，请修改为文档推荐格式或使用responseHandler处理');
        }
      }
      if (!Array.isArray(result)) {
        result = [result];
      }

      result.forEach((i: any) => {
        const item = i;
        if ((this as any).flagMode) {
          item.flag = flagMap.ADDED;
        }
        item.status = item.success === false ? 'fail' : 'success';
      });

      const failCount = result.filter((item: any) => item.status === 'fail').length;
      if (failCount) {
        Message.warning(`有${failCount}张图片上传失败`);
      }

      this.updateFileList(this.fileList.concat(result));
      this.callHook('change', {
        type: 'add',
        file: result,
        fileList: this.fileList,
      });
    }
    return true;
  }
}
