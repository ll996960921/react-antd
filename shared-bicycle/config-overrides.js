//按需加载配置，及less文件加载配置

const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css',
        style: true,
    }),
    //less文件加载
    addLessLoader({
        //less加载配置
        javascriptEnabled: true,
        //定制主体色
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);
