const path = require('path')
const zipper = require('epub-zipper')
console.log(zipper.create);

const options = {
    input: path.join(__dirname, './EbookTest1'),
    output: __dirname,
    clean: true
}
//zipper.create(options).catch(err => console.error(err))