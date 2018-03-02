const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');
const fs = require('fs');
 
module.exports = function override(config, env) {
    // relative path vermek icin  
    config.resolve.modules.push(path.resolve(__dirname,'src'));
    //antd.less imported 
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    //override antd variables
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@layout-header-background": "#313e4c",
            "@menu-dark-background": "#3e4a5a",
            "@layout-header-height": "40px"
        },
    })(config, env);

    return config;
};
// const path = require("path");

// const { injectBabelPlugin, compose } = require("react-app-rewired");
// //const rewireLess = require("react-app-rewire-less");
// const rewireLess = require("react-app-rewire-less-modules");
// const rewireVendorSplitting = require("react-app-rewire-vendor-splitting");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//     .BundleAnalyzerPlugin;

// module.exports = function override(config, env) {
//     if (env === "development") {
//         config = injectBabelPlugin(["dva-hmr"], config);
//     }

//     config = injectBabelPlugin(
//         ["import", { libraryName: "antd", style: true, libraryDirectory: "es" }],
//         config
//     );

//     if (env === "production") {
//         config.plugins.push(
//             new BundleAnalyzerPlugin({
//                 analyzerMode: "static",
//                 openAnalyzer: false
//             })
//         );
//     }

//     const rewires = compose(
//         rewireLess.withLoaderOptions(
//             `${env === "production" ? "app" : "[local]"}-[hash:base64:8]`,
//             {
//                 modifyVars: {
//                     "@layout-header-background": "#313e4c",
//                     "@menu-dark-background": "#3e4a5a",
//                     "@layout-header-height": "40px"
//                 }
//             }
//         ),
//         rewireVendorSplitting
//     );

//     return rewires(config, env);
// };