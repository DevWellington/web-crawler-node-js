require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')

axios.get(process.env.SEMINOVOS_VEICULOS)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        var devToList = []
        $('.list-of-cards .item').map(function(i,element) {

            let url = $(element).find('.card-content a').attr('href')
            url = url.substring(0,url.indexOf('?'))

            const id = url.split('-').reverse()[0]
            const figure = ($(element).find('figure a img').attr('src') ? 
                $(element).find('figure a img').attr('src') : 
                $(element).find('figure a img').attr('data-src'))

            devToList[i] = {
                'id': id,
                'url': 'https://seminovos.com.br' + url + '/',
                'figure': figure,
                'title': $(element).find('.card-content a .card-title').text().trim(),
                'price': $(element).find('.card-content a .card-price').text().trim(),
                'version': $(element).find('.card-content .card-info .card-subtitle span').text().trim(),
                'vendorType': $(element).find('.card-content .card-info .card-owner-label').text().trim(),
                'year': $(element).find('.card-content .card-info .card-features .list-features li[title="Ano de fabricação"]').text().trim(),
                'km': $(element).find('.card-content .card-info .card-features .list-features li[title="Kilometragem atual"]').text().trim(),
                'shift': $(element).find('.card-content .card-info .card-features .list-features li[title="Tipo de câmbio"]').text().trim(),
                'list': $(element).find('.card-content .card-info .card-features .list-inline li').map((i,e) => 
                        $(e).text().trim().replace(',','')
                ),
                
            };

            // console.log(devToList)
        })
        console.log(devToList)
    },
    (err) => console.log(err)
    )


// const html = '<div><h3 class="title">Teste rfasdfasjdfajs</h3></div>'
// const $ = cheerio.load(html)

// console.log($.html(),$('.title').text())


// axios.get(process.env.OLX_VEICULOS)
//     .then((response) => {
//         const html = response.data
//         const $ = cheerio.load(html)
//         var devToList = []
//         $('.section_OLXad-list .item').map(function(i,element) {

//             devToList[i] = {
//                 'title': $(element).find('.OLXad-list-link').find('.OLXad-list-title').text().trim(),
//                 'price': $(element).find('.OLXad-list-link').find('.OLXad-list-price').text().trim(),
//                 'image': $(element).find('.OLXad-list-link').find('.OLXad-list-image-box').find('img.image').attr('src'),
//                 // 'url': $(element).find('.story-link').attr('href')
//             };

//             // console.log(devToList)
//         })
//         console.log(devToList)
//     },
//     (err) => console.log(err)
//     )

// axios({
//     url: process.env.FRONT_NOTICIES,
//     method: 'get'
// })
//     .then((resp) => {
//         console.log(resp)

//         const $ = cheerio.load(resp.data)
//         const element = $('.story-title').find('.story-link').find('a')
//         const x = element.map(function (_i, _e) {
//             // return { 
//             //     'object': _e.attr('href'), 
//             //     'index': _i,
//             //     'i': 1
//             // }
//             1
//         })
//         console.log(x)

//     })
//     .catch(err => console.log(err))