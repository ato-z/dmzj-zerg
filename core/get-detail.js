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
const getDetail = ((headless, domain) => {
    let handle
    if (headless) {
        const puppeteer = require('puppeteer')
        /** 通过无头浏览器获取 */
        const getDetailByPuppeteer = async (url) => {

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
    } else {
        const axios = require('axios')
        /** 通过正则匹配 */
        const getDetailByReg = async (url) => {
            const html = await axios.get(url).then(res => res.data)
            try {
                const json = `[${html.match(/mReader.initData\((.+)\)/i)[1]}]`
                const data = JSON.parse(json)[0]
                return {
                    title: data.chapter_name,
                    imgs: data.page_url
                }
            } catch (err) {
                throw new Error('喔哟～漫画格式解析失败！！！')
            }
        }
    }

    let getDetail = async (bookID, sectionID) => {
        const url = `${domain}view/${bookID}/${sectionID}.html`
        const result = await handle(url)
        return result
    }
     
    return getDetail

}) (config.headless, config.domain)

module.exports = getDetail