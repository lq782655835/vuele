export default {
  update(el: Element, binding: any, vnode: any, oldVnode: any) {
    if (vnode.data.model.value === oldVnode.data.model.value) {
      return;
    }
    if (!vnode.data.model.value && vnode.data.model.value !== 0) {
      // 空数据不处理
      return;
    }
    const decimal = parseInt(binding.arg, 10) || 2;
    const input = el.getElementsByTagName('input')[0];
    if (input) {
      input.value = vnode.data.model.value;
      let { value } = input;
      // 过滤非法字符
      value = value.replace(/[^\d.]+/g, '');
      // 过滤多余的点
      value = value.replace('.', '$###$').replace(/\./g, '').replace('$###$', '.');
      // 过滤多余的小数位数
      const exp = new RegExp(`([\\d]+\\.[\\d]{${decimal}})([\\d]+)`);
      value = value.replace(exp, (v1, v2) => v2);
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  },
};
