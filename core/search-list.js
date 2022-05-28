const puppeteer = require('puppeteer')
const config = require('./config.json')

/**
 * 查询漫画
 * @param {*} word 查询的字符串
 * @returns 查询到的漫画列表
 */
const searchList = async (word) => {
    // 创建一个无头浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true, // headless为true表示为 有头模式。 会打开一个浏览器进行操作
    })

    // 打开一个新页面
    const page = await browser.newPage()
    const url = `${config.domain}search/${word}.html` // https://m.dmzj.com/search/世界尽头.html

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
    detail.word = word
    return detail
}


module.exports = searchList