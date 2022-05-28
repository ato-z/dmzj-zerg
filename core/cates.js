/**
 * 从手机版列表页截取的分类信息 https://m.dmzj.com/classify.html
 * ```javascript
 * const cates =  [...document.querySelectorAll('#classCon ul')].map(ul => {
 *     return [...ul.querySelectorAll('a')].map(a => {
 *          return {
 *              title: a.innerText,
 *              key: parseInt(a.onclick.toString().split(',').pop())
 *          }
 *     })
 * })
 * console.log(cates)
 * ```
 */
const cates = {
    // 题材
    type: [
        { "title": "全部", "key": 0},
        { "title": "冒险", "key": 1},
        { "title": "欢乐向", "key": 2},
        { "title": "格斗", "key": 3},
        { "title": "科幻", "key": 4},
        { "title": "爱情", "key": 5},
        { "title": "竞技", "key": 6},
        { "title": "魔法", "key": 7},
        { "title": "校园", "key": 8},
        { "title": "悬疑", "key": 9},
        { "title": "恐怖", "key": 10},
        { "title": "生活亲情", "key": 11},
        { "title": "百合", "key": 12},
        { "title": "伪娘", "key": 13},
        { "title": "耽美", "key": 14},
        { "title": "后宫", "key": 15},
        { "title": "萌系", "key": 16},
        { "title": "治愈", "key": 17},
        { "title": "武侠", "key": 18},
        { "title": "职场", "key": 19},
        { "title": "奇幻", "key": 20},
        { "title": "节操", "key": 21},
        { "title": "轻小说", "key": 22},
        { "title": "搞笑", "key": 23}
    ],

    // 群众
    masses: [
        { "title": "全部", "key": 0},
        { "title": "少年", "key": 1},
        { "title": "少女", "key": 2},
        { "title": "青年", "key": 3}
    ],

    // 状态
    statu: [
        { "title": "全部", "key": 0},
        { "title": "连载", "key": 1},
        { "title": "完结", "key": 2}
    ],

    // 地区
    region: [
        { "title": "全部", "key": 0},
        { "title": "日本", "key": 1},
        { "title": "内地", "key": 2},
        { "title": "欧美", "key": 3},
        { "title": "港台", "key": 4},
        { "title": "韩国", "key": 5},
        { "title": "其他", "key": 6}
    ]
}

module.exports = cates