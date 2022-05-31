const axios = require('axios')
const { JSDOM } = require("jsdom")
const puppeteer = require('puppeteer')
const config = require('./config.json')

// 以无头浏览器的方式打开
const getBookByPuppeteer = async (url) => {
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

// 使用 axios解析， jsdom的方式打开
const getBookByJSDOM = async (url) => {
    const html = await axios.get(url).then(res => res.data)
    const iframe = new JSDOM(html)
    const { document } = iframe.window
    try {
        const cover = document.querySelector('.pic img').src
        const title = document.querySelector('#comicName').textContent
        const prop = [...document.querySelectorAll('.sub_r .txtItme')].map(item => {
            return item.textContent.replace(/\s+/g, ' ').replace(/^\s|\s$/g, '')
        })
        prop.pop() // 去掉最后的标签
        const des = document.querySelector('.txtDesc.autoHeight').textContent
        
        const itemData = JSON.parse(html.match(/initIntroData\((.+)\)/)[1])[0]
        const items = (itemData.data || []).map(item => ({
            title: item.chapter_name,
            id: item.id
        }))
        const id = itemData.data[0].comic_id

        // 返回漫画详情
        return {
            id, title, cover, des, prop, items
        }
    } catch(err) {
        // 被封禁的漫画
        throw new Error('嗨呀～漫画跑掉啦～')
    }
}

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
    // https://m.dmzj.com/info/zaijianlongshengnihaorensheng.html
    const url = `${config.domain}info/${bookName}.html`
    let result
    if (config.headless) {
        result =  await getBookByPuppeteer(url)
    } else {
        result = await getBookByJSDOM(url)
    }
    return result
}

module.exports = getBook