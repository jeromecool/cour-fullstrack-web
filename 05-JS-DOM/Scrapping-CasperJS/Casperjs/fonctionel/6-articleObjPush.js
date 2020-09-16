/* 
 *
 * Exercice Scrapping avec 'CasperJS' & 'PhantomJS'
 * 
 * Objectif :
 * 
 * Récupérer (GET) des datas sur un site pour pouvoir les exploitées
 * 
 * Lancer le script : casperjs articleObj.js
 *
 */


// Déclaration des variables
// Import de utils : https://www.npmjs.com/package/utils
// Import de casperJS : https://www.npmjs.com/package/casper
const fs = require('fs')
var
    casper = require("casper").create({
        pageSettings: {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
        }
    }),
    url = 'https://www.db-z.com/',
    arrayArticle = [];

// Script Dev
var
    logFinish = function() {
        this.echo('Script Terminé !').exit()
    }

var
    processPage = function() {
        arrayArticle = this.evaluate(getDataArticle)
            // on demande a utils de nous loguer arrayLinks
        require('utils').dump(arrayArticle)
    }

function pushDataJson() {
    const
        arrayArticle = this.evaluate(getDataArticle),
        valueArrayArticles = JSON.stringify(arrayArticle, null, 2)

    fs.write('../Json/6-articleObj.json', valueArrayArticles)
}

function getDataArticle() {

    var arrayArticle = [],
        articles = document.querySelectorAll('div.penci-block-vc div.penci-block_content div.penci-block_content__items article.penci-post-item');

    for (var i = 0, article; article = articles[i]; i++) {
        var img = article.querySelector('div.penci_post_thumb a.penci-image-holder '),
            title = article.querySelector('div.penci_post_thumb div.entry-meta-item a.penci-cat-name'),
            title2 = article.querySelector(' div.penci_post_content h3.penci__post-title a'),
            auteur = article.querySelector(' div.penci_post_content div.penci-schema-markup span.author a'),
            date = article.querySelector('div.penci_post_content div.penci-schema-markup time.entry-date'),
            descript = article.querySelector('div.penci_post_content div.penci-post-excerpt'),
            articleObj = {}

        articleObj['img'] = img.getAttribute('href')
        articleObj['date'] = date.getAttribute('href')
        articleObj['title'] = title.getAttribute('href')
        articleObj['title2'] = title2.getAttribute('href')
        articleObj['title2entext'] = title2.innerText
        articleObj['auteur'] = auteur.getAttribute('href')
        articleObj['description'] = descript.innerText

        arrayArticle.push(articleObj)
    }

    return arrayArticle
}

casper.start(url)
casper.then(processPage, 5000)
casper.then(pushDataJson)
    // Et casper s'execute
casper.run(logFinish)