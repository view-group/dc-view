module.exports = {
    chainWebpack:options => {
        options.when(process.env.NODE_ENV==='development',config=>{
            config.entry('app').clear().add('./view/main.js')
        })
    },
    devServer: {
        port: '8088',
    }
}