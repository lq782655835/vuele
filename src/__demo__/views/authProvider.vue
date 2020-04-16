<template>
    <div>
        <ks-auth-provider :authParam="authParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content1</p>
                </ks-auth>
                <p>this is a passage</p>
            </div>
        </ks-auth-provider>

        <ks-auth-provider class="f-mt20"
            :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test">
                    <p>limited content2</p>
                </ks-auth>
                <p>this is a passage</p>
            </div>
        </ks-auth-provider>

        <ks-auth-provider class="f-mt20"
            :authParam="authParam"
            :dataAuthUrl="dataAuthUrl" :dataAuthParam="dataAuthParam">
            <div>
                <ks-auth urlKey="test" :dataOpUrl="dataOpUrl" :dataOpParam="dataOpParam">
                    <p>limited content3</p>
                </ks-auth>
                <p>this is a passage</p>
            </div>
        </ks-auth-provider>
    </div>
</template>

<script>
export default {
  data() {
    return {
      authParam: [
        {
          urlKey: 'test',
          requestUrl: 'http://baidu.com',
        },
      ],
      dataAuthUrl: 'https://nei.netease.com/api/apimock/d006bd9dcbfc2d76c67cb8629e805516/api/get/dataAuth',
      dataAuthParam: {
        value1: 123,
      },
      dataOpUrl: 'https://nei.netease.com/api/apimock/d006bd9dcbfc2d76c67cb8629e805516/api/get/dataOp',
      dataOpParam: {
        value2: 123,
      },
    };
  },
};
</script>
