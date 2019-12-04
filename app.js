require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')

function getHTML() {
    try {
        const html = axios.get(process.env.SEMINOVOS_VEICULOS)
            .then((response) => response.data)
            .catch((error) => console.error(error))
    
        return Promise.resolve(html)        
    } catch (error) {
        return Promise.reject(error)
    }
}

function convertHTML(html) {
    
    const $ = cheerio.load(html)
    const result = $('.list-of-cards .item').map(function (i, element) {
        let url = $(element).find('.card-content a').attr('href')
        url = url.substring(0, url.indexOf('?'))

        const id = url.split('-').reverse()[0]
        const figure = ($(element).find('figure a img').attr('src') ?
            $(element).find('figure a img').attr('src') :
            $(element).find('figure a img').attr('data-src'))

        return [{
            'id': parseInt(id),
            'url': 'https://seminovos.com.br' + url + '/',
            'figure': figure,
            'title': $(element).find('.card-content a .card-title').text().trim(),
            'price': parseFloat($(element).find('.card-content a .card-price').text().trim().replace('R$ ','')),
            'version': $(element).find('.card-content .card-info .card-subtitle span').text().trim(),
            'vendorType': $(element).find('.card-content .card-info .card-owner-label').text().trim(),
            'year': $(element).find('.card-content .card-info .card-features .list-features li[title="Ano de fabricação"]').text().trim(),
            'km': parseFloat($(element).find('.card-content .card-info .card-features .list-features li[title="Kilometragem atual"]').text().trim().replace(' km','')),
            'shift': $(element).find('.card-content .card-info .card-features .list-features li[title="Tipo de câmbio"]').text().trim(),
            'list': $(element).find('.card-content .card-info .card-features .list-inline li').map((i, e) =>
                $(e).text().trim().replace(',', '')
            ).get(),
        }]

    }).get()

    return Promise.resolve(result)
}

async function main() {

    try {
        const html = await getHTML()
        const result = await convertHTML(html)
        
        console.log(result)        
    } catch (error) {
        console.error('Error: ', error)
    }
}

main()