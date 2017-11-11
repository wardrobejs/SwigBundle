const Bundle = require('@wardrobe/wardrobe').Bundle;

class SwigBundle extends Bundle
{
    static get Extension() {
        return require('./Swig/SwigExtension');
    }

    static get TokenParser() {
        return require('./Swig/TokenParser');
    }

}

module.exports = SwigBundle;