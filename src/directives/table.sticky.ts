const stickyClassName: string = 'table-sticky';
const leftFixedClass: string = '.el-table__fixed';
const rightFixedClass: string = '.el-table__fixed-right';
const canScrollValueList: any = ['auto', 'scroll'];

let scrollEl: any = null;
let scrollParentEl: any = null; // 监听滚动的父元素
let offset: number = 0; // 距离浏览器窗口顶部的值

interface TableStyle {
  width: any,
  bodyHeight: any,
  headerHeight: any
}
// table 宽高
const tableStyle: TableStyle = {
  width: 0,
  bodyHeight: 0,
  headerHeight: 0,
};

const throttle = (fn : any, wait = 300) => {
  let timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, wait);
    }
  };
};

// 判断元素是否为可滚动元素
const isElCanScroll = (el: Element) => {
  const { overflowY } = window.getComputedStyle(el);
  // overflowY 为 auto 或者 scroll时 为可滚动元素
  if (canScrollValueList.includes(overflowY)) {
    return true;
  }
  return false;
};

// 递归向上查找可滚动元素
const getScrollEl = (el: Element):any => {
  const parentEl = el.parentElement;
  if (!parentEl) {
    return document;
  }
  if (isElCanScroll(parentEl)) {
    return parentEl;
  }
  return getScrollEl(parentEl);
};

const addClass = (el: Element, className: string) => {
  el.classList.add(className);
};
const removeClass = (el: Element, className: string) => {
  el.classList.remove(className);
};
const hasClass = (el: Element, className: string) => el.classList.contains(className);

// 设置table的宽度，header高度，body高度
const setTableStyle = () => {
  if (!scrollEl) {
    return;
  }
  const mainBody = scrollEl.querySelector('.el-table__body-wrapper');
  const mainHeader = scrollEl.querySelector('.el-table__header-wrapper');
  const bodyComputedStyle = window.getComputedStyle(mainBody);
  const headerComputedStyle = window.getComputedStyle(mainHeader);

  tableStyle.width = bodyComputedStyle.width;
  tableStyle.bodyHeight = bodyComputedStyle.height;
  tableStyle.headerHeight = headerComputedStyle.height;
};

const setMainHeader = (isSticky: Boolean) => {
  const { width, headerHeight } = tableStyle;
  const mainHeader = scrollEl.querySelector('.el-table__header-wrapper');
  const mainBody = scrollEl.querySelector('.el-table__body-wrapper');
  // 解决表头 width和 body width不一致的问题
  mainHeader.style.width = width;
  // position fixed时，设置top
  mainHeader.style.top = `${offset}px`;
  // 在设置sticky时，header position 值为fixed，脱离文档流，手动设置marginTop，占位，
  // 取消sticky时，将之前设置的marginTop重置为0；
  mainBody.style.marginTop = isSticky ? headerHeight : 0;
};

const setFixedHeader = (className: string, isSticky: Boolean, isRight: Boolean) => {
  const fixedTable = scrollEl.querySelector(className);
  if (!fixedTable) {
    return;
  }
  const fixedHeader = fixedTable.querySelector('.el-table__fixed-header-wrapper');
  const fixedBody = fixedTable.querySelector('.el-table__fixed-body-wrapper');
  const { width } = fixedTable.style;

  const { headerHeight } = tableStyle;

  // 设置 fixed table的宽度，overflow 值 为hidden
  fixedHeader.style.width = width;
  // sticky设置 top 值为 offset值，否则top值为0
  fixedHeader.style.top = isSticky ? `${offset}px` : 0;
  // sticky时，需要将fixedBody的top设置为0，否则恢复为表头高度
  fixedBody.style.top = isSticky ? 0 : headerHeight;
  // 在设置sticky时，header position 值为fixed，脱离文档流，手动设置marginTop，占位，
  // 取消sticky时，将之前设置的marginTop重置为0；
  fixedBody.style.marginTop = isSticky ? headerHeight : 0;

  // 右侧需要设置marginLeft
  if (isRight) {
    const rightTable = fixedHeader.querySelector('table');
    const tableWidth = rightTable.style.width;
    // 设置 marginLeft
    rightTable.style.marginLeft = `${parseFloat(width) - parseFloat(tableWidth)}px`;
  }
};

const setSticky = () => {
  addClass(scrollEl, stickyClassName);
  setTableStyle();
  setMainHeader(true);
  // 设置左侧fixed table
  setFixedHeader(leftFixedClass, true, false);
  // 设置左侧fixed table
  setFixedHeader(rightFixedClass, true, true);
};

const removeSticky = () => {
  removeClass(scrollEl, stickyClassName);
  setTableStyle();
  setMainHeader(false);
  setFixedHeader(leftFixedClass, false, false);
  setFixedHeader(rightFixedClass, false, true);
};

const scrollHandler = () => {
  const { top } = scrollEl.getBoundingClientRect();
  const { bodyHeight } = tableStyle;
  const bottomOffset = offset - parseFloat(bodyHeight);
  if ((top < offset || top > bottomOffset) && !hasClass(scrollEl, stickyClassName)) {
    setSticky();
  }
  if ((top > offset || top < bottomOffset) && hasClass(scrollEl, stickyClassName)) {
    removeSticky();
  }
};

const onScroll = throttle(scrollHandler);

export default {
  bind: (el: Element, binding: any) => {
    setTimeout(() => {
      const value = binding.value || {};
      scrollEl = el;
      scrollParentEl = value.scrollParent
        ? document.querySelector(value.scrollParent) : getScrollEl(el);
      offset = parseFloat(value.offset || 48);
      setTableStyle();
      scrollParentEl.addEventListener('scroll', onScroll);
    });
  },
  componentUpdated() {
    setTimeout(() => {
      setTableStyle();
    });
  },
  unbind: () => {
    // 移除监听事件
    scrollParentEl.removeEventListener('scroll', onScroll);
  },
};
