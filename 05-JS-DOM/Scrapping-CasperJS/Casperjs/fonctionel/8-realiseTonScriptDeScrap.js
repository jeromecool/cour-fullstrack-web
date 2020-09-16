//---------------------

const fs = require('fs')

let
    casper = require("casper").create({
            pageSettings: {
                userAgent: "./Casperjs/website/index.html"
            }
        }

    ),
    url