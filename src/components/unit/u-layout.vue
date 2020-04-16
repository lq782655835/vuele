<template>
    <div class="u-layout" :dir="dir" @click="clickHandle"><slot></slot></div>
</template>
<script>
export default {
  name: 'u-layout',
  props: {
    dir: {
      default: 'h',
      validator: value => ['h', 'v'].includes(value),
    },
  },
  methods: {
    clickHandle(e) {
      this.$emit('click', e);
    },
  },
};
</script>
<style lang="scss" scoped>
$margin-small: 5px;
$margin-base: 10px;
$margin-large: 30px;

.u-layout {
    &[layout='inline-block'] > * {
        display: inline-block;
    }

    &[layout='inline'] > * {
        display: inline;
    }

    &[dir='h'] {
        & > *:not(:last-child) {
            margin-right: $margin-base;
        }

        &[gap='shrink'] {
            & > *:not(:last-child) {
                margin-right: -1px;
            }
        }

        &[gap='none'] {
            & > *:not(:last-child) {
                margin-right: 0;
            }
        }

        &[gap='small'] {
            & > *:not(:last-child) {
                margin-right: $margin-small;
            }
        }

        &[gap='large'] {
            & > *:not(:last-child) {
                margin-right: $margin-large;
            }
        }
    }

    &[dir='v'] {
        & > *:not(:last-child) {
            margin-bottom: $margin-base;
        }

        &[gap='shrink'] {
            & > *:not(:last-child) {
                margin-bottom: -1px;
            }
        }

        &[gap='none'] {
            & > *:not(:last-child) {
                margin-bottom: 0;
            }
        }

        &[gap='small'] {
            & > *:not(:last-child) {
                margin-bottom: $margin-small;
            }
        }

        &[gap='large'] {
            & > *:not(:last-child) {
                margin-bottom: $margin-large;
            }
        }
    }

    &[alignment='left'] {
        text-align: left;
    }

    &[alignment='center'] {
        text-align: center;
    }

    &[alignment='right'] {
        text-align: right;
    }
}
</style>
