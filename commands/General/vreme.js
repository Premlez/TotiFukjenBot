const { Command } = require('klasa');
const fetch = require('node-fetch');
const qs = require('querystring');

class Vreme extends Command {

    static kMBLat = '46.554649';
    static kMBLon = '15.645881';

    constructor(store, directory, files) {

        super(store, directory, files, {
            guarded: true,
            description: 'Vreme za Maribor, cuj',
        });
    }

    async run(message) {

        const params = qs.stringify({
            lat: Vreme.kMBLat,
            lon: Vreme.kMBLon,
        });

        //const data = await fetch(`https://opendata.si/vreme/report/?${params}`);
        //console.log(await data.json());
        const data = await (await fetch(`https://opendata.si/vreme/report/?${params}`)).json(); //To združi zogrnji dve komandi
        console.log(data);

        return message.send(mb => //Embeded sporočilo
            mb.setEmbed(em => 
                em
                    .setTitle('Vreme - Maribor')
                    .setDescription('Prikazujem samo Maribor. Če ti kaj ni prav, se poj jokat. Se mi prav nič ne smiliš.')
                    .setColor(0x2d006b)
        ));
    }

}

exports.default = Vreme;