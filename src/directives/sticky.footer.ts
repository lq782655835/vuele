const stickyClassName: string = 'sticky-footer';
const canScrollValueList: any = ['auto', 'scroll'];

let scrollEl: any = null;
let scrollParentEl: any = null; // 监听滚动的父元素
let stickyOffset: number = 0;
let initialOffset: number;

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

const setSticky = () => {
  addClass(scrollEl, stickyClassName);
};

const removeSticky = () => {
  removeClass(scrollEl, stickyClassName);
};

const scrollHandler = () => {
  const { bottom } = scrollEl.getBoundingClientRect();
  const top = window.pageYOffset;
  const screenHeight = window.innerHeight;
  const classExist = hasClass(scrollEl, stickyClassName);
  if ((bottom > screenHeight) && (!classExist)) {
    scrollEl.style.bottom = stickyOffset;
    setSticky();
  }
  if ((bottom < screenHeight || (bottom > initialOffset - top))
    && classExist) {
    scrollEl.style.bottom = 'none';
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
      stickyOffset = value.offset ? value.offset : 0;
      initialOffset = scrollEl.getBoundingClientRect().bottom;
      scrollParentEl.addEventListener('scroll', onScroll);
    });
  },
  componentUpdated() {
    setTimeout(() => {
    });
  },
  unbind: () => {
    // 移除监听事件
    scrollParentEl.removeEventListener('scroll', onScroll);
  },
};
