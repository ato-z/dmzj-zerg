<h1 align="center">漫画之家爬虫接口</h1>

## 安装依赖包
```sh
# 安装正则模块, 爬虫的解析依赖正则, 较快!!!.不依赖环境
# config.json中 headless 配置为false
npm run install:reg

# 安装正则模块, 爬虫的解析依赖无头浏览器, 较慢,依赖环境.可模拟用户操作
# config.json中 headless 配置为true
npm run install:puppeteer

# 安装所有
npm install
```

## 开发环境启动
```sh
npm run dev
```

## 生产环境启动
```sh
npm run serve:start
```

## 生产环境停止
```sh
npm run serve:stop
```


## 接口调用
### `GET` `/search` 搜索接口
| get参数名 | 描述 |
| :-: | :- |
|word| 查询的漫画名|

```javascript
// 示例1
const host = 'http://127.0.0.1:3000'
const word = '世界' // 查询的字符串
const url = host + '/search?word=' + word

axios.get(url).then(console.log)
```
```json
/* 返回结果 */
{
    "error_code": 0,
    "msg": "ok",
    "data": {
        "word": "世界",
        "list": [
            {
                "id": 45561,
                "name": "异世界迷宫都市的治愈魔法使",
                "status": "连载中",
                "comic_py": "yishijiemigongdushidezhiyumofashi",
                "cover": "https://images.dmzj.com/webpic/16/ysjmgdszy1231.jpg",
                "prop": [
                    "幼驯染/二世",
                    "冒险欢乐向轻小说",
                    "2019-12-10 23:55"
                ],
                "last_section": {
                    "id": 95618,
                    "title": "第07话"
                }
            },
            {...}, {...}
        ]
    }
}
```

### `GET` `/cate` 列表查询参数
```javascript
// 示例1
const host = 'http://127.0.0.1:3000'
const url = host + '/cate'

axios.get(url).then(console.log)
```
```json
{
    "error_code": 0,
    "msg": "ok",
    "data": {
        // 题材
        "type": [
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
        "masses": [
            { "title": "全部", "key": 0},
            { "title": "少年", "key": 1},
            { "title": "少女", "key": 2},
            { "title": "青年", "key": 3}
        ],

        // 状态
        "statu": [
            { "title": "全部", "key": 0},
            { "title": "连载", "key": 1},
            { "title": "完结", "key": 2}
        ],

        // 地区
        "region": [
            { "title": "全部", "key": 0},
            { "title": "日本", "key": 1},
            { "title": "内地", "key": 2},
            { "title": "欧美", "key": 3},
            { "title": "港台", "key": 4},
            { "title": "韩国", "key": 5},
            { "title": "其他", "key": 6}
        ]
    }
}
```


### `GET` `/book_list` 漫画列表
| get参数名 | 描述 |
| :-: | :- |
|type| 题材类型: `冒险` `欢乐向` 值从`/cate`接口获取， 默认为 0|
|masses| 目标群体|
|statu| 完结状态|
|region| 地区|
|order| 排序|
|page| 分页 |

```javascript
// 示例1
const host = 'http://127.0.0.1:3000'
const url = host + '/book_list'
const params = {
    type: 0, // 题材key 从cate接口获取，下同
    masses: 0, // 群体
    statu: 0, // 状态,
    region: 0, // 地区
    order: 0, // 0人气倒序  1更新倒序
    page: 0, // 分页页码，默认从0开始
}

axios.get(url, { params }).then(console.log)
```

```json
{
    "error_code": 0,
    "msg": "ok",
    "data": [
        {
            "id": 40135,
            "name": "别当欧尼酱了！",
            "zone": "日本",
            "status": "连载中",
            "last_update_chapter_name": "小寻子的老头环实况",
            "last_update_chapter_id": 127473,
            "last_updatetime": 1648780055,
            "hidden": 0,
            "cover": "https://images.dmzj.com/webpic/18/220228biedang.jpg",
            "first_letter": "b",
            "comic_py": "biedangounijiangle",
            "authors": "ねことうふ（猫豆腐）",
            "types": "欢乐向/TS",
            "readergroup": "少年漫画",
            "copyright": 0,
            "hot_hits": 55307438,
            "app_click_count": 59367375,
            "num": "114674813"
        },
        {...}, {...}
    ]
}
```

### `GET` `/book_detail` 获取漫画详情
| get参数名 | 描述 |
| :-: | :- |
|py| 漫画的中文拼音 |
```javascript
// 示例1
const host = 'http://127.0.0.1:3000'
const py = 'zaishijiejintouyongchanglianqudeshaonvyuno'
const url = host + '/book_detail?py=' + py

axios.get(url).then(console.log)
```

```json
{
    "error_code": 0,
    "msg": "ok",
    "data": {
        "id": 47801,
        "title": "在世界尽头咏唱恋曲的少女YUNO",
        "cover": "https://images.dmzj.com/webpic/9/zsjjtgclqdsn0315.jpg",
        "des": "介绍:主人公·有马拓也幼年丧母，身为历史学者的父亲也在两个月前因事故去世。 在各个方面都失去了活力的...",
        "prop": [
            "石田总司 菅野洋之",
            "冒险 科幻",
            "少年漫画 日本 连载中",
            "2019-04-01 11:04"
        ],
        "items": [
            {
                "title": "第06话",
                "id": 87160
            },
            {
                "title": "第05话",
                "id": 87021
            },
            {
                "title": "第04话",
                "id": 87020
            },
            {
                "title": "第03话",
                "id": 86825
            },
            {
                "title": "第02话",
                "id": 86809
            },
            {
                "title": "第01话",
                "id": 86749
            }
        ]
    }
}
```


### `GET` `/section` 获取章节详情
| get参数名 | 描述 |
| :-: | :- |
|book_id| 漫画本的id |
|section_id| 章节的id |
```javascript
// 示例1
const host = 'http://127.0.0.1:3000'
const url = host + '/book_detail'
const params = {
    book_id: 47801,
    section_id: 87160
}

axios.get(url, {params} ).then(console.log)
```

```json
{
    "error_code": 0,
    "msg": "ok",
    "data": {
        "title": "第06话",
        "imgs": [
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(1).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(2).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(3).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(4).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(5).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(6).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(7).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(8).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(9).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(10).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(11).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(12).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(13).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(14).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(15).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(16).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(17).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(18).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(19).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(20).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(21).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(22).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(23).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(24).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(25).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(26).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(27).jpg",
            "https://images.dmzj.com/z/%E5%9C%A8%E4%B8%96%E7%95%8C%E5%B0%BD%E5%A4%B4%E5%92%8F%E5%94%B1%E6%81%8B%E6%9B%B2%E7%9A%84%E5%B0%91%E5%A5%B3YUNO/%E7%AC%AC06%E8%AF%9D%E4%BF%AE/6%20(28).jpg"
        ]
    }
}
```
