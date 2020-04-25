Hooks.once("ready", async function () {

    game.dnd5e.Actor5e.prototype.convertCurrency = function () {
        const curr = duplicate(this.data.data.currency);

        const convert = {
            cp: { into: 'sp', each: 10 },
            sp: { into: 'gp', each: 10 },
            ep: { into: 'gp', each: 2 },
            pp: { into: 'gp', each: 0.1 }
        };

        for (let [c, t] of Object.entries(convert)) {
            let change = Math.floor(curr[c] / t.each);
            curr[c] -= (change * t.each);
            curr[t.into] += change;
        }

        return this.update({ 'data.currency': curr });
    };

});