const puppeteer = require('puppeteer')
const config = require('./config.json')

/**
 * 获取章节详情
 * @param {*} bookID     漫画id
 * @param {*} sectionID  章节id
 * @returns 章节详情
 * ```javascript
 * getDetail(29973, 123926)
 * .then(detail => console.log(detail))
 * 
 * ```
 */
const getDetail = async (bookID, sectionID) => {

    // 创建一个无头浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true, // headless为true表示为 有头模式。 会打开一个浏览器进行操作
    })

    // 打开一个新页面
    const page = await browser.newPage()
    const url = `${config.domain}view/${bookID}/${sectionID}.html` // https://m.dmzj.com/view/29973/123926.html

    // 输入详情页面地址
    await page.goto(url)

    // 相当于在浏览器的控制台执行js
    const detail = await page.evaluate(() => {

        const title = document.querySelector('.BarTit').innerText
        const imgs = [...document.querySelector('#commicBox > div').querySelectorAll('img')].map(img => img.src)
        
        return {
            title, imgs
        }
    })

    // 关闭浏览器
    browser.close()
    return detail
}

module.exports = getDetail