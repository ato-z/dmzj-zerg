const zergDMZJ = require('./core/index')

//zergDMZJ.getBook('zaijianlongshengnihaorensheng').then(console.log)

const http = require('http')

/**
 * 接受get参数
 */
 const withParamData = (url) => {
    const index = url.indexOf('\?')
    const str = (index === -1 ? url : url.substr(index+1)).split('&')
    const params = {}
    str.map(item => {
        let [key, value] = item.split('=')
        if (value === undefined) { return }
        value = decodeURIComponent(value)
        params[key] = value
    })
    return params
}

/** 接口路由 */
const router = {
    /** 查询接口 */
    'search': op => {
        if (!op.word) throw new Error('请输出要搜索的漫画名')
        return zergDMZJ.searchList(op.word)
    },

    /** 分类信息 */
    'cate': () => zergDMZJ.cates,

    /** 漫画列表 */
    'book_list': op => zergDMZJ.getList(op),

    /** 漫画详情 */
    'book_detail': (op) => {
        if (!op.py) throw new Error('漫画名拼音不能为空')
        return zergDMZJ.getBook(op.py)
    },

    /** 章节详情 */
    'section': (op) => {
        if (!op.book_id) throw new Error('漫画id不能为空')
        if (!op.section_id) throw new Error('章节id不能为空')
        return zergDMZJ.getDetail(op.book_id, op.section_id)
    }
}

const port = 3000 // 运行端口
const ip = '127.0.0.1' // 如需上线，替换成 0.0.0.0 或者线上的ip地址
http.createServer( async (req, res) => {
    const { url } = req
    const target = url.split('\?')
    // 如果为首页
    if (target[0] === '/') {
        res.write('zerg api v1: https://m.dmzj.com/')
        return res.end()
    }
    
    /* 允许跨域 */
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    
    // 如果命中路由
    const routeHook = router[target[0].substring(1)]
    if (routeHook) {
        /** 告诉客户端即将返回 json数据 */
        res.setHeader('Content-type', 'application/json; charset=utf-8')
        try {
            const op = withParamData(target[1] || '')
            const data = await routeHook(op)
            const result = { error_code: 0, msg: 'ok', data }
            res.write(JSON.stringify(result))
        } catch( err ) {
            res.statusCode = 400
            res.write(JSON.stringify({
                error_code: 999,
                msg: err.message
            }))
        }
        return res.end()
    }

    // 其他按 404 处理
    res.write('404 not found: ' + url)
    res.end()
}).listen(port, ip, () => {
    console.log(`api server run http://${ip}:${port}`)
})