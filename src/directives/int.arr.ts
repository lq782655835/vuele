export default {
  update(el: Element, binding: any, vnode: any, oldVnode: any) {
    if (vnode.data.model.value === oldVnode.data.model.value) {
      return;
    }
    if (!vnode.data.model.value && vnode.data.model.value !== 0) {
      // 空数据不处理
      return;
    }
    const input = el.getElementsByTagName('input')[0];
    if (input) {
      input.value = vnode.data.model.value;
      input.value = input.value.replace(/[^\d，, ]+/g, '');
      input.dispatchEvent(new Event('input'));
    }
  },
};
