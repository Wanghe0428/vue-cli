// webpack配置在config-overrides.js中配置
module.exports = {
    webpack: function (config) {
        config.output.library = "reactApp";
        config.output.libraryTarget = "umd";
        config.output.publicPath = "http://localhost:8002/";
        return config
    },
    devServer: function (configFuction) {
        return function (proxy, allowedHost) {
            const config = configFuction(proxy, allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin": "*"
            }
            return config
        }
    }
}