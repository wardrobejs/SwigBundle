class TokenParser
{
    constructor ()
    {
        this.ends       = false;
        this.blockLevel = false;
    }

    getTag ()
    {
        throw new Error(this, 'getTag(): string');
    }

    parse ()
    {
        throw new Error(this, 'parse(str, line, parser, types, options)');
    }

    compile ()
    {
        throw new Error(this, 'compile(compiler, args, content, parents, options, blockName)');
    }

}

module.exports = TokenParser;