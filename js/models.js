var locations = [{
        title: "Canton Brew Works",
        location: {
            lat: 42.348954,
            lng: -83.461236
        },
        address: '8521 Lilley Rd, Canton, MI 48187',
        phone: '(734) 927-7081',
        website: 'www.cantonbrewworks.com'
    }, {
        title: "Liberty Street Brewing",
        location: {
            lat: 42.379217,
            lng: -83.461315
        },
        address: '149 W Liberty St, Plymouth, MI 48170',
        phone: '(734) 207-9600',
        website: 'www.libertystreetbeer.com'
    },
    // {
    //     title: "ROAK Brewing",
    //     location: {
    //         lat: 42.482954,
    //         lng: -83.140733
    //     },
    //     address: '330 E Lincoln Ave, Royal Oak, MI 48067',
    //     phone: '(248) 268-8780',
    //     website: 'www.roakbrewing.com'
    // },
    {
        title: "Brew Detroit",
        location: {
            lat: 42.327647,
            lng: -83.061788
        },
        address: '1401 Abbott St, Detroit, MI 48216',
        phone: '(313) 974-7366 ext. 6',
        website: 'www.brewdetroit.com'
    }, {
        title: "Detroit Beer Company",
        location: {
            lat: 42.335982,
            lng: -83.048837
        },
        address: '1529 Broadway St, Detroit, MI 48226',
        phone: '(313) 962-1529',
        website: 'www.detroitbeerco.com'
    }, {
        title: "Atwater Brewery",
        location: {
            lat: 42.337356,
            lng: -83.018481
        },
        address: '237 Jos Campau, Detroit, MI 48207',
        phone: '(313) 877-9205',
        website: 'www.atwaterbeer.com'
    }
    // , {
    //     title: "Motor City Brewing",
    //     location: {
    //         lat: 42.351679,
    //         lng: -83.065960
    //     },
    //     address: '470 W Canfield St, Detroit, MI 48201',
    //     phone: '(313) 832-2700',
    //     website: 'www.motorcitybeer.com'
    // }, {
    //     title: "Blue Tractor Brewery",
    //     location: {
    //         lat: 42.280641,
    //         lng: -83.746940
    //     },
    //     address: '207 E Washington St, Ann Arbor, MI 48104',
    //     phone: '(734) 222-4095',
    //     website: 'www.bluetractor.net'
    // }, {
    //     title: "Jolly Pumpkin",
    //     location: {
    //         lat: 42.279148,
    //         lng: -83.748238
    //     },
    //     address: '311 S Main St, Ann Arbor, MI 48104',
    //     phone: '(734) 913-2730',
    //     website: 'www.jollypumpkin.com'
    // }, {
    //     title: "Arbor Brewing",
    //     location: {
    //         lat: 42.280296,
    //         lng: -83.747845
    //     },
    //     address: '114 E Washington St, Ann Arbor, MI 48104',
    //     phone: '(734) 213-1393',
    //     website: 'www.arborbrewing.com'
    // }, {
    //     title: "Glass House",
    //     location: {
    //         lat: 42.274091,
    //         lng: -83.779037
    //     },
    //     address: '2350 W Liberty Rd, Ann Arbor, MI 48103',
    //     phone: '(734) 436-8847',
    //     website: 'www.glasshousebrewing.com'
    // }, {
    //     title: "Wolverine State Brewing Co",
    //     location: {
    //         lat: 42.269681,
    //         lng: -83.774472
    //     },
    //     address: '2019 W Stadium Blvd, Ann Arbor, MI 48103',
    //     phone: '(734) 369-2990',
    //     website: 'www.wolverinebeer.com'
    // }, {
    //     title: "HOMES Brewery",
    //     location: {
    //         lat: 42.280273,
    //         lng: -83.778457
    //     },
    //     address: '2321 Jackson Ave, Ann Arbor, MI 48103',
    //     phone: '(734) 954-6637',
    //     website: 'www.homesbrewery.com'
    // }, {
    //     title: "Grizzly Peak Brewing Co",
    //     location: {
    //         lat: 42.280716,
    //         lng: -83.749565
    //     },
    //     address: '120 W Washington St, Ann Arbor, MI 48104',
    //     phone: '(734) 741-7325',
    //     website: 'www.grizzlypeak.net'
    // }, {
    //     title: "Stony Lake Brewing Co",
    //     location: {
    //         lat: 42.170798,
    //         lng: -83.772459
    //     },
    //     address: '447 E Michigan Ave, Saline, MI 48176',
    //     phone: '(734) 316-7919',
    //     website: 'www.stonylakebrewing.com'
    // }, {
    //     title: "The Corner Brewery",
    //     location: {
    //         lat: 42.250253,
    //         lng: -83.609981
    //     },
    //     address: '720 Norris St, Ypsilanti, MI 48198',
    //     phone: '(734) 480-2739',
    //     website: 'www.arborbrewing.com'
    // }, {
    //     title: "Hopcat",
    //     location: {
    //         lat: 42.278930,
    //         lng: -83.741635
    //     },
    //     address: '311 Maynard St, Ann Arbor, MI 48104',
    //     phone: '(734) 436-2875',
    //     website: 'www.hopcat.com'
    // }, {
    //     title: "Salt Springs Brewery",
    //     location: {
    //         lat: 42.165879,
    //         lng: -83.780447
    //     },
    //     address: '117 S Ann Arbor St, Saline, MI 48176',
    //     phone: '(734) 295-9191',
    //     website: 'www.saltspringsbrewery.com'
    // }, {
    //     title: "Batch Brewing Company",
    //     location: {
    //         lat: 42.328527,
    //         lng: -83.063352
    //     },
    //     address: '1400 Porter St, Detroit, MI 48216',
    //     phone: '(313) 338-8008',
    //     website: 'www.batchbrewingcompany.com'
    // }, {
    //     title: "Witch's Hat Brewing ",
    //     location: {
    //         lat: 42.454514,
    //         lng: -83.650345
    //     },
    //     address: '601 S Lafayette St, South Lyon, MI 48178',
    //     phone: '(248) 486-2595',
    //     website: 'www.witchshatbrewing.com'
    // }
]