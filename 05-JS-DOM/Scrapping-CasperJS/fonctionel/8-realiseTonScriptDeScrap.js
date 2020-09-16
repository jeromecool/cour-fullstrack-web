//---------------------

const fs = require('fs')

let
    casper = require("../Casperjs/fonctionelCopy/node_modules/casper").create({
            pageSettings: {
                userAgent: "./Casperjs/website/index.html"
            }
        }

    ),
    url