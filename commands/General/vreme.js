const { Command } = require('klasa');
const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');

class Vreme extends Command {

    constructor(store, directory, files) {

        super(store, directory, files, {
            guarded: true,
            description: 'Vreme za Maribor, cuj',
        });
    }

    async run(message) {

        //const data = await fetch(`https://opendata.si/vreme/report/?${params}`);
        //console.log(await data.json());
        const dataxml = await (await fetch('https://meteo.arso.gov.si/uploads/probase/www/observ/surface/text/sl/observationAms_MARIBOR_VRBAN-PLA_latest.xml')).text(); //To združi zogrnji dve komandi
        const { data: { metData: [ data ] } } = await parseStringPromise(dataxml);
        //console.log(data); //Outputs API to console  -- FOR DEBUGGING

        return message.send(mb => //Embeded sporočilo
            mb.setEmbed(em => 
                em
                    .setTitle('Vreme - Maribor')
                    //.setDescription('Vreme za Maribor, čuj. Pazi se Tajzija, da ti ga ne pajsne, go hodiš naked okoli, dumbass.')
                    .setColor(0x007bff) //Stranska barva
                    .setURL('http://vreme.arso.gov.si/napoved/Maribor/graf') //URL na title
                    .setImage(`https://meteo.arso.gov.si/uploads/probase/www/observ/webcam/${data.webcam[0]._}`) //Webcam slika
                    /* ---POSODOBITVENI PODATKI O VREMENSKI POSTAJI---*/
                    .addField('Naziv vremenske postaje:', data.domain_title[0], true)
                    .addField('Zadnja posodobitev:', data.tsUpdated[0], true)
                    /* ---TRENUTNO STANJE PODATKOV NA POSTAJI--- */
                    //.addField('\u200B', 'Trenutno stanje:')
                    .addField('Temperatura:', `${data.t[0]}°C`)
                    .addField('Relativna vlažnost:', `${data.rh[0]}%`)
                    .addField('Hitrost vetra:', `${data.ff_val_kmh} km/h`)
                    .addField('Višina snežne odeje:', `${data.snow[0]} cm`)
                    .addField('Temperatura tal v globini 5 cm:', `${data.tg_5_cm[0]}°C`)
        ));
    }

}

exports.default = Vreme;