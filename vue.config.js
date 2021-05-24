module.exports = {
    publicPath : "/",
    outputDir : "dist",
    assetsDir : "static",
    indexPath : "index.html",
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                ws:true,
                changeOrigin:true
            }
        }
    }
}