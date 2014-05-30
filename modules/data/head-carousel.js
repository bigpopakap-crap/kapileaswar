var Image = require('../classes/Image.js');

/*
 * TODO use actual images here
 */
var data = [
    new Image('https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xfa1/t1.0-9/179348_3318789688544_2057380854_n.jpg', {
    	alt: 'All my friends with me at graduation!',
    	centerx: 15,
    	centery: 45
    }),
    
    new Image('https://scontent-a-sjc.xx.fbcdn.net/hphotos-xaf1/t1.0-9/254790_3821101686030_1897742389_n.jpg', {
    	alt: 'Moved to San Francisco!',
    	centerx: 70,
    	centery: 75
    }),
    
    new Image('https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xpa1/t1.0-9/14466_10200342935475976_690535714_n.jpg', {
    	alt: 'Movies at Dolores Park',
    	centerx: 50,
    	centery: 60
    })
]

module.exports = data;