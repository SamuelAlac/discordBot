const { CheerioWebBaseLoader } = require('@langchain/community/document_loaders/web/cheerio')

const webLoader = (url) =>{
    const loader = new CheerioWebBaseLoader(url)

    return loader.load();
}

module.exports = { webLoader };