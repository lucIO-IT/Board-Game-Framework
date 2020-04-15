const controllers = {
    raise_troops: function (region, faction) {
        return region.raise_troops(faction);
    },
    incrase_defence: function (region, faction) {
        return region.incrase_defence(faction);
    },
}

export {controllers}