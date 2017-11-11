const DI = require('@wardrobe/wardrobe').DI;

class SetSwigRenderer extends DI.AbstractCompilerPass
{
    compile (container)
    {
        let service_ids = container.findTaggedServiceIds('swig');
        service_ids.forEach((id) => {
            if(typeof container.getDefinition === 'undefined') {
                container.get(id).setRenderer(container.get('swig'));
                return;
            }
            container.getDefinition(id).addMethodCall('setRenderer', ['@swig']);
        });
    }
}

module.exports = SetSwigRenderer;