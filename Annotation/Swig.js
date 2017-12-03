const parameters = require('get-parameter-names');

class Swig
{
    constructor (kernel, event) {
        this._kernel = kernel;
        this._event  = event;
    }

    compile (data)
    {
        if (typeof data.value !== 'undefined') {
            data.template = data.value;
            delete data['value'];
        }

        let _swig    = this._kernel.getContainer().get('swig');
        let _class   = this._kernel.getContainer().get(data._metadata.service);

        let methodBody = _class[data._metadata.method];

        const template = this._resolve(data);
        this._event.on('before:render', (data) => {
            data.data = _swig.render(template, data.data);
        });
    }

    _resolve (data)
    {
        let _bundle = this._kernel.findBundleByService(data._metadata.service);
        let _class  = this._kernel.getContainer().get(data._metadata.service);

        if (!data.template) {
            let controller = _class.constructor.name.replace('Controller', '').toLowerCase();
            let action     = data._metadata.method.replace('Action', '').toLowerCase();

            data.template = path.join(controller, `${action}.html.twig`);
        }

        let matches = data.template.match(/@(.+):\/\/(.*)/);
        if (matches) {
            let name      = matches[1];
            let dir       = matches[2];
            data.template = path.join(this._kernel.getBundle(name).path, 'Resources', 'views', dir);
        } else {
            data.template = path.join(_bundle.path, 'Resources', 'views', data.template);
        }

        return data.template;
    }
}

module.exports = Swig;