import {registerSettings} from './settings.js';

Hooks.once('init', async function () {
    registerSettings();
});

Hooks.once('ready', async function () {

});


Hooks.on("renderItemSheet5e", async (sheet, html) => {
    // We only show weapon properties.
    if (sheet.object.type != "weapon") return;

    // Convert CONFIG.DND5E.weaponProperties to an array so I can iterate through it easier.
    const weaponProperties = Object.entries(CONFIG.DND5E.weaponProperties);
    const weaponTooltips = await fromUuid(game.settings.get('property-tooltip', 'Weapon Properties Source'));

    weaponProperties.forEach(function (item, index) {
        const el = html[0].querySelector(`input[name="system.properties.${item[0]}"]`);

        const name = el.name;
        const parent = el.parentElement;

        if (!weaponTooltips.pages.find(p => p.name == `${item[1]}`)) return;

        parent.addEventListener('mouseover', async event => {
            // The lovely regex is to strip it for HTML tags. Need to handle that better in the future.
            const content = weaponTooltips.pages.find(p => p.name == `${item[1]}`).text.content.replace(/<\/?[^>]+(>|$)/g, "");
            game.tooltip.activate(parent, { text: content, direction: TooltipManager.TOOLTIP_DIRECTIONS.UP, cssClass: 'my-special-tooltip' });
        });

        parent.addEventListener('mouseout', event => game.tooltip.deactivate());

    });
});

