const puppeteer = require('puppeteer')
const axios = require('axios')
const config = require('./config.json')


const fillZero = n => n > 9 ? n : '0' + n

/**
 * 特定格式时间字符串转实际时间 common.date('Y年m月d日 h时m分s秒', new Date()) => 2021年01月05日 10时10分10秒
 * @param {*} dateString 需要格式的字符串
 * @param {*} _date new Date 实例
 */
const date =  (dateString, _date) => {
    const reg = /[y|m|d|h|i|s]/ig
    _date ? (_date instanceof Date || (_date = new Date(_date))) : (_date = new Date())
    dateString = dateString.replace(reg, val => {
        val = val.toUpperCase()
        if (val === 'Y') { return _date.getFullYear() }
        if (val === 'M') { return fillZero(_date.getMonth() + 1) }
        if (val === 'D') { return fillZero(_date.getDate()) }
        if (val === 'H') { return fillZero(_date.getHours()) }
        if (val === 'I') { return fillZero(_date.getMinutes()) }
        if (val === 'S') { return fillZero(_date.getSeconds()) }
    })
    return dateString
}

// 通过无头浏览器获取
const getSearchListByPuppeteer = async (url) => {

    // 创建一个无头浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true, // headless为true表示为 有头模式。 会打开一个浏览器进行操作
    })

    // 打开一个新页面
    const page = await browser.newPage()

    // 输入详情页面地址
    await page.goto(url)

    // 相当于在浏览器的控制台执行js
    const detail = await page.evaluate(() => {

        const list = [...document.querySelectorAll('.itemBox')].map(book => {
            const link = book.querySelector('.itemImg a')
            const lastSectionLink = book.querySelector('.coll')
            const comic_py = link.href.split('/').pop().split('.').shift()
            const name = link.title
            const cover = book.querySelector('.itemImg img').src
            const prop = [...book.querySelectorAll('.txtItme')].map(p => p.innerText)
            const lastSectionLinkArr = lastSectionLink.href.split('/')
            const last_section = { // 最新章节
                id: parseInt(lastSectionLinkArr.pop()),
                title: lastSectionLink.innerText
            }
            const id = parseInt(lastSectionLinkArr.pop()) // 漫画的id
            const status = book.querySelector('.wan') ? '已完美' : '连载中'

            return {
                id, name, status, comic_py, cover, prop, last_section
            }
        })
        
        return {list}
    })

    // 关闭浏览器
    browser.close()
    return detail
}

// 通过正则匹配
const getSearchListByReg = async (url) => {

    try {
        const html = await axios.get(url).then(res => res.data)
        const startIndex = html.search(/serchArry\=/i)
        const middle = html.substring(startIndex + 10, html.length)
        const end = middle.search('</script>')
        const json = middle.substring(0, end).replace(/\n/g, '')
        const list = JSON.parse(json)
        console.log(list[0])
        return { 
            list: list.map(item => ({
                id: item.id,
                name: item.name,
                status: item.status,
                comic_py: item.comic_py,
                cover: item.cover,
                prop: [
                    item.authors,
                    item.types,
                    date('y-m-d h:i:s', new Date(item.last_updatetime * 1000))
                ],
                last_section: {
                    id: item.last_update_chapter_id,
                    title: item.last_update_chapter_name
                }
            }))
        }
    } catch (err) {
        throw new Error('哎呀，什么都找不到～')
    }
}

/**
 * 查询漫画
 * @param {*} word 查询的字符串
 * @returns 查询到的漫画列表
 */
const searchList = async (word) => {
    // https://m.dmzj.com/search/世界尽头.html
    const url = `${config.domain}search/${encodeURIComponent(word)}.html`
    let result
    if (config.headless) {
        result =  await getSearchListByPuppeteer(url)
    } else {
        result = await getSearchListByReg(url)
    }
    result.word = word
    return result
}


module.exports = searchList