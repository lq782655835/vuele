module.exports = {
    title: 'vuele业务组件库',
    description: 'component lib',
    base: '/vuele/',
    theme: 'antdocs',
    themeConfig: {
        repo: 'https://github.com/lq782655835/vuele',
        docsRepo: 'https://github.com/lq782655835/vuele',
        docsDir: 'docs',
        docsBranch: 'master',
        nav: [
            { text: '📃首页', link: '/' },
            { text: '📢组件库', link: '/quickstart' },
            { text: '可视化布局[New]', link: 'https://lq782655835.github.io/vue-layout-preview' },
        ],
        sidebar: [
            {
                title: '指导',
                collapsable: false,
                children: [
                    'quickstart.md',
                ]
            },
            {
                title: '基础组件',
                collapsable: false,
                children: [
                    'base/Clipboard.md',
                    'base/ImagePreview.md',
                    'base/OperationLog.md',
                    'base/DetailHeader.md',
                    'base/Process.md',
                    'base/ImportFile.md',
                    'base/TreeSelect.md',
                    // 'base/Dialog.md',
                ]
            },
            {
                title: '指令',
                collapsable: false,
                children: [
                    'resource/Int.md',
                    'resource/StickyFooter.md'
                ]
            },
        ],
        backToTop: true,
        ads:{
            style: 2,
            speed: 2000,
            items:[
                {
                text: 'Ads details here',
                image:'https://cn.bing.com/th?id=OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg',
                link: 'https://vuepress.vuejs.org/'
                },
                {
                text: 'Ads details here',
                image:'https://cn.bing.com/th?id=OHR.MetamorphicRocks_ZH-CN9753251368_1920x1080.jpg',
                link: 'https://vuepress.vuejs.org/'
                },
                {
                text: 'Ads details here',
                image:'https://cn.bing.com/th?id=OHR.KeichitsuCrocuse_ZH-CN1061292366_1920x1080.jpg',
                link: 'https://vuepress.vuejs.org/'
                }
            ]
        },
    },
    plugins: [
        'leo-demo-block',
        require('./lib'),
        ['code-copy', {
            align: 'top'
        }]
    ],
    // configureWebpack: {
    //     plugins: [
    //       new require('awesome-typescript-loader').TsConfigPathsPlugin({ configFileName: '../../tsconfig.json' })
    //     ]
    // },
    chainWebpack: (config, isServer) => {
        // 设置scss
        function addStyleResource(rule) {
            rule
              .use("style-resource")
              .loader("style-resources-loader")
              .options({
                patterns: [
                  require('path').resolve(__dirname, "../../src/styles/mixins/index.scss"),
                ]
              });
          }
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach(type => addStyleResource(config.module.rule("scss").oneOf(type)));

        // ts loader rule
        config.resolve
        .extensions
            .prepend('.ts')
            .prepend('.tsx')
        config.resolve.alias
            .set('@', require('path').join(__dirname, '../../src'))

        config.module
        .rule('ts')
        .test(/\.ts$/)
        .use('awesome-typescript')
            .loader('awesome-typescript-loader')
            .end()
    }
}
