const puppeteer = require('puppeteer')
const config = require('./config.json')

/**
 * 传入漫画拼音昵称获取漫画详情
 * @param {*} bookName 漫画拼音昵称 'zaijianlongshengnihaorensheng'
 * @returns 漫画详情
 * ```javascript
 * getBook('zaijianlongshengnihaorensheng')
 * .then(detail => console.log(detail))
 * ```
 */
const getBook = async (bookName) => {

    // 创建一个无头浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true, // headless为true表示为 有头模式。 会打开一个浏览器进行操作
    })

    // 打开一个新页面
    const page = await browser.newPage()
    const url = `${config.domain}info/${bookName}.html` // https://m.dmzj.com/info/zaijianlongshengnihaorensheng.html
    // 输入详情页面地址
    await page.goto(url)

    // 相当于在浏览器的控制台执行js
    const detail = await page.evaluate(() => {
        try {
            const id = parseInt(window.obj_id)
            const cover = document.querySelector('.pic img').src
            const title = document.querySelector('#comicName').innerText
            const prop = document.querySelector('.sub_r').innerText.split('\n\n')
            prop.pop() // 去掉最后的标签
            const des = document.querySelector('.txtDesc.autoHeight').innerText
            
            // 展开所有的章节
            const more = document.querySelector('.add')
            if (more) more.click()
            
            // 获取所有章节
            const items = [...document.querySelectorAll('.Drama.autoHeight a')].map(a => {
                return {
                    title: a.innerText,
                    id: parseInt(a.href.split('/').pop())
                }
            })

            // 返回漫画详情
            return {
                id, title, cover, des, prop, items
            }
        } catch(err) {
            // 被封禁的漫画
            throw new Error(document.documentElement.innerText)
        }
    })
    // 关闭浏览器
    browser.close()
    return detail
}

module.exports = getBook