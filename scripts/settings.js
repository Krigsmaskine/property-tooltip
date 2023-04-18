const moduleName = 'property-tooltip';
export function registerSettings() {
    game.settings.register(moduleName, 'Weapon Properties Source', {
        'name': 'Weapon Properties Source',
        'hint': 'The UUID of a journal entry containing weapon properties for the module to fill tooltips with. See the Properties/Instruction page in the Property Tooltip compendium for more info.',
        'scope': 'world',
        'config': true,
        'type': String,
        'default': "Compendium.property-tooltip.property tooltip.CjhPaYRIDdcFd7No",
        'onChange': async value => {
            if (!(await fromUuid(value))) {
                ui.notifications.error("Property Tooltip: The provided Uuid cannot be found, resetting to default.")
                await game.settings.set("property-tooltip", "Weapon Properties Source", "Compendium.property-tooltip.property tooltip.CjhPaYRIDdcFd7No");
            }
        }
    });
};

