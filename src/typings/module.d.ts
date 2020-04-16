import 'vue/types/vue.d.ts';

interface KsVueOptions {
  handleRequestError?: (result: { code: number, message: string }, err: Error) => any,
  selectUrl?: () => string,
  remoteSelectUrl?: () => string,
  resolveCommonReturn?: (json) => {
    result: any
  },
  authUrl: string,
  unauthorizedUrl: string,
  transferAuthResult?: (result: any) => {
    urlKey: string,
    url: boolean,
  }[],
}

type currencyType = {
  currency?: string;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  locales?: any;
};

type percentType = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locales?: any;
};

interface KsFormatter {
  date: (value: any, format?: string) => string,
  datetime: (value: any, format?: string) => string,
  currency: (value: number, currencyOption?: currencyType) => string,
  percent: (value: number, percentOption?: percentType) => string,
  placeholder: (value: any, emptyText?: string) => any,
  trim: (value: string) => string,
}

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    ksvue: KsVueOptions,
    $formatter: KsFormatter
  }
}
