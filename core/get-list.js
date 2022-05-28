const axios = require('axios')
const config = require('./config.json')

/**
 * 合并请求请求参数
 * @param {*} op 
 * @returns 返回一个新的请求参数对象
 */
const assginBookListParams = (op = {}) => {
    return Object.assign({
        type: 0, // 题材
        masses: 0, // 群体
        statu: 0, // 状态,
        region: 0, // 地区
        order: 0, // 0人气倒序  1更新倒序
        page: 0
    }, op)
}

/**
 * 根据传入的参数查询漫画书列表
 * @param {*} op 
 * @returns 漫画列表
 * ```javascript
 * getBookListByParams({
 *      type: 0, // 题材
 *      masses: 0, // 群体
 *      statu: 0, // 状态,
 *      region: 0, // 地区
 *      order: 0, // 0人气倒序  1更新倒序
 *      page: 0 // 分页
 * }).then(list => console.log(list))
 * ```
 */
const getBookListByParams = (op) => {
    op = assginBookListParams(op)
    // 查询参数 [题材, 群体, 状态, 地区, 排序, 分页]
    const params = [op.type, op.masses, op.statu, op.region, op.order, op.page]
    // 查询地址
    const url = `${config.domain}classify/${params.join('-')}.json`
    return axios.get(url).then(res => res.data)
    .then(list =>  list.map(item => {
        // 如果图片地址并非完整的http路径
        if (/^http/.test(item.cover) === false && item.cover) {
            item.cover = config.imgDonmain+item.cover
        }
        return item
    }))
}

module.exports = getBookListByParams