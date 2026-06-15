// ==UserScript==
// @name         Kirka Texture Swapper+Knife Only
// @version      1.8.2
// @description  Texture swap + Knife Only.  CTRL+O menu.
// @author       npa
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1328040337393975322/ShowOnlyKnife.js
// ==/UserScript==

(function () {
    'use strict';

    const VM_VERSION = '1.8.2';

    const _gc = HTMLCanvasElement.prototype.getContext;
    const alreadyHooked = !!(_gc && _gc.__m);

    // melee texture lists (knife-only mode + some swappable)

    const TOMAHAWK_TEXTURES = [
        'texture.397a3f05.webp', // Default(toma)
        'texture.8ed8e0b2.webp', // Void(toma)
        'texture.35a5d845.webp', // Shit(toma)
        'texture.88ae76fa.webp', // Alucard
        'texture.0906ce32.webp', // Blast(toma)
        'texture.8ba45f73.webp', // Dragonic(toma)
        'texture.71135d5a.webp', // Reactor
        'texture.6768bccd.webp', // Damascus
        'texture.88aaf4d2.webp', // Stingray
        'texture.428f6c8a.webp', // Capricorn
        'texture.65314bed.webp', // HotRod
        'texture.8506219b.webp', // Cherry
        'texture.b2d07fa3.webp', // Noxious
        'texture.e1d793e4.webp', // Glace
        'texture.ef08a8e8.webp', // Scalped
        'texture.a4782cf0.webp', // Hopeless
        'texture.f2375ac3.webp', // Tici
        'texture.ac105d0f.webp', // StarDust
        'texture.f0d17401.webp', // Gloopahawk
        'texture.12920012.webp', // Cyber Smite
        'texture.43c02dda.webp', // Mintique Tomahawk
        'texture.919bf21f.webp', // Supernova
        'texture.24036079.webp', // Worn Tomahawk
        'texture.138b8182.webp', // Snake
        'texture.b095be8d.webp', // Jungle
        'texture.0d7ba3af.webp', // Iris
        'texture.f5027930.webp', // HoneyComb
        'texture.56f2b41d.webp', // Crude
        'texture.1351a8bd.webp', // Comic Tomahawk
        'texture.719d1dbf.webp', // Cartoon Tomahawk
        'texture.e54330dc.webp', // Abstract
		'texture.49d097f2.webp', // Cyber Tomahawk
    ];

    const BAYONET_TEXTURES = [
        'texture.76c24e59.webp', // Default(bayonet)
        'texture.c56dd194.webp', // Antique
        'texture.93c2ef17.webp', // Honey
        'texture.ec42bd6d.webp', // Void(bayonet)
        'texture.cb2eec3e.webp', // Gardener
        'texture.796d0aa8.webp', // Hypnotic
        'texture.81c3b633.webp', // Ice Breaker
        'texture.8c0d6fd3.webp', // Ritual
        'texture.2e5a9caa.webp', // Twilight
        'texture.095db02c.webp', // Shit(bayonet)
        'texture.20df26d0.webp', // 2026 Bayonet
        'texture.f201b63c.webp', // Lustre
        'texture.42de6109.webp', // CYB3ER
        'texture.3b3ccc54.webp', // FlareFang
        'texture.0d627beb.webp', // Anarch
        'texture.6b6deb97.webp', // Charmed
        'texture.879963be.webp', // Blast(bayonet)
        'texture.3c88c1cd.webp', // Or
        'texture.6505bfe0.webp', // Punji
        'texture.fdf63403.webp', // Dragonic(bayonet)
        'texture.86751ae0.webp', // Eruption
        'texture.42e20418.webp', // Love Bites
        'texture.6c337e43.webp', // Koi
        'texture.d21aad57.webp', // Eci
        'texture.6c982378.webp', // Cornfeild
        'texture.6a2e03e5.webp', // Jade
        'texture.2d9358f1.webp', // Retro
        'texture.02854200.webp', // 2024
        'texture.7053eab7.webp', // Drake
        'texture.7ddc569a.webp', // Alighted
        'texture.aa8083d7.webp', // Apple
        'texture.eb218563.webp', // Prism
        'texture.425b0f4c.webp', // Chromium
        'texture.3293e221.webp', // BubblePop
        'texture.e8df4123.webp', // Tiburon
        'texture.692fc493.webp', // Ranked_S4 Top10
        'texture.34030475.webp', // Psychedelic
        'texture.092946a2.webp', // Rift
        'texture.f90a7614.webp', // Reflections
        'texture.5f4dfc15.webp', // Ranked_S4 Top100
        'texture.d9b571a7.webp', // CV01
        'texture.0c3e145e.webp', // BlackHole
        'texture.09998c00.webp', // Luminescent
        'texture.25337fa6.webp', // Forge
        'texture.9c950380.webp', // Bled
        'texture.7d987fe7.webp', // Zen
        'texture.05622ddb.webp', // Ranked_S3 Top10
        'texture.09652c4c.webp', // Ranked_S1 Top10
		'texture.940fb392.webp', // Ranked_S2 Top10
		'texture.9a2ba588.webp', // Ranked_S1 Silver
		'texture.337d4c72.webp', // Ranked_S2 Silver
        'texture.ce106229.webp', // Ranked_S3 Silver
		'texture.36ea80c4.webp', // Ranked_S1 Gold
		'texture.38a7cde8.webp', // Ranked_S2 Gold
		'texture.ed4679c6.webp', // Ranked_S4 Gold
		'texture.31c7afd4.webp', // Ranked_S3 Gold
		'texture.4ff918f4.webp', // Ranked_S4 Silver
		'texture.980c5719.webp', // Ranked_S4 Bronze
		'texture.41b9ab29.webp', // Ranked_S3 Bronze
		'texture.071fdd68.webp', // Ranked_S2 Bronze
		'texture.34a9f648.webp', // Ranked_S1 Bronze
        'texture.39f1bb44.webp', // Electra
        'texture.dc76627e.webp', // Cane
        'texture.3c1c1d8a.webp', // 22
        'texture.3afc455f.webp', // Old
        'texture.c7965f06.webp', // Butterflies
		'texture.f8fdb8b4.webp', // Easter
		'texture.916f12b4.webp', // Radioactive
		'texture.54efdeac.webp', // Rebel
		'texture.3c3e7f7e.webp', // Kin
		'texture.8465ee39.webp', // Wrapping
		'texture.31331ee4.webp', // Beach
		'texture.0516c979.webp', // Gold Coins
		'texture.b37589dc.webp', // Vapor
		'texture.9478f861.webp', // Tradition
		'texture.23b9555e.webp', // Glance
		'texture.f9907930.webp', // Shard
		'texture.7bda431f.webp', // Lashes
		'texture.dbd62944.webp', // Vampire
		'texture.7330acc2.webp', // Champion
		'texture.e7c26331.webp', // Worn Bayonet
		'texture.d629c96c.webp', // Tyrant2
		'texture.7a3706a3.webp', // Vision
		'texture.65a361a9.webp', // Thunder
		'texture.475bc8d4.webp', // Tidal
		'texture.0f3cf451.webp', // Sapphire
		'texture.c22d628d.webp', // Saphire
		'texture.77602579.webp', // Solstice
		'texture.458d5cdc.webp', // Prismatic
		'texture.8a28ebec.webp', // Heat
		'texture.90f2f8d8.webp', // Mintique Bayonet
		'texture.a09a31bd.webp', // Glitch
		'texture.72f8f241.webp', // Glooplate
		'texture.c5b78cf7.webp', // Fumes
		'texture.bf80c032.webp', // Galactic
		'texture.d607631a.webp', // Flowy
		'texture.b254099f.webp', // Femboy
		'texture.070e8fac.webp', // Chocowaffle
		'texture.9de19189.webp', // Comic Bayonet
		'texture.77e1e295.webp', // Bunnies
		'texture.7540514d.webp', // Cartoon Bayonet
		'texture.cae40b42.webp', // Bambi
		'texture.1db80476.webp', // Bolt
		'texture.7b45cc84.webp', // Action
		'texture.cd5e52ad.webp', // Turle
		'texture.d52d0780.webp', // Undead
		'texture.76cf863f.webp', // Ornaments
		'texture.f9db8bb0.webp', // Icing
		'texture.c41b6bb6.webp', // Heather
		'texture.47cab826.webp', // Eclipse
		'texture.8060ab6e.webp', // Streaks
		'texture.cc279290.webp', // Alpha
		'texture.e8493f6a.webp', // Eggs
		'texture.c4fda2f6.webp', // Hot Rod
		'texture.41164069.webp', // 2025 Bayonet
		'texture.08379d8a.webp', // Nerida
		'texture.bd9a7f52.webp', // Cyber Bayonet
		'texture.f3b92124.webp', // Hotrod Bayonet
		'texture.9588750d.webp', // Polygon
		'texture.58ec980e.webp', // Pencil
		'texture.7aff8e6c.webp', // Firecracker
		'texture.8176e357.webp', // Caring
		'texture.e04bb966.webp', // Pyrite
		'texture.137fe530.webp', // Tyrant
		'texture.750b0963.webp', // Glitter
		'texture.aba9d9c1.webp', // Lucky
		'texture.a2838521.webp', // Bloo
		'texture.72b09167.webp', // Infarction
		'texture.08575901.webp', // Placate
		'texture.b10da164.webp', // Spring
		'texture.0313bdc8.webp', // Sunday
		'texture.24c8965d.webp', // Ranked_S3 Top100
		'texture.ce1daf47.webp', // Splash
		'texture.5db7e15a.webp', // Bone
		'texture.340800bb.webp', // Ranked_S1 Top100
		'texture.2feb8f60.webp', // Loved
		'texture.07fe5d3d.webp', // Archverse
		'texture.ca74820f.webp', // Clownicidal
		'texture.054a47d3.webp', // Faded
		'texture.5394ef01.webp', // Candle
		'texture.f27c6b0b.webp', // Cryptex
		'texture.c6d21d01.webp', // Flaming
		'texture.dfad0879.webp', // Verde
		'texture.979d7856.webp', // Shank
		'texture.ac7b8455.webp', // Vibrant
		'texture.490c7963.webp', // Immortal
		'texture.91b6942b.webp', // Saurus
		'texture.0d0e6afa.webp', // New
    ];

    // skins available in swapper dropdown

    const SWAPPABLE_BAYONET_SKINS = {
        none: 'Equipped Skin',
        'texture.34030475.webp': 'Psychedelic',
        'texture.0c3e145e.webp': 'BlackHole',
		'texture.c56dd194.webp': 'Antique',
        'texture.25337fa6.webp': 'Forge',
        'texture.09998c00.webp': 'Luminescent',
        'texture.eb218563.webp': 'Prism',
        'texture.9c950380.webp': 'Bled',
        'texture.7d987fe7.webp': 'Zen',
		'texture.0d0e6afa.webp': 'New',
		'texture.490c7963.webp': 'Immortal',
		'texture.940fb392.webp': 'Ranked_S2 Top10',
        'texture.05622ddb.webp': 'Ranked_S3 Top10',
		'texture.24c8965d.webp': 'Ranked_S3 Top100',
        'texture.09652c4c.webp': 'Ranked_S1 Top10',
		'texture.340800bb.webp': 'Ranked_S1 Top100',
        'texture.692fc493.webp': 'Ranked_S4 Top10',
        'texture.5f4dfc15.webp': 'Ranked_S4 Top100',
		'texture.34a9f648.webp': 'Ranked_S1 Bronze',
		'texture.071fdd68.webp': 'Ranked_S2 Bronze',
		'texture.41b9ab29.webp': 'Ranked_S3 Bronze',
		'texture.980c5719.webp': 'Ranked_S4 Bronze',
		'texture.9a2ba588.webp': 'Ranked_S1 Silver',
		'texture.337d4c72.webp': 'Ranked_S2 Silver',
        'texture.ce106229.webp': 'Ranked_S3 Silver',
		'texture.4ff918f4.webp': 'Ranked_S4 Silver',
		'texture.ed4679c6.webp': 'Ranked_S4 Gold',
		'texture.31c7afd4.webp': 'Ranked_S3 Gold',
		'texture.38a7cde8.webp': 'Ranked_S2 Gold',
		'texture.36ea80c4.webp': 'Ranked_S1 Gold',
        'texture.39f1bb44.webp': 'Electra',
        'texture.dc76627e.webp': 'Cane',
        'texture.3c1c1d8a.webp': '22',
        'texture.3afc455f.webp': 'Old',
        'texture.c7965f06.webp': 'Butterflies',
		'texture.f8fdb8b4.webp': 'Easter',
		'texture.916f12b4.webp': 'Radioactive',
		'texture.54efdeac.webp': 'Rebel',
		'texture.3c3e7f7e.webp': 'Kin',
		'texture.8465ee39.webp': 'Wrapping',
		'texture.979d7856.webp': 'Shank',
		'texture.31331ee4.webp': 'Beach',
		'texture.7330acc2.webp': 'Champion',
		'texture.e7c26331.webp': 'Worn Bayonet',
		'texture.d629c96c.webp': 'Tyrant2',
		'texture.7a3706a3.webp': 'Vision',
		'texture.65a361a9.webp': 'Thunder',
		'texture.475bc8d4.webp': 'Tidal',
		'texture.0f3cf451.webp': 'Sapphire',
		'texture.c22d628d.webp': 'Saphire',
		'texture.77602579.webp': 'Solstice',
		'texture.458d5cdc.webp': 'Prismatic',
		'texture.8a28ebec.webp': 'Heat',
		'texture.90f2f8d8.webp': 'Mintique Bayonet',
		'texture.a09a31bd.webp': 'Glitch',
		'texture.72f8f241.webp': 'Glooplate',
		'texture.c5b78cf7.webp': 'Fumes',
		'texture.bf80c032.webp': 'Galactic',
		'texture.d607631a.webp': 'Flowy',
		'texture.b254099f.webp': 'Femboy',
		'texture.070e8fac.webp': 'Chocowaffle',
		'texture.9de19189.webp': 'Comic Bayonet',
		'texture.77e1e295.webp': 'Bunnies',
		'texture.7540514d.webp': 'Cartoon Bayonet',
		'texture.cae40b42.webp': 'Bambi',
		'texture.1db80476.webp': 'Bolt',
		'texture.7b45cc84.webp': 'Action',
		'texture.f3b92124.webp': 'Hotrod Bayonet',
		'texture.58ec980e.webp': 'Pencil',
		'texture.7aff8e6c.webp': 'Firecracker',
		'texture.aba9d9c1.webp': 'Lucky',
		'texture.a2838521.webp': 'Bloo',
		'texture.b10da164.webp': 'Spring',
		'texture.0313bdc8.webp': 'Sunday',
		'texture.ce1daf47.webp': 'Splash',
		'texture.5db7e15a.webp': 'Bone',
		'texture.2feb8f60.webp': 'Loved',
		'texture.07fe5d3d.webp': 'Archverse',
		'texture.ca74820f.webp': 'Clownicidal',
		'texture.054a47d3.webp': 'Faded',
		'texture.f27c6b0b.webp': 'Cryptex',
		'texture.c6d21d01.webp': 'Flaming',
		'texture.3293e221.webp': 'Bubblepop',
		'texture.dfad0879.webp': 'Verde',
		'texture.ac7b8455.webp': 'Vibrant',
		'texture.91b6942b.webp': 'Saurus',
    };

    const SWAPPABLE_TOMAHAWK_SKINS = {
        none: 'Equipped Skin',
        'texture.88aaf4d2.webp': 'Stingray',
        'texture.65314bed.webp': 'HotRod',
        'texture.8506219b.webp': 'Cherry',
        'texture.b2d07fa3.webp': 'Noxious',
        'texture.e1d793e4.webp': 'Glace',
        'texture.ef08a8e8.webp': 'Scalped',
        'texture.a4782cf0.webp': 'Hopeless',
        'texture.f2375ac3.webp': 'Tici',
        'texture.ac105d0f.webp': 'StarDust',
        'texture.f0d17401.webp': 'Gloopahawk',
        'texture.12920012.webp': 'Cyber Smite',
        'texture.43c02dda.webp': 'Mintique Tomahawk',
        'texture.919bf21f.webp': 'Supernova',
        'texture.24036079.webp': 'Worn Tomahawk',
        'texture.138b8182.webp': 'Snake',
        'texture.b095be8d.webp': 'Jungle',
        'texture.0d7ba3af.webp': 'Iris',
        'texture.f5027930.webp': 'HoneyComb',
        'texture.56f2b41d.webp': 'Crude',
        'texture.1351a8bd.webp': 'Comic Tomahawk',
        'texture.719d1dbf.webp': 'Cartoon Tomahawk',
        'texture.e54330dc.webp': 'Abstract',
		'texture.49d097f2.webp': 'Cyber Tomahawk',
    };

    const TEXTURE_CDN = 'https://kirka.io/assets/img/';

    const SKIN_RARITY = {
        'texture.397a3f05.webp': 'Common',
        'texture.8ed8e0b2.webp': 'Mythical',
        'texture.35a5d845.webp': 'Mythical',
        'texture.88ae76fa.webp': 'Mythical',
        'texture.0906ce32.webp': 'Mythical',
        'texture.8ba45f73.webp': 'Mythical',
        'texture.71135d5a.webp': 'Mythical',
        'texture.6768bccd.webp': 'Mythical',
        'texture.88aaf4d2.webp': 'Mythical',
        'texture.428f6c8a.webp': 'Mythical',
        'texture.65314bed.webp': 'Mythical',
        'texture.8506219b.webp': 'Mythical',
        'texture.b2d07fa3.webp': 'Mythical',
        'texture.e1d793e4.webp': 'Mythical',
        'texture.ef08a8e8.webp': 'Mythical',
        'texture.a4782cf0.webp': 'Mythical',
        'texture.f2375ac3.webp': 'Mythical',
        'texture.ac105d0f.webp': 'Mythical',
        'texture.f0d17401.webp': 'Mythical',
        'texture.12920012.webp': 'Mythical',
        'texture.43c02dda.webp': 'Mythical',
        'texture.919bf21f.webp': 'Mythical',
        'texture.24036079.webp': 'Mythical',
        'texture.138b8182.webp': 'Mythical',
        'texture.b095be8d.webp': 'Mythical',
        'texture.0d7ba3af.webp': 'Mythical',
        'texture.f5027930.webp': 'Mythical',
        'texture.56f2b41d.webp': 'Mythical',
        'texture.1351a8bd.webp': 'Mythical',
        'texture.719d1dbf.webp': 'Mythical',
        'texture.e54330dc.webp': 'Mythical',
        'texture.76c24e59.webp': 'Common',
        'texture.c56dd194.webp': 'Paranormal',
        'texture.93c2ef17.webp': 'Mythical',
        'texture.ec42bd6d.webp': 'Mythical',
        'texture.cb2eec3e.webp': 'Mythical',
        'texture.796d0aa8.webp': 'Mythical',
        'texture.81c3b633.webp': 'Mythical',
        'texture.8c0d6fd3.webp': 'Mythical',
        'texture.2e5a9caa.webp': 'Mythical',
        'texture.095db02c.webp': 'Mythical',
        'texture.20df26d0.webp': 'Mythical',
        'texture.f201b63c.webp': 'Mythical',
        'texture.42de6109.webp': 'Mythical',
        'texture.3b3ccc54.webp': 'Mythical',
        'texture.0d627beb.webp': 'Mythical',
        'texture.6b6deb97.webp': 'Mythical',
        'texture.879963be.webp': 'Mythical',
        'texture.3c88c1cd.webp': 'Mythical',
        'texture.6505bfe0.webp': 'Mythical',
        'texture.fdf63403.webp': 'Mythical',
        'texture.86751ae0.webp': 'Mythical',
        'texture.42e20418.webp': 'Mythical',
        'texture.6c337e43.webp': 'Mythical',
        'texture.d21aad57.webp': 'Mythical',
        'texture.6c982378.webp': 'Mythical',
        'texture.6a2e03e5.webp': 'Mythical',
        'texture.2d9358f1.webp': 'Mythical',
        'texture.02854200.webp': 'Mythical',
        'texture.7053eab7.webp': 'Mythical',
        'texture.7ddc569a.webp': 'Mythical',
        'texture.aa8083d7.webp': 'Legendary',
        'texture.eb218563.webp': 'Mythical',
        'texture.425b0f4c.webp': 'Mythical',
        'texture.3293e221.webp': 'Mythical',
        'texture.e8df4123.webp': 'Mythical',
        'texture.692fc493.webp': 'Mythical',
        'texture.34030475.webp': 'Paranormal',
        'texture.092946a2.webp': 'Mythical',
        'texture.f90a7614.webp': 'Mythical',
        'texture.5f4dfc15.webp': 'Mythical',
        'texture.d9b571a7.webp': 'Mythical',
        'texture.0c3e145e.webp': 'Paranormal',
        'texture.09998c00.webp': 'Mythical',
        'texture.25337fa6.webp': 'Legendary',
        'texture.9c950380.webp': 'Legendary',
        'texture.7d987fe7.webp': 'Legendary',
        'texture.05622ddb.webp': 'Mythical',
        'texture.09652c4c.webp': 'Mythical',
        'texture.ce106229.webp': 'Mythical',
        'texture.39f1bb44.webp': 'Mythical',
        'texture.dc76627e.webp': 'Epic',
        'texture.3c1c1d8a.webp': 'Epic',
        'texture.3afc455f.webp': 'Legendary',
        'texture.c7965f06.webp': 'Legendary',
		'texture.f8fdb8b4.webp': 'Legendary',
		'texture.916f12b4.webp': 'Legendary',
		'texture.54efdeac.webp': 'Legendary',
		'texture.3c3e7f7e.webp': 'Legendary',
		'texture.8465ee39.webp': 'Legendary',
		'texture.31331ee4.webp': 'Legendary',
		'texture.0516c979.webp': 'Legendary',
		'texture.b37589dc.webp': 'Legendary',
		'texture.9478f861.webp': 'Legendary',
		'texture.7330acc2.webp': 'Legendary',
		'texture.e7c26331.webp': 'Mythical',
		'texture.d629c96c.webp': 'Mythical',
		'texture.7a3706a3.webp': 'Mythical',
		'texture.65a361a9.webp': 'Mythical',
		'texture.475bc8d4.webp': 'Mythical',
		'texture.0f3cf451.webp': 'Mythical',
		'texture.77602579.webp': 'Mythical',
		'texture.c22d628d.webp': 'Mythical',
		'texture.458d5cdc.webp': 'Mythical',
		'texture.8a28ebec.webp': 'Mythical',
		'texture.90f2f8d8.webp': 'Mythical',
		'texture.a09a31bd.webp': 'Mythical',
		'texture.72f8f241.webp': 'Mythical',
		'texture.c5b78cf7.webp': 'Mythical',
		'texture.bf80c032.webp': 'Mythical',
		'texture.d607631a.webp': 'Mythical',
		'texture.b254099f.webp': 'Paranormal',
		'texture.070e8fac.webp': 'Mythical',
		'texture.9de19189.webp': 'Mythical',
		'texture.77e1e295.webp': 'Mythical',
		'texture.7540514d.webp': 'Mythical',
		'texture.cae40b42.webp': 'Mythical',
		'texture.1db80476.webp': 'Mythical',
		'texture.7b45cc84.webp': 'Mythical',
		'texture.cd5e52ad.webp': 'Mythical',
		'texture.d52d0780.webp': 'Mythical',
		'texture.76cf863f.webp': 'Mythical',
		'texture.f9db8bb0.webp': 'Mythical',
		'texture.c41b6bb6.webp': 'Mythical',
		'texture.47cab826.webp': 'Mythical',
		'texture.8060ab6e.webp': 'Mythical',
		'texture.cc279290.webp': 'Mythical',
		'texture.e8493f6a.webp': 'Mythical',
		'texture.c4fda2f6.webp': 'Mythical',
		'texture.41164069.webp': 'Mythical',
		'texture.08379d8a.webp': 'Mythical',
		'texture.bd9a7f52.webp': 'Mythical',
		'texture.f3b92124.webp': 'Mythical',
		'texture.9588750d.webp': 'Mythical',
		'texture.58ec980e.webp': 'Mythical',
		'texture.7aff8e6c.webp': 'Mythical',
		'texture.8176e357.webp': 'Mythical',
		'texture.e04bb966.webp': 'Mythical',
		'texture.137fe530.webp': 'Mythical',
		'texture.750b0963.webp': 'Mythical',
		'texture.aba9d9c1.webp': 'Mythical',
		'texture.a2838521.webp': 'Mythical',
		'texture.72b09167.webp': 'Mythical',
		'texture.08575901.webp': 'Mythical',
		'texture.b10da164.webp': 'Mythical',
		'texture.0313bdc8.webp': 'Mythical',
		'texture.24c8965d.webp': 'Mythical',
		'texture.ce1daf47.webp': 'Mythical',
		'texture.5db7e15a.webp': 'Mythical',
		'texture.340800bb.webp': 'Mythical',
		'texture.2feb8f60.webp': 'Mythical',
		'texture.07fe5d3d.webp': 'Mythical',
		'texture.ca74820f.webp': 'Mythical',
		'texture.054a47d3.webp': 'Mythical',
		'texture.5394ef01.webp': 'Mythical',
		'texture.f27c6b0b.webp': 'Mythical',
		'texture.c6d21d01.webp': 'Mythical',
		'texture.dfad0879.webp': 'Mythical',
		'texture.979d7856.webp': 'Mythical',
		'texture.ac7b8455.webp': 'Mythical',
		'texture.490c7963.webp': 'Mythical',
		'texture.ed4679c6.webp': 'Mythical',
		'texture.980c5719.webp': 'Mythical',
		'texture.41b9ab29.webp': 'Mythical',
		'texture.31c7afd4.webp': 'Mythical',
		'texture.337d4c72.webp': 'Mythical',
		'texture.940fb392.webp': 'Mythical',
		'texture.071fdd68.webp': 'Mythical',
		'texture.38a7cde8.webp': 'Mythical',
		'texture.9a2ba588.webp': 'Mythical',
		'texture.36ea80c4.webp': 'Mythical',
		'texture.34a9f648.webp': 'Mythical',
		'texture.91b6942b.webp': 'Mythical',
		'texture.0d0e6afa.webp': 'Mythical',
		'texture.49d097f2.webp': 'Mythical',
    };

    const RARITY_STYLES = {
        Common: { bg: '#6fd08c', border: '#1a1a1a', text: '#fff', shadow: '0 1px 2px rgba(0,0,0,0.85)' },
        Mythical: { bg: '#ff2a2a', border: '#1a1a1a', text: '#fff', shadow: '0 1px 2px rgba(0,0,0,0.85)' },
        Epic: { bg: '#a335ee', border: '#1a1a1a', text: '#fff', shadow: '0 1px 2px rgba(0,0,0,0.85)' },
        Paranormal: { bg: '#000000', border: '#2a2a2a', text: '#fff', shadow: '0 1px 2px rgba(0,0,0,0.85)' },
        Legendary: { bg: '#f5b82e', border: '#1a1a1a', text: '#fff', shadow: '0 1px 2px rgba(0,0,0,0.85)' },
    };

    const meleeTextureSet = new Set();
    const tomahawkTextureSet = new Set();
    const bayonetTextureSet = new Set();
    const TEXTURE_FILE_RE = /texture\.[a-f0-9]+\.webp/i;

    function syncMeleeTextureSet() {
        meleeTextureSet.clear();
        tomahawkTextureSet.clear();
        bayonetTextureSet.clear();
        TOMAHAWK_TEXTURES.forEach(h => {
            const lower = h.toLowerCase();
            meleeTextureSet.add(lower);
            tomahawkTextureSet.add(lower);
        });
        BAYONET_TEXTURES.forEach(h => {
            const lower = h.toLowerCase();
            meleeTextureSet.add(lower);
            bayonetTextureSet.add(lower);
        });
    }

    function normalizeTextureFilename(file) {
        const match = String(file || '').match(/texture\.[a-f0-9]+\.webp/i);
        return match ? match[0].toLowerCase() : null;
    }

    const getStorage = (key, fallback) => {
        try {
            const saved = localStorage.getItem(key);
            if (saved === null) return fallback;
            return saved === 'true' ? true : (saved === 'false' ? false : saved);
        } catch (e) { return fallback; }
    };

    const FAV_STORAGE = {
        bayonet: 'kirka-fav-bayonet',
        tomahawk: 'kirka-fav-tomahawk',
    };

    function loadFavoriteSkins(storageKey) {
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed.filter(function (k) { return k && k !== 'none'; });
        } catch (e) {
            return [];
        }
    }

    function saveFavoriteSkins(storageKey, keys) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(keys));
        } catch (e) {}
    }

    function isFavoriteSkin(storageKey, key) {
        if (!key || key === 'none') return false;
        return loadFavoriteSkins(storageKey).indexOf(key) !== -1;
    }

    function toggleFavoriteSkin(storageKey, key) {
        if (!key || key === 'none') return false;
        const list = loadFavoriteSkins(storageKey);
        const idx = list.indexOf(key);
        if (idx === -1) {
            list.push(key);
            saveFavoriteSkins(storageKey, list);
            return true;
        }
        list.splice(idx, 1);
        saveFavoriteSkins(storageKey, list);
        return false;
    }

    function buildFavoritesOptions(allOptions, favoriteKeys) {
        const out = {};
        for (let i = 0; i < favoriteKeys.length; i++) {
            const k = favoriteKeys[i];
            if (allOptions[k]) out[k] = allOptions[k];
        }
        return out;
    }

    const cfg = {
        meleeOnlyEnabled: getStorage('kirka-melee-enabled', false),
        wireframeMeleeEnabled: getStorage('kirka-wireframe-melee-enabled', false),
        skinSwapBayonet: getStorage('kirka-skin-swap-bayonet', 'none'),
        skinSwapTomahawk: getStorage('kirka-skin-swap-tomahawk', 'none'),
    };

    let meleeOnlyOn = !!cfg.meleeOnlyEnabled;
    let wireframeOn = !!cfg.wireframeMeleeEnabled;
    let skinSwapBayonet = cfg.skinSwapBayonet || 'none';
    let skinSwapTomahawk = cfg.skinSwapTomahawk || 'none';

    function syncCfgFlags() {
        meleeOnlyOn = !!cfg.meleeOnlyEnabled;
        wireframeOn = !!cfg.wireframeMeleeEnabled;
        skinSwapBayonet = cfg.skinSwapBayonet || 'none';
        skinSwapTomahawk = cfg.skinSwapTomahawk || 'none';
    }

    const SKIN_NAMES = {

       
        // TOMA SKINS
        
        'texture.397a3f05.webp': 'Default(toma)',
        'texture.8ed8e0b2.webp': 'Void(toma)',
        'texture.35a5d845.webp': 'Shit(toma)',
        'texture.88ae76fa.webp': 'Alucard',
        'texture.0906ce32.webp': 'Blast(toma)',
        'texture.8ba45f73.webp': 'Dragonic(toma)',
        'texture.71135d5a.webp': 'Reactor',
        'texture.6768bccd.webp': 'Damascus',
        'texture.88aaf4d2.webp': 'Stingray',
        'texture.428f6c8a.webp': 'Capricorn',
        'texture.65314bed.webp': 'HotRod',
        'texture.8506219b.webp': 'Cherry',
        'texture.b2d07fa3.webp': 'Noxious',
        'texture.e1d793e4.webp': 'Glace',
        'texture.ef08a8e8.webp': 'Scalped',
        'texture.a4782cf0.webp': 'Hopeless',
        'texture.f2375ac3.webp': 'Tici',
        'texture.ac105d0f.webp': 'StarDust',
        'texture.f0d17401.webp': 'Gloopahawk',
        'texture.12920012.webp': 'Cyber Smite',
        'texture.43c02dda.webp': 'Mintique Tomahawk',
        'texture.919bf21f.webp': 'Supernova',
        'texture.24036079.webp': 'Worn Tomahawk',
        'texture.138b8182.webp': 'Snake',
        'texture.b095be8d.webp': 'Jungle',
        'texture.0d7ba3af.webp': 'Iris',
        'texture.f5027930.webp': 'HoneyComb',
        'texture.56f2b41d.webp': 'Crude',
        'texture.1351a8bd.webp': 'Comic Tomahawk',
        'texture.719d1dbf.webp': 'Cartoon Tomahawk',
        'texture.e54330dc.webp': 'Abstract',
		'texture.49d097f2.webp': 'Cyber Tomahawk',

        
        // BAYONET SKINS
        
        'texture.76c24e59.webp': 'Default(bayonet)',
        'texture.c56dd194.webp': 'Antique',
        'texture.93c2ef17.webp': 'Honey',
        'texture.ec42bd6d.webp': 'Void(bayonet)',
        'texture.cb2eec3e.webp': 'Gardener',
        'texture.796d0aa8.webp': 'Hypnotic',
        'texture.81c3b633.webp': 'Ice Breaker',
        'texture.8c0d6fd3.webp': 'Ritual',
        'texture.2e5a9caa.webp': 'Twilight',
        'texture.095db02c.webp': 'Shit(bayonet)',
        'texture.20df26d0.webp': '2026 Bayonet',
        'texture.f201b63c.webp': 'Lustre',
        'texture.42de6109.webp': 'CYB3ER',
        'texture.3b3ccc54.webp': 'FlareFang',
        'texture.0d627beb.webp': 'Anarch',
        'texture.6b6deb97.webp': 'Charmed',
        'texture.879963be.webp': 'Blast(bayonet)',
        'texture.3c88c1cd.webp': 'Or',
        'texture.6505bfe0.webp': 'Punji',
        'texture.fdf63403.webp': 'Dragonic(bayonet)',
        'texture.86751ae0.webp': 'Eruption',
        'texture.42e20418.webp': 'Love Bites',
        'texture.6c337e43.webp': 'Koi',
        'texture.d21aad57.webp': 'Eci',
        'texture.6c982378.webp': 'Cornfeild',
        'texture.6a2e03e5.webp': 'Jade',
        'texture.2d9358f1.webp': 'Retro',
        'texture.02854200.webp': '2024',
        'texture.7053eab7.webp': 'Drake',
        'texture.7ddc569a.webp': 'Alighted',
        'texture.aa8083d7.webp': 'Apple',
        'texture.eb218563.webp': 'Prism',
        'texture.425b0f4c.webp': 'Chromium',
        'texture.3293e221.webp': 'BubblePop',
        'texture.e8df4123.webp': 'Tiburon',
        'texture.692fc493.webp': 'Ranked_S4 Top10',
        'texture.34030475.webp': 'Psychedelic',
        'texture.092946a2.webp': 'Rift',
        'texture.f90a7614.webp': 'Reflections',
        'texture.5f4dfc15.webp': 'Ranked_S4 Top100',
        'texture.d9b571a7.webp': 'CV01',
        'texture.0c3e145e.webp': 'BlackHole',
        'texture.09998c00.webp': 'Luminescent',
        'texture.25337fa6.webp': 'Forge',
        'texture.9c950380.webp': 'Bled',
        'texture.7d987fe7.webp': 'Zen',
		'texture.940fb392.webp': 'Ranked_s2 Top10',
        'texture.05622ddb.webp': 'Ranked_S3 Top10',
        'texture.09652c4c.webp': 'Ranked_S1 Top10',
		'texture.980c5719.webp': 'Ranked_S4 Bronze',
		'texture.41b9ab29.webp': 'Ranked_S3 Bronze',
		'texture.071fdd68.webp': 'Ranked_S2 Bronze',
		'texture.34a9f648.webp': 'Ranked_S1 Bronze',
		'texture.9a2ba588.webp': 'Ranked_S1 Silver',
		'texture.337d4c72.webp': 'Ranked_S2 Silver',
        'texture.ce106229.webp': 'Ranked_S3 Silver',
		'texture.ed4679c6.webp': 'Ranked_S4 Gold',
		'texture.31c7afd4.webp': 'Ranked_S3 Gold',
		'texture.38a7cde8.webp': 'Ranked_S2 Gold',
		'texture.36ea80c4.webp': 'Ranked_S1 Gold',
        'texture.39f1bb44.webp': 'Electra',
        'texture.dc76627e.webp': 'Cane',
        'texture.3c1c1d8a.webp': '22',
        'texture.3afc455f.webp': 'Old',
        'texture.c7965f06.webp': 'Butterflies',
		'texture.f8fdb8b4.webp': 'Easter',
		'texture.916f12b4.webp': 'Radioactive',
		'texture.54efdeac.webp': 'Rebel',
		'texture.3c3e7f7e.webp': 'Kin',
		'texture.8465ee39.webp': 'Wrapping',
		'texture.31331ee4.webp': 'Beach',
		'texture.0516c979.webp': 'Gold Coins',
		'texture.b37589dc.webp': 'Vapor',
		'texture.9478f861.webp': 'Tradition',
		'texture.23b9555e.webp': 'Glance',
		'texture.f9907930.webp': 'Shard',
		'texture.7bda431f.webp': 'Lashes',
		'texture.dbd62944.webp': 'Vampire',
		'texture.7330acc2.webp': 'Champion',
		'texture.e7c26331.webp': 'Worn Bayonet',
		'texture.d629c96c.webp': 'Tyrant2',
		'texture.7a3706a3.webp': 'Vision',
		'texture.65a361a9.webp': 'Thunder',
		'texture.475bc8d4.webp': 'Tidal',
		'texture.0f3cf451.webp': 'Sapphire',
		'texture.c22d628d.webp': 'Saphire',
		'texture.77602579.webp': 'Solstice',
		'texture.458d5cdc.webp': 'Prismatic',
		'texture.8a28ebec.webp': 'Heat',
		'texture.90f2f8d8.webp': 'Mintique Bayonet',
		'texture.a09a31bd.webp': 'Glitch',
		'texture.72f8f241.webp': 'Glooplate',
		'texture.c5b78cf7.webp': 'Fumes',
		'texture.bf80c032.webp': 'Galactic',
		'texture.d607631a.webp': 'Flowy',
		'texture.b254099f.webp': 'Femboy',
		'texture.9de19189.webp': 'Comic Bayonet',
		'texture.77e1e295.webp': 'Bunnies',
		'texture.7540514d.webp': 'Cartoon Bayonet',
		'texture.cae40b42.webp': 'Bambi',
		'texture.1db80476.webp': 'Bolt',
		'texture.7b45cc84.webp': 'Action',
		'texture.cd5e52ad.webp': 'Turtle',
		'texture.d52d0780.webp': 'Undead',
		'texture.76cf863f.webp': 'Ornaments',
		'texture.f9db8bb0.webp': 'Icing',
		'texture.c41b6bb6.webp': 'Heather',
		'texture.47cab826.webp': 'Eclipse',
		'texture.8060ab6e.webp': 'Streaks',
		'texture.cc279290.webp': 'Alpha',
		'texture.e8493f6a.webp': 'Eggs',
		'texture.c4fda2f6.webp': 'Hot Rod',
		'texture.41164069.webp': '2025 Bayonet',
		'texture.08379d8a.webp': 'Nerida',
		'texture.bd9a7f52.webp': 'Cyber Bayonet',
		'texture.f3b92124.webp': 'Hotrod Bayonet',
		'texture.9588750d.webp': 'Polygon',
		'texture.58ec980e.webp': 'Pencil',
		'texture.7aff8e6c.webp': 'Firecracker',
		'texture.8176e357.webp': 'Caring',
		'texture.e04bb966.webp': 'Pyrite',
		'texture.137fe530.webp': 'Tyrant',
		'texture.750b0963.webp': 'Glitter',
		'texture.aba9d9c1.webp': 'Lucky',
		'texture.a2838521.webp': 'Bloo',
		'texture.72b09167.webp': 'Infarction',
		'texture.08575901.webp': 'Placate',
		'texture.b10da164.webp': 'Spring',
		'texture.0313bdc8.webp': 'Sunday',
		'texture.24c8965d.webp': 'Ranked_S3 Top100',
		'texture.ce1daf47.webp': 'Splash',
		'texture.5db7e15a.webp': 'Bone',
		'texture.340800bb.webp': 'Ranked_S1 Top100',
		'texture.2feb8f60.webp': 'Loved',
		'texture.07fe5d3d.webp': 'Archverse',
		'texture.ca74820f.webp': 'Clownicidal',
		'texture.054a47d3.webp': 'Faded',
		'texture.5394ef01.webp': 'Candle',
		'texture.f27c6b0b.webp': 'Cryptex',
		'texture.c6d21d01.webp': 'Flaming',
		'texture.dfad0879.webp': 'Verde',
		'texture.979d7856.webp': 'Shank',
		'texture.ac7b8455.webp': 'Vibrant',
		'texture.490c7963.webp': 'Immortal',
		'texture.91b6942b.webp': 'Saurus',
		'texture.0d0e6afa.webp': 'New',
		
		
    };

    function copyTextWithFallback(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
        }
        return copyTextFallback(text);
    }

    function copyTextFallback(text) {
        return new Promise((resolve, reject) => {
            try {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.setAttribute('readonly', '');
                ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
                document.body.appendChild(ta);
                ta.select();
                const ok = document.execCommand('copy');
                document.body.removeChild(ta);
                if (ok) resolve();
                else reject();
            } catch (e) {
                reject(e);
            }
        });
    }

    syncMeleeTextureSet();

    //  limits how many draw calls used
    // (prevents it from hiding random map nd ui stuff)
    const VIEWMODEL_DRAW_LIMIT = 8;

    
    // internal things (don't need to touch this)
    // ------------------------------------------------
    //  keeps track of textures and webgl contexts
    

    const hookedContexts = new WeakSet();
    const hookedGlEntries = [];
    const glToEntry = new WeakMap();
    const trackedGlTextures = new Set();
    const tomahawkGlTextures = new Set();
    const bayonetGlTextures = new Set();
    const textureSources = new WeakMap();
    const textureOriginalFile = new WeakMap();
    const textureWeapon = new WeakMap();
    const textureGlEntry = new WeakMap();
    const textureMipmapped = new WeakMap();
    let textureMeleeCache = new WeakMap();
    const previewBubbleControllers = [];
    const refreshBindExtras = new Set();
    let refreshWeaponFilter = null;

    function extractTextureFilename(url) {
        if (!url) return null;
        const match = String(url).match(TEXTURE_FILE_RE);
        return match ? match[0].toLowerCase() : null;
    }

    function isMeleeTextureUrl(url) {
        const file = extractTextureFilename(url);
        if (file && meleeTextureSet.has(file)) return true;
        if (!url) return false;
        const lower = String(url).toLowerCase();
        for (const hint of meleeTextureSet) {
            if (lower.includes(hint)) return true;
        }
        return false;
    }

    function getWeaponForFile(file) {
        if (!file) return null;
        if (tomahawkTextureSet.has(file)) return 'tomahawk';
        if (bayonetTextureSet.has(file)) return 'bayonet';
        return null;
    }

    function registerMeleeTexture(tex, gl, file, srcUrl) {
        if (!tex || !gl || !file) return;
        const weapon = getWeaponForFile(file);
        if (!weapon) return;
        const entry = glToEntry.get(gl);
        if (entry) textureGlEntry.set(tex, entry);
        textureOriginalFile.set(tex, file);
        textureWeapon.set(tex, weapon);
        textureSources.set(tex, srcUrl || (TEXTURE_CDN + file));
        textureMeleeCache.set(tex, true);
        trackedGlTextures.add(tex);
        if (weapon === 'tomahawk') tomahawkGlTextures.add(tex);
        else bayonetGlTextures.add(tex);
    }

    function closeAllPreviewBubbles() {
        for (let i = 0; i < previewBubbleControllers.length; i++) {
            previewBubbleControllers[i].forceClose();
        }
    }

    function isMeleeTexture(tex) {
        if (!tex) return false;
        if (textureMeleeCache.has(tex)) return textureMeleeCache.get(tex);
        const result = isMeleeTextureUrl(textureSources.get(tex));
        textureMeleeCache.set(tex, result);
        return result;
    }

    
    // texture replacer (swaps melee uploads at texImage2D time)
    

    const preloadedSwapImages = new Map();

    function preloadSwapTexture(filename, onReady) {
        if (!filename || filename === 'none') {
            if (onReady) onReady();
            return;
        }
        const file = normalizeTextureFilename(filename);
        if (!file) {
            if (onReady) onReady();
            return;
        }
        const finish = function () {
            if (onReady) onReady();
        };
        if (preloadedSwapImages.has(file)) {
            const existing = preloadedSwapImages.get(file);
            if (existing.complete && existing.naturalWidth > 0) finish();
            else {
                function done() {
                    existing.removeEventListener('load', done);
                    existing.removeEventListener('error', done);
                    finish();
                }
                existing.addEventListener('load', done);
                existing.addEventListener('error', done);
            }
            return;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = finish;
        img.onerror = finish;
        img.src = TEXTURE_CDN + file;
        preloadedSwapImages.set(file, img);
    }

    function getReadySwapImage(filename) {
        const file = normalizeTextureFilename(filename);
        if (!file) return null;
        const img = preloadedSwapImages.get(file);
        if (!img || !img.complete || img.naturalWidth === 0) return null;
        return img;
    }

    function trySwapMeleeTextureUpload(args) {
        const pixels = args[args.length - 1];
        if (!pixels || typeof pixels !== 'object' || !pixels.src) return;

        const uploadFile = extractTextureFilename(String(pixels.src));
        if (!uploadFile) return;

        let swapTarget = null;
        if (skinSwapTomahawk && skinSwapTomahawk !== 'none' && tomahawkTextureSet.has(uploadFile)) {
            swapTarget = skinSwapTomahawk;
        } else if (skinSwapBayonet && skinSwapBayonet !== 'none' && bayonetTextureSet.has(uploadFile)) {
            swapTarget = skinSwapBayonet;
        }
        if (!swapTarget) return;

        const swapFile = normalizeTextureFilename(swapTarget);
        if (!swapFile || uploadFile === swapFile) return;

        const replacement = getReadySwapImage(swapFile);
        if (!replacement) return;

        args[args.length - 1] = replacement;
    }

    function reuploadSwapToTexture(tex, img) {
        const entry = textureGlEntry.get(tex);
        if (!entry || !img) return false;
        const gl = entry.gl;
        try {
            entry.origBindTexture.call(gl, entry.TEXTURE_2D, tex);
            entry.origTexImage2D.call(
                gl,
                entry.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                img
            );
            if (textureMipmapped.get(tex) && entry.origGenerateMipmap) {
                entry.origGenerateMipmap.call(gl, entry.TEXTURE_2D);
            }
            const uploaded = normalizeTextureFilename(img.src || '');
            if (uploaded) textureSources.set(tex, TEXTURE_CDN + uploaded);
            return true;
        } catch (_) {
            return false;
        }
    }

    function collectWeaponRefreshTextures(weapon) {
        const pool = weapon === 'tomahawk' ? tomahawkGlTextures : bayonetGlTextures;
        const out = [];
        pool.forEach(function (tex) {
            if (textureWeapon.get(tex) === weapon) out.push(tex);
        });
        if (refreshWeaponFilter === weapon) {
            refreshBindExtras.forEach(function (tex) {
                if (textureWeapon.get(tex) === weapon && out.indexOf(tex) === -1) out.push(tex);
            });
        }
        return out;
    }

    function refreshMeleeSwapTextures(weaponFilter) {
        if (!hookedGlEntries.length) return;

        const weapons = weaponFilter
            ? [weaponFilter]
            : ['tomahawk', 'bayonet'];

        let pendingPreload = null;

        for (let w = 0; w < weapons.length; w++) {
            const weapon = weapons[w];
            const swapTarget = weapon === 'tomahawk' ? skinSwapTomahawk : skinSwapBayonet;
            const textures = collectWeaponRefreshTextures(weapon);
            if (!textures.length) continue;

            let swapImg = null;
            if (swapTarget && swapTarget !== 'none') {
                swapImg = getReadySwapImage(swapTarget);
                if (!swapImg) {
                    pendingPreload = swapTarget;
                    continue;
                }
            }

            for (let i = 0; i < textures.length; i++) {
                const tex = textures[i];
                let img = swapImg;
                if (!img) {
                    const origFile = textureOriginalFile.get(tex) || extractTextureFilename(textureSources.get(tex));
                    if (!origFile) continue;
                    img = getReadySwapImage(origFile);
                    if (!img) {
                        pendingPreload = origFile;
                        continue;
                    }
                }
                reuploadSwapToTexture(tex, img);
            }
        }

        if (pendingPreload) {
            preloadSwapTexture(pendingPreload, function () {
                refreshMeleeSwapTextures(weaponFilter);
            });
        }
    }

    function requestRefreshMeleeSwap(weaponFilter) {
        refreshWeaponFilter = weaponFilter;
        refreshBindExtras.clear();
        refreshMeleeSwapTextures(weaponFilter);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                refreshMeleeSwapTextures(weaponFilter);
                refreshWeaponFilter = null;
                refreshBindExtras.clear();
            });
        });
    }

    if (skinSwapBayonet && skinSwapBayonet !== 'none') preloadSwapTexture(skinSwapBayonet);
    if (skinSwapTomahawk && skinSwapTomahawk !== 'none') preloadSwapTexture(skinSwapTomahawk);

    
    // main webgl hook
    // ------------------------------------------------
    // the part tha hides the guns.
    // It checks what texture is being used and blocks the draw,
    // if it's not a bayonet/toma texture.
    

    function hookGl(gl) {
        if (!gl || hookedContexts.has(gl)) return;
        hookedContexts.add(gl);

        const entry = {
            gl: gl,
            origTexImage2D: gl.texImage2D.bind(gl),
            origTexSubImage2D: gl.texSubImage2D ? gl.texSubImage2D.bind(gl) : null,
            origCopyTexImage2D: gl.copyTexImage2D ? gl.copyTexImage2D.bind(gl) : null,
            origBindTexture: gl.bindTexture.bind(gl),
            origGenerateMipmap: gl.generateMipmap ? gl.generateMipmap.bind(gl) : null,
            TEXTURE_2D: gl.TEXTURE_2D,
        };
        hookedGlEntries.push(entry);
        glToEntry.set(gl, entry);

        let inViewmodelPass = false;
        let viewmodelDrawCount = 0;
        let meleeActive = false;
        let boundTexture = null;
        let lastMeleeUpload = null;

        // save original webgl functions
        const origClear = gl.clear.bind(gl);
        const origBindTexture = gl.bindTexture.bind(gl);
        const origTexImage2D = gl.texImage2D.bind(gl);
        const origTexSubImage2D = entry.origTexSubImage2D;
        const origCopyTexImage2D = entry.origCopyTexImage2D;
        const origGenerateMipmap = entry.origGenerateMipmap;
        const origDrawElements = gl.drawElements.bind(gl);
        const origDrawArrays = gl.drawArrays.bind(gl);

        const TRIANGLE_MODES = new Set([
            gl.TRIANGLES,
            gl.TRIANGLE_STRIP,
            gl.TRIANGLE_FAN,
        ]);
        const TEXTURE_2D = gl.TEXTURE_2D;
        const TEXTURE_BINDING_2D = gl.TEXTURE_BINDING_2D;

        function captureTextureUpload(args) {
            const pixels = args[args.length - 1];
            if (!pixels || typeof pixels !== 'object' || !pixels.src) return;
            try {
                const tex = gl.getParameter(TEXTURE_BINDING_2D);
                const src = String(pixels.src);
                const file = extractTextureFilename(src);
                if (!file) return;
                registerMeleeTexture(tex, gl, file, src);
                const weapon = getWeaponForFile(file);
                if (weapon) lastMeleeUpload = { weapon: weapon, file: file };
            } catch (_) {}
        }

        function trackRefreshBind(texture) {
            if (!refreshWeaponFilter || !inViewmodelPass || !texture) return;
            if (!isMeleeTexture(texture)) return;
            refreshBindExtras.add(texture);
            if (!textureGlEntry.has(texture)) textureGlEntry.set(texture, entry);
            const weapon = textureWeapon.get(texture);
            if (weapon === 'tomahawk') tomahawkGlTextures.add(texture);
            else if (weapon === 'bayonet') bayonetGlTextures.add(texture);
        }

        gl.clear = function (mask) {
            inViewmodelPass = (mask === gl.DEPTH_BUFFER_BIT);
            if (inViewmodelPass && (meleeOnlyOn || wireframeOn)) {
                viewmodelDrawCount = 0;
                meleeActive = false;
            }
            if (!meleeOnlyOn && !wireframeOn) return origClear(mask);
            return origClear(mask);
        };

        gl.bindTexture = function (target, texture) {
            if (target === TEXTURE_2D) trackRefreshBind(texture);
            if (target !== TEXTURE_2D) return origBindTexture(target, texture);
            if (!meleeOnlyOn && !wireframeOn) return origBindTexture(target, texture);
            boundTexture = texture || null;
            if (!inViewmodelPass) return origBindTexture(target, texture);
            if (texture && !meleeActive && isMeleeTexture(texture)) meleeActive = true;
            return origBindTexture(target, texture);
        };

        gl.texImage2D = function (...args) {
            captureTextureUpload(args);
            trySwapMeleeTextureUpload(args);
            return origTexImage2D.apply(gl, args);
        };

        if (origTexSubImage2D) {
            gl.texSubImage2D = function (...args) {
                captureTextureUpload(args);
                trySwapMeleeTextureUpload(args);
                return origTexSubImage2D.apply(gl, args);
            };
        }

        if (origCopyTexImage2D) {
            gl.copyTexImage2D = function (...args) {
                let dstTex = null;
                try {
                    if (args[0] === TEXTURE_2D) dstTex = gl.getParameter(TEXTURE_BINDING_2D);
                } catch (_) {}
                const result = origCopyTexImage2D.apply(gl, args);
                try {
                    if (dstTex && lastMeleeUpload && lastMeleeUpload.file) {
                        registerMeleeTexture(
                            dstTex,
                            gl,
                            lastMeleeUpload.file,
                            TEXTURE_CDN + lastMeleeUpload.file
                        );
                    }
                } catch (_) {}
                return result;
            };
        }

        if (origGenerateMipmap) {
            gl.generateMipmap = function (target) {
                if (target === TEXTURE_2D) {
                    try {
                        const tex = gl.getParameter(TEXTURE_BINDING_2D);
                        if (tex && textureWeapon.has(tex)) textureMipmapped.set(tex, true);
                    } catch (_) {}
                }
                return origGenerateMipmap.call(gl, target);
            };
        }

        function resolveViewmodelDraw(mode) {
            const isTriangle = TRIANGLE_MODES.has(mode);

            if (!meleeActive && isTriangle && boundTexture && isMeleeTexture(boundTexture)) {
                meleeActive = true;
            }

            const hide = meleeOnlyOn && isTriangle && !meleeActive
                && viewmodelDrawCount < VIEWMODEL_DRAW_LIMIT;

            const drawMode = (!hide && wireframeOn && isTriangle && meleeActive)
                ? gl.LINES
                : mode;

            return { hide, drawMode };
        }

        gl.drawElements = function (mode, count, type, offset) {
            if ((!meleeOnlyOn && !wireframeOn) || !inViewmodelPass) {
                return origDrawElements(mode, count, type, offset);
            }
            const resolved = resolveViewmodelDraw(mode);
            if (resolved.hide) {
                viewmodelDrawCount++;
                return;
            }
            if (TRIANGLE_MODES.has(mode)) viewmodelDrawCount++;
            return origDrawElements(resolved.drawMode, count, type, offset);
        };

        gl.drawArrays = function (mode, first, count) {
            if ((!meleeOnlyOn && !wireframeOn) || !inViewmodelPass) {
                return origDrawArrays(mode, first, count);
            }
            const resolved = resolveViewmodelDraw(mode);
            if (resolved.hide) {
                viewmodelDrawCount++;
                return;
            }
            if (TRIANGLE_MODES.has(mode)) viewmodelDrawCount++;
            return origDrawArrays(resolved.drawMode, first, count);
        };
    }

    
    // hook canvas
    // ------------------------------------------------
    // this runs the script as soon as Kirka creates webgl context.
    

    if (!alreadyHooked) {
        const origGetContext = _gc.__o || _gc;
        function patchedGetContext(type, attrs) {
            const ctx = origGetContext.call(this, type, attrs);
            if (ctx && (type === 'webgl' || type === 'webgl2')) {
                hookGl(ctx);
            }
            return ctx;
        }
        patchedGetContext.__m = 1;
        patchedGetContext.__o = origGetContext;
        HTMLCanvasElement.prototype.getContext = patchedGetContext;
    }

    
    // menu
    

    function initMenu() {
        if (document.getElementById('melee-vm-overlay')) return;

        const MENU_FONT = '"Segoe UI", Roboto, Arial, sans-serif';
        const ACCENT = '#e3292f';
        const TAB_KEY = 'kirka-melee-menu-tab';
        let activeTab = localStorage.getItem(TAB_KEY) === 'main' ? 'main' : 'swapper';

        if (!document.getElementById('melee-vm-menu-styles')) {
            const styleTag = document.createElement('style');
            styleTag.id = 'melee-vm-menu-styles';
            styleTag.textContent = `
                .melee-vm-panel, .melee-vm-panel * { -webkit-tap-highlight-color: transparent; }
                .melee-vm-panel button,
                .melee-vm-panel button:focus,
                .melee-vm-panel button:focus-visible,
                .melee-vm-panel button:active {
                    outline: none !important;
                    box-shadow: none !important;
                }
                .melee-vm-panel input,
                .melee-vm-panel input:focus,
                .melee-vm-panel input:focus-visible {
                    outline: none !important;
                    box-shadow: none !important;
                }
                .melee-vm-tab-body::-webkit-scrollbar { width: 8px; }
                .melee-vm-tab-body::-webkit-scrollbar-track { background: transparent; }
                .melee-vm-tab-body::-webkit-scrollbar-thumb { background: #3a3a42; border-radius: 4px; }
                .melee-vm-tab-body::-webkit-scrollbar-thumb:hover { background: #4a4a55; }
                .melee-vm-panel {
                    transition: min-height 0.28s ease;
                }
                .melee-vm-tab-body {
                    transition: opacity 0.24s ease, visibility 0.24s ease;
                }
                .melee-vm-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 28px 24px;
                    min-height: 78px;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    position: relative;
                    background: linear-gradient(180deg, #120505 0%, #080202 52%, #0c0303 100%);
                    border-bottom: 1px solid rgba(120, 14, 20, 0.55);
                    box-shadow: inset 0 -16px 28px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(160, 28, 36, 0.12);
                }
                .melee-vm-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.14) 2px,
                        rgba(0, 0, 0, 0.14) 4px
                    );
                    opacity: 0.4;
                }
                .melee-vm-title-wrap {
                    flex: 1;
                    min-width: 0;
                    position: relative;
                    z-index: 1;
                }
                .melee-vm-title {
                    display: block;
                    width: 100%;
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    line-height: 1.1;
                    position: relative;
                    color: #8f1414;
                    text-shadow: 0 0 10px rgba(160, 22, 30, 0.55), 0 0 2px rgba(80, 8, 12, 0.9);
                    -webkit-animation: melee-vm-title-flicker 10s infinite steps(1);
                    animation: melee-vm-title-flicker 10s infinite steps(1);
                }
                .melee-vm-title::before,
                .melee-vm-title::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    opacity: 0;
                }
                .melee-vm-title::before {
                    color: rgba(255, 35, 55, 0.6);
                    -webkit-animation: melee-vm-title-glitch-a 10s infinite steps(1);
                    animation: melee-vm-title-glitch-a 10s infinite steps(1);
                }
                .melee-vm-title::after {
                    color: rgba(0, 0, 0, 0.88);
                    -webkit-animation: melee-vm-title-glitch-b 10s infinite steps(1);
                    animation: melee-vm-title-glitch-b 10s infinite steps(1);
                }
                @-webkit-keyframes melee-vm-title-flicker {
                    0%, 3%, 26%, 32%, 56%, 59%, 100% {
                        opacity: 0.94;
                        color: #ae1818;
                        text-shadow: 0 0 8px rgba(160, 22, 30, 0.42);
                        -webkit-transform: translate(0, 0);
                        transform: translate(0, 0);
                    }
                    1% { opacity: 0.05; color: #000; text-shadow: none; -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    2% { opacity: 0.92; color: #ff1a28; text-shadow: 0 0 12px rgba(255, 22, 35, 0.75); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    10% { opacity: 0.86; color: #9a1616; text-shadow: 0 0 6px rgba(150, 20, 28, 0.35); }
                    11% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    18% { opacity: 0.88; color: #a01616; }
                    19% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    27% { opacity: 0.04; color: #000; text-shadow: none; -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    28% { opacity: 0.9; color: #ff2030; text-shadow: 0 0 10px rgba(255, 24, 38, 0.7); -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    29% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); -webkit-transform: translate(0, 0); transform: translate(0, 0); }
                    30% { opacity: 0.05; color: #000; text-shadow: none; -webkit-transform: translate(-2px, 0); transform: translate(-2px, 0); }
                    31% { opacity: 0.88; color: #ff1a28; text-shadow: 0 0 11px rgba(255, 20, 32, 0.72); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    40% { opacity: 0.87; color: #9c1515; text-shadow: 0 0 6px rgba(145, 18, 26, 0.32); }
                    41% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    48% { opacity: 0.89; color: #a41818; }
                    49% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    57% { opacity: 0.06; color: #000; text-shadow: none; -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    58% { opacity: 0.91; color: #ff1828; text-shadow: 0 0 12px rgba(255, 22, 34, 0.78); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    68% { opacity: 0.86; color: #981414; text-shadow: 0 0 6px rgba(140, 18, 24, 0.3); }
                    69% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); -webkit-transform: translate(0, 0); transform: translate(0, 0); }
                    78% { opacity: 0.88; color: #a21616; }
                    79% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    88% { opacity: 0.87; color: #9a1616; }
                    89% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                }
                @keyframes melee-vm-title-flicker {
                    0%, 3%, 26%, 32%, 56%, 59%, 100% {
                        opacity: 0.94;
                        color: #ae1818;
                        text-shadow: 0 0 8px rgba(160, 22, 30, 0.42);
                        transform: translate(0, 0);
                    }
                    1% { opacity: 0.05; color: #000; text-shadow: none; transform: translate(-1px, 0); }
                    2% { opacity: 0.92; color: #ff1a28; text-shadow: 0 0 12px rgba(255, 22, 35, 0.75); transform: translate(1px, 0); }
                    10% { opacity: 0.86; color: #9a1616; text-shadow: 0 0 6px rgba(150, 20, 28, 0.35); }
                    11% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    18% { opacity: 0.88; color: #a01616; }
                    19% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    27% { opacity: 0.04; color: #000; text-shadow: none; transform: translate(1px, 0); }
                    28% { opacity: 0.9; color: #ff2030; text-shadow: 0 0 10px rgba(255, 24, 38, 0.7); transform: translate(-1px, 0); }
                    29% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); transform: translate(0, 0); }
                    30% { opacity: 0.05; color: #000; text-shadow: none; transform: translate(-2px, 0); }
                    31% { opacity: 0.88; color: #ff1a28; text-shadow: 0 0 11px rgba(255, 20, 32, 0.72); transform: translate(1px, 0); }
                    40% { opacity: 0.87; color: #9c1515; text-shadow: 0 0 6px rgba(145, 18, 26, 0.32); }
                    41% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    48% { opacity: 0.89; color: #a41818; }
                    49% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    57% { opacity: 0.06; color: #000; text-shadow: none; transform: translate(-1px, 0); }
                    58% { opacity: 0.91; color: #ff1828; text-shadow: 0 0 12px rgba(255, 22, 34, 0.78); transform: translate(1px, 0); }
                    68% { opacity: 0.86; color: #981414; text-shadow: 0 0 6px rgba(140, 18, 24, 0.3); }
                    69% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); transform: translate(0, 0); }
                    78% { opacity: 0.88; color: #a21616; }
                    79% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                    88% { opacity: 0.87; color: #9a1616; }
                    89% { opacity: 0.94; color: #ae1818; text-shadow: 0 0 8px rgba(160, 22, 30, 0.42); }
                }
                @-webkit-keyframes melee-vm-title-glitch-a {
                    0%, 2%, 4%, 26%, 29%, 32%, 34%, 56%, 59%, 61%, 100% { opacity: 0; clip: rect(0, 0, 0, 0); -webkit-transform: translate(0, 0); transform: translate(0, 0); }
                    1% { opacity: 0.55; clip: rect(4px, 999px, 20px, 0); -webkit-transform: translate(2px, 0); transform: translate(2px, 0); }
                    3% { opacity: 0.35; clip: rect(14px, 999px, 28px, 0); -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    27% { opacity: 0.5; clip: rect(2px, 999px, 16px, 0); -webkit-transform: translate(-2px, 0); transform: translate(-2px, 0); }
                    28% { opacity: 0.45; clip: rect(18px, 999px, 32px, 0); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    30% { opacity: 0.5; clip: rect(8px, 999px, 22px, 0); -webkit-transform: translate(2px, 0); transform: translate(2px, 0); }
                    31% { opacity: 0.4; clip: rect(22px, 999px, 36px, 0); -webkit-transform: translate(-2px, 0); transform: translate(-2px, 0); }
                    57% { opacity: 0.52; clip: rect(6px, 999px, 20px, 0); -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    58% { opacity: 0.38; clip: rect(16px, 999px, 30px, 0); -webkit-transform: translate(2px, 0); transform: translate(2px, 0); }
                }
                @keyframes melee-vm-title-glitch-a {
                    0%, 2%, 4%, 26%, 29%, 32%, 34%, 56%, 59%, 61%, 100% { opacity: 0; clip: rect(0, 0, 0, 0); transform: translate(0, 0); }
                    1% { opacity: 0.55; clip: rect(4px, 999px, 20px, 0); transform: translate(2px, 0); }
                    3% { opacity: 0.35; clip: rect(14px, 999px, 28px, 0); transform: translate(-1px, 0); }
                    27% { opacity: 0.5; clip: rect(2px, 999px, 16px, 0); transform: translate(-2px, 0); }
                    28% { opacity: 0.45; clip: rect(18px, 999px, 32px, 0); transform: translate(1px, 0); }
                    30% { opacity: 0.5; clip: rect(8px, 999px, 22px, 0); transform: translate(2px, 0); }
                    31% { opacity: 0.4; clip: rect(22px, 999px, 36px, 0); transform: translate(-2px, 0); }
                    57% { opacity: 0.52; clip: rect(6px, 999px, 20px, 0); transform: translate(-1px, 0); }
                    58% { opacity: 0.38; clip: rect(16px, 999px, 30px, 0); transform: translate(2px, 0); }
                }
                @-webkit-keyframes melee-vm-title-glitch-b {
                    0%, 2%, 4%, 26%, 29%, 32%, 34%, 56%, 59%, 61%, 100% { opacity: 0; clip: rect(0, 0, 0, 0); -webkit-transform: translate(0, 0); transform: translate(0, 0); }
                    1% { opacity: 0.45; clip: rect(10px, 999px, 24px, 0); -webkit-transform: translate(-2px, 0); transform: translate(-2px, 0); }
                    2% { opacity: 0.3; clip: rect(0, 999px, 12px, 0); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    27% { opacity: 0.42; clip: rect(12px, 999px, 26px, 0); -webkit-transform: translate(1px, 0); transform: translate(1px, 0); }
                    30% { opacity: 0.48; clip: rect(20px, 999px, 34px, 0); -webkit-transform: translate(-1px, 0); transform: translate(-1px, 0); }
                    31% { opacity: 0.35; clip: rect(4px, 999px, 18px, 0); -webkit-transform: translate(2px, 0); transform: translate(2px, 0); }
                    57% { opacity: 0.4; clip: rect(14px, 999px, 28px, 0); -webkit-transform: translate(2px, 0); transform: translate(2px, 0); }
                    58% { opacity: 0.32; clip: rect(0, 999px, 14px, 0); -webkit-transform: translate(-2px, 0); transform: translate(-2px, 0); }
                }
                @keyframes melee-vm-title-glitch-b {
                    0%, 2%, 4%, 26%, 29%, 32%, 34%, 56%, 59%, 61%, 100% { opacity: 0; clip: rect(0, 0, 0, 0); transform: translate(0, 0); }
                    1% { opacity: 0.45; clip: rect(10px, 999px, 24px, 0); transform: translate(-2px, 0); }
                    2% { opacity: 0.3; clip: rect(0, 999px, 12px, 0); transform: translate(1px, 0); }
                    27% { opacity: 0.42; clip: rect(12px, 999px, 26px, 0); transform: translate(1px, 0); }
                    30% { opacity: 0.48; clip: rect(20px, 999px, 34px, 0); transform: translate(-1px, 0); }
                    31% { opacity: 0.35; clip: rect(4px, 999px, 18px, 0); transform: translate(2px, 0); }
                    57% { opacity: 0.4; clip: rect(14px, 999px, 28px, 0); transform: translate(2px, 0); }
                    58% { opacity: 0.32; clip: rect(0, 999px, 14px, 0); transform: translate(-2px, 0); }
                }
                .melee-vm-header-close {
                    position: relative;
                    z-index: 1;
                    flex-shrink: 0;
                }
                .melee-vm-skin-list::-webkit-scrollbar,
                .melee-vm-skin-search-list::-webkit-scrollbar,
                .melee-vm-fav-list::-webkit-scrollbar { width: 8px; }
                .melee-vm-skin-list::-webkit-scrollbar-track,
                .melee-vm-skin-search-list::-webkit-scrollbar-track,
                .melee-vm-fav-list::-webkit-scrollbar-track { background: transparent; }
                .melee-vm-skin-list::-webkit-scrollbar-thumb,
                .melee-vm-skin-search-list::-webkit-scrollbar-thumb,
                .melee-vm-fav-list::-webkit-scrollbar-thumb { background: #3a3a42; border-radius: 4px; }
                .melee-vm-skin-list::-webkit-scrollbar-thumb:hover,
                .melee-vm-skin-search-list::-webkit-scrollbar-thumb:hover,
                .melee-vm-fav-list::-webkit-scrollbar-thumb:hover { background: #4a4a55; }
            `;
            (document.head || document.documentElement).appendChild(styleTag);
        }

        const overlay = document.createElement('div');
        overlay.id = 'melee-vm-overlay';
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(6px)',
            zIndex: '1000000',
        });

        const panel = document.createElement('div');
        panel.className = 'melee-vm-panel';
        Object.assign(panel.style, {
            width: 'min(580px, 92vw)',
            maxHeight: '88vh',
            background: 'linear-gradient(165deg, #141418 0%, #0a0a0c 100%)',
            color: '#fff',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxSizing: 'border-box',
            fontFamily: MENU_FONT,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 90px rgba(0,0,0,0.85)',
        });

        const header = document.createElement('div');
        header.className = 'melee-vm-header';

        const titleWrap = document.createElement('div');
        titleWrap.className = 'melee-vm-title-wrap';

        const title = document.createElement('div');
        title.className = 'melee-vm-title';
        title.setAttribute('data-text', 'Texture Swapper');
        title.textContent = 'Texture Swapper';
        titleWrap.appendChild(title);
        header.appendChild(titleWrap);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'melee-vm-header-close';
        closeBtn.textContent = '✕';
        Object.assign(closeBtn.style, {
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: '700',
            borderRadius: '8px',
            border: '1px solid rgba(120, 20, 28, 0.45)',
            background: 'rgba(0, 0, 0, 0.35)',
            color: 'rgba(255, 140, 145, 0.85)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            outline: 'none',
        });
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = '#ff3860';
            closeBtn.style.color = '#000';
            closeBtn.style.borderColor = '#ff3860';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(0, 0, 0, 0.35)';
            closeBtn.style.color = 'rgba(255, 140, 145, 0.85)';
            closeBtn.style.borderColor = 'rgba(120, 20, 28, 0.45)';
        });
        closeBtn.addEventListener('click', () => {
            closeAllPreviewBubbles();
            overlay.style.display = 'none';
            closeBtn.blur();
        });
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const tabBar = document.createElement('div');
        Object.assign(tabBar.style, {
            display: 'flex',
            gap: '8px',
            padding: '12px 24px 0',
            flexShrink: '0',
        });

        const tabSwapper = document.createElement('button');
        tabSwapper.textContent = 'Texture Swapper';
        const tabMain = document.createElement('button');
        tabMain.textContent = 'Knife Only';

        const tabBtnBase = {
            flex: '1',
            padding: '10px 14px',
            borderRadius: '8px 8px 0 0',
            border: '1px solid rgba(255,255,255,0.1)',
            borderBottom: 'none',
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(255,255,255,0.55)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            outline: 'none',
        };

        Object.assign(tabSwapper.style, tabBtnBase);
        Object.assign(tabMain.style, tabBtnBase);

        tabSwapper.addEventListener('click', (e) => { e.currentTarget.blur(); });
        tabMain.addEventListener('click', (e) => { e.currentTarget.blur(); });

        tabBar.appendChild(tabSwapper);
        tabBar.appendChild(tabMain);
        panel.appendChild(tabBar);

        const bodyWrap = document.createElement('div');
        Object.assign(bodyWrap.style, {
            flex: '1',
            minHeight: '0',
            overflow: 'hidden',
            position: 'relative',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(17, 17, 17, 0.85)',
        });
        panel.appendChild(bodyWrap);

        const mainTab = document.createElement('div');
        const swapperTab = document.createElement('div');
        const tabBodyBase = {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            padding: '20px 24px 28px',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            opacity: '0',
            visibility: 'hidden',
            pointerEvents: 'none',
        };
        [mainTab, swapperTab].forEach((el) => {
            el.className = 'melee-vm-tab-body';
            Object.assign(el.style, tabBodyBase);
        });
        mainTab.style.overflowY = 'auto';
        swapperTab.style.overflowY = 'hidden';
        bodyWrap.appendChild(mainTab);
        bodyWrap.appendChild(swapperTab);
        mainTab.addEventListener('scroll', closeAllSkinPopups, { passive: true });
        swapperTab.addEventListener('scroll', closeAllSkinPopups, { passive: true });

        const SWAPPER_PANEL_MIN_HEIGHT = '860px';
        const SWAPPER_PREVIEW_RESERVE = '230px';

        function paintTabs() {
            const activeStyle = {
                background: 'rgba(227,41,47,0.14)',
                color: '#ff8e95',
                borderColor: 'rgba(227,41,47,0.45)',
            };
            const inactiveStyle = {
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.55)',
                borderColor: 'rgba(255,255,255,0.1)',
            };
            const isSwapper = activeTab === 'swapper';
            Object.assign(tabSwapper.style, isSwapper ? activeStyle : inactiveStyle);
            Object.assign(tabMain.style, isSwapper ? inactiveStyle : activeStyle);

            swapperTab.style.opacity = isSwapper ? '1' : '0';
            swapperTab.style.visibility = isSwapper ? 'visible' : 'hidden';
            swapperTab.style.pointerEvents = isSwapper ? 'auto' : 'none';

            mainTab.style.opacity = isSwapper ? '0' : '1';
            mainTab.style.visibility = isSwapper ? 'hidden' : 'visible';
            mainTab.style.pointerEvents = isSwapper ? 'none' : 'auto';

            panel.style.minHeight = SWAPPER_PANEL_MIN_HEIGHT;
        }

        function switchTab(tab) {
            if (tab === activeTab) return;
            closeAllSkinPopups();
            closeAllPreviewBubbles();
            activeTab = tab;
            localStorage.setItem(TAB_KEY, tab);
            paintTabs();
        }

        tabSwapper.addEventListener('click', () => switchTab('swapper'));
        tabMain.addEventListener('click', () => switchTab('main'));
        paintTabs();

        const footer = document.createElement('div');
        Object.assign(footer.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '14px',
            padding: '12px 24px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.55)',
            flexShrink: '0',
            background: 'rgba(255,255,255,0.02)',
        });

        const footerCredit = document.createElement('span');
        footerCredit.textContent = 'inhib#KLKLYH';

        const footerVersion = document.createElement('span');
        footerVersion.textContent = 'v' + VM_VERSION;

        const footerDivider = document.createElement('span');
        footerDivider.textContent = '\u00b7';
        footerDivider.style.cssText = 'opacity: 0.35; flex-shrink: 0;';

        const footerHint = document.createElement('span');
        footerHint.textContent = 'Press CTRL+O to toggle this menu';

        const footerHookCredit = document.createElement('span');
        footerHookCredit.textContent = 'imnotkoolkid (webgl hook base from gunscale-rgb script)';

        footer.appendChild(footerCredit);
        footer.appendChild(footerDivider.cloneNode(true));
        footer.appendChild(footerVersion);
        footer.appendChild(footerDivider.cloneNode(true));
        footer.appendChild(footerHint);
        footer.appendChild(footerDivider.cloneNode(true));
        footer.appendChild(footerHookCredit);
        panel.appendChild(footer);

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && (event.key === 'o' || event.key === 'O' || event.code === 'KeyO')) {
                event.preventDefault();
                event.stopPropagation();
                const opening = overlay.style.display !== 'flex';
                if (!opening) closeAllPreviewBubbles();
                overlay.style.display = opening ? 'flex' : 'none';
            }
        }, true);

        function makeCard(target) {
            const card = document.createElement('div');
            Object.assign(card.style, {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '10px',
                padding: '16px 18px',
                marginBottom: '14px',
            });
            target.appendChild(card);
            return card;
        }

        const MUTED_LABEL = 'font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75);';

        function createOption(target, label, initial, cb, labelCss) {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 0;';
            row.innerHTML = `<span style="${labelCss || 'font-size: 14px; font-weight: 600;'}">${label}</span>`;

            const btn = document.createElement('button');
            const baseBtnCss = 'min-width: 96px; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 12px; letter-spacing: 0.5px; font-family: inherit; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; outline: none; box-shadow: none;';
            let on = initial;

            function paint() {
                btn.textContent = on ? 'ENABLED' : 'ENABLE';
                btn.style.cssText = baseBtnCss + (on
                    ? 'background: rgba(44,255,124,0.12); color: #2cff7c; border: 1px solid rgba(44,255,124,0.45);'
                    : 'background: rgba(255,56,96,0.12); color: #ff3860; border: 1px solid rgba(255,56,96,0.45);');
            }
            paint();

            btn.onclick = () => { on = !on; paint(); cb(on); btn.blur(); };
            row.appendChild(btn);
            target.appendChild(row);
        }

        function createSectionDescription(target, text) {
            const row = document.createElement('div');
            row.textContent = text;
            row.style.cssText = 'margin-bottom: 14px; font-size: 12px; font-weight: 500; line-height: 1.55; letter-spacing: 0.15px; color: rgba(255,255,255,0.52);';
            target.appendChild(row);
        }

        function createSectionHeader(target, text, preserveCase) {
            const row = document.createElement('div');
            row.textContent = text;
            row.style.cssText = 'margin-bottom: 12px; font-size: 13px; font-weight: 700; letter-spacing: 1.2px;'
                + (preserveCase ? '' : ' text-transform: uppercase;')
                + ' color: rgba(255,255,255,0.75);';
            target.appendChild(row);
        }

        function closeAllSkinSearchSuggestions() {
            document.querySelectorAll('.melee-vm-skin-search-list').forEach((el) => {
                el.style.display = 'none';
            });
        }

        function closeAllSkinLists() {
            document.querySelectorAll('.melee-vm-skin-list').forEach((el) => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.melee-vm-fav-list').forEach((el) => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.melee-vm-skin-caret').forEach((el) => {
                el.textContent = '▾';
            });
            document.querySelectorAll('.melee-vm-fav-caret').forEach((el) => {
                el.textContent = '▾';
            });
        }

        function closeAllSkinPopups() {
            closeAllSkinLists();
            closeAllSkinSearchSuggestions();
        }

        function filterSkinOptionsByQuery(options, query) {
            const q = String(query || '').trim().toLowerCase();
            if (!q) return [];

            const matches = [];
            for (const key in options) {
                if (key === 'none' || key === '') continue;
                const name = String(options[key] || '');
                const lower = name.toLowerCase();
                if (!lower.includes(q)) continue;

                let rank = 2;
                if (lower.endsWith(q)) rank = 0;
                else if (lower.startsWith(q)) rank = 1;
                matches.push({ key, name, rank });
            }

            matches.sort((a, b) => {
                if (a.rank !== b.rank) return a.rank - b.rank;
                return a.name.localeCompare(b.name);
            });

            return matches.slice(0, 12);
        }

        function createSkinSearchBar(target, options, onSelect) {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 0 6px;';
            row.innerHTML = '<span style="font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.45);">Search</span>';

            const controls = document.createElement('div');
            controls.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-shrink: 0;';

            const spacer = document.createElement('div');
            spacer.style.cssText = 'min-width: 152px; width: 152px; flex-shrink: 0;';
            controls.appendChild(spacer);

            const wrap = document.createElement('div');
            wrap.style.cssText = 'position: relative; min-width: 175px; flex-shrink: 0;';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type skin name...';
            input.autocomplete = 'off';
            input.spellcheck = false;
            input.style.cssText = 'background: rgba(0,0,0,0.35); color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 7px 12px; border-radius: 8px; font-family: inherit; font-size: 13px; min-width: 175px; width: 100%; box-sizing: border-box; outline: none; box-shadow: none;';

            const list = document.createElement('div');
            list.className = 'melee-vm-skin-search-list';
            list.style.cssText = 'display: none; position: absolute; top: calc(100% + 4px); right: 0; width: 100%; min-width: 175px; max-height: 148px; overflow-y: auto; background: #16161a; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; z-index: 100001; box-shadow: 0 6px 18px rgba(0,0,0,0.6);';

            let optionMap = options;

            function closeSuggestions() {
                list.style.display = 'none';
                list.textContent = '';
            }

            function pickSkin(key) {
                closeSuggestions();
                input.value = '';
                onSelect(key);
                input.blur();
            }

            function renderSuggestions() {
                const matches = filterSkinOptionsByQuery(optionMap, input.value);
                list.textContent = '';

                if (!matches.length) {
                    if (input.value.trim()) {
                        const empty = document.createElement('div');
                        empty.textContent = 'No matching skins';
                        empty.style.cssText = 'padding: 8px 12px; font-size: 13px; color: rgba(255,255,255,0.45);';
                        list.appendChild(empty);
                        list.style.display = 'block';
                    } else {
                        closeSuggestions();
                    }
                    return;
                }

                closeAllSkinLists();
                closeAllPreviewBubbles();

                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];
                    const item = document.createElement('div');
                    item.textContent = match.name;
                    item.dataset.key = match.key;
                    item.style.cssText = 'padding: 8px 12px; cursor: pointer; font-size: 13px; color: #ddd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
                    item.onmouseenter = () => { item.style.background = 'rgba(255,255,255,0.07)'; };
                    item.onmouseleave = () => { item.style.background = ''; };
                    item.onmousedown = (e) => e.preventDefault();
                    item.onclick = (e) => {
                        e.stopPropagation();
                        pickSkin(match.key);
                    };
                    list.appendChild(item);
                }

                list.style.display = 'block';
            }

            input.addEventListener('input', renderSuggestions);
            input.addEventListener('focus', () => {
                if (input.value.trim()) renderSuggestions();
            });
            input.addEventListener('click', (e) => e.stopPropagation());
            wrap.addEventListener('click', (e) => e.stopPropagation());

            wrap.appendChild(input);
            wrap.appendChild(list);
            controls.appendChild(wrap);
            row.appendChild(controls);
            target.appendChild(row);

            return {
                refreshOptions(newOptions) {
                    optionMap = newOptions;
                    closeSuggestions();
                    input.value = '';
                },
                close: closeSuggestions,
            };
        }

        function createCustomDropdown(target, label, options, current, cb, settings) {
            const withRandom = !!(settings && settings.random);
            const colorForKey = (settings && settings.colorForKey) || (() => '#2cff7c');

            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.08);';
            row.innerHTML = `<span style="font-size: 14px; font-weight: 600;">${label}</span>`;

            const controls = document.createElement('div');
            controls.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-shrink: 0;';

            const wrap = document.createElement('div');
            wrap.style.cssText = 'position: relative; min-width: 175px; flex-shrink: 0;';

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.style.cssText = 'background: rgba(0,0,0,0.35); color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 7px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 13px; min-width: 175px; width: 100%; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; outline: none; box-shadow: none;';

            const btnLabel = document.createElement('span');
            btnLabel.textContent = options[current] || current;
            btnLabel.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left;';

            const caret = document.createElement('span');
            caret.className = 'melee-vm-skin-caret';
            caret.textContent = '▾';
            caret.style.cssText = 'margin-left: 8px; opacity: 0.6; flex-shrink: 0;';

            btn.appendChild(btnLabel);
            btn.appendChild(caret);

            const list = document.createElement('div');
            list.className = 'melee-vm-skin-list';
            list.style.cssText = 'display: none; position: absolute; top: calc(100% + 4px); bottom: auto; right: 0; width: 100%; min-width: 175px; max-height: 148px; overflow-y: auto; background: #16161a; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; z-index: 100001; box-shadow: 0 6px 18px rgba(0,0,0,0.6);';

            let selectedKey = current;
            let optionMap = options;

            function paintSelection(key) {
                selectedKey = key;
                btnLabel.textContent = optionMap[key] || key;
                btnLabel.style.color = colorForKey(key);
                for (let i = 0; i < list.children.length; i++) {
                    const child = list.children[i];
                    const sel = child.dataset.key === key;
                    if (sel) {
                        child.style.color = colorForKey(key);
                        child.style.fontWeight = '700';
                    } else {
                        child.style.color = '#ddd';
                        child.style.fontWeight = '';
                    }
                }
            }

            function closeList() {
                list.style.display = 'none';
                list.style.position = 'absolute';
                list.style.top = 'calc(100% + 4px)';
                list.style.bottom = 'auto';
                list.style.left = '';
                list.style.right = '0';
                list.style.width = '100%';
                list.style.minWidth = '175px';
                caret.textContent = '▾';
            }

            function openList() {
                closeAllSkinPopups();
                list.style.display = 'block';
                caret.textContent = '▴';

                const wrapRect = wrap.getBoundingClientRect();
                const listHeight = Math.min(list.scrollHeight, 148);
                const spaceBelow = window.innerHeight - wrapRect.bottom - 8;
                const spaceAbove = wrapRect.top - 8;
                const openUp = spaceBelow < listHeight && spaceAbove >= spaceBelow;

                list.style.position = 'fixed';
                list.style.width = `${wrapRect.width}px`;
                list.style.minWidth = `${wrapRect.width}px`;
                list.style.left = `${wrapRect.left}px`;
                list.style.right = 'auto';

                if (openUp) {
                    list.style.top = 'auto';
                    list.style.bottom = `${window.innerHeight - wrapRect.top + 4}px`;
                } else {
                    list.style.top = `${wrapRect.bottom + 4}px`;
                    list.style.bottom = 'auto';
                }

                const sel = list.querySelector(`[data-key="${selectedKey}"]`);
                if (sel) {
                    list.scrollTop = Math.max(0, sel.offsetTop - (list.clientHeight - sel.offsetHeight) / 2);
                }
            }

            function applySelection(key) {
                paintSelection(key);
                closeList();
                cb(key);
                btn.blur();
            }

            let resetBtn = null;
            let randomBtn = null;
            if (withRandom) {
                const actionBtnCss = 'padding: 7px 10px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; transition: background 0.15s, border-color 0.15s, color 0.15s; white-space: nowrap; outline: none; box-shadow: none;';

                resetBtn = document.createElement('button');
                resetBtn.type = 'button';
                resetBtn.textContent = 'RESET';
                resetBtn.style.cssText = actionBtnCss + 'background: rgba(255,56,96,0.12); color: #ff3860; border: 1px solid rgba(255,56,96,0.45);';
                resetBtn.onmouseenter = () => {
                    resetBtn.style.background = 'rgba(255,56,96,0.22)';
                    resetBtn.style.borderColor = 'rgba(255,56,96,0.65)';
                    resetBtn.style.color = '#ff6b88';
                };
                resetBtn.onmouseleave = () => {
                    resetBtn.style.background = 'rgba(255,56,96,0.12)';
                    resetBtn.style.borderColor = 'rgba(255,56,96,0.45)';
                    resetBtn.style.color = '#ff3860';
                };
                resetBtn.onclick = (e) => {
                    e.stopPropagation();
                    applySelection('none');
                    resetBtn.blur();
                };

                randomBtn = document.createElement('button');
                randomBtn.type = 'button';
                randomBtn.textContent = 'RANDOM';
                randomBtn.style.cssText = actionBtnCss + 'background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.15);';
                randomBtn.onmouseenter = () => {
                    randomBtn.style.background = 'rgba(196,92,255,0.12)';
                    randomBtn.style.borderColor = 'rgba(196,92,255,0.45)';
                    randomBtn.style.color = '#c45cff';
                };
                randomBtn.onmouseleave = () => {
                    randomBtn.style.background = 'rgba(255,255,255,0.05)';
                    randomBtn.style.borderColor = 'rgba(255,255,255,0.15)';
                    randomBtn.style.color = '#fff';
                };
                randomBtn.onclick = (e) => {
                    e.stopPropagation();
                    const keys = Object.keys(optionMap).filter(k => k !== 'none' && k !== '');
                    if (!keys.length) return;
                    applySelection(keys[Math.floor(Math.random() * keys.length)]);
                    randomBtn.blur();
                };
            }

            function rebuildListItems() {
                list.textContent = '';
                for (let k in optionMap) {
                    const item = document.createElement('div');
                    item.textContent = optionMap[k];
                    item.dataset.key = k;
                    const isSelected = k === selectedKey;
                    item.style.cssText = 'padding: 8px 12px; cursor: pointer; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' + (isSelected ? `color: ${colorForKey(k)}; font-weight: 700;` : 'color: #ddd;');
                    item.onmouseenter = () => { item.style.background = 'rgba(255,255,255,0.07)'; };
                    item.onmouseleave = () => { item.style.background = ''; };
                    item.onclick = (e) => {
                        e.stopPropagation();
                        applySelection(k);
                    };
                    list.appendChild(item);
                }
            }

            rebuildListItems();

            btn.onclick = (e) => {
                e.stopPropagation();
                if (list.style.display === 'none') openList();
                else closeList();
                btn.blur();
            };

            wrap.appendChild(btn);
            wrap.appendChild(list);
            if (resetBtn) controls.appendChild(resetBtn);
            if (randomBtn) controls.appendChild(randomBtn);
            controls.appendChild(wrap);
            row.appendChild(controls);
            target.appendChild(row);

            paintSelection(current);

            return {
                get value() { return selectedKey; },
                setValue: paintSelection,
                applyValue: applySelection,
                close: closeList,
                refreshOptions(newOptions, newCurrent) {
                    optionMap = newOptions;
                    rebuildListItems();
                    const nextKey = newCurrent !== undefined
                        ? newCurrent
                        : (optionMap[selectedKey] !== undefined ? selectedKey : '');
                    paintSelection(nextKey in optionMap ? nextKey : (Object.keys(optionMap)[0] || ''));
                },
            };
        }

        function createSkinDropdown(target, label, options, current, cb) {
            return createCustomDropdown(target, label, options, current, cb, {
                random: true,
                colorForKey: (key) => (key === 'none' ? '#ff3860' : '#2cff7c'),
            });
        }

        function createFavoritesDropdown(target, allOptions, storageKey, onSelect) {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0 0 10px; margin-top: -6px;';

            const controls = document.createElement('div');
            controls.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: auto;';

            const spacer = document.createElement('div');
            spacer.style.cssText = 'min-width: 152px; width: 152px; flex-shrink: 0;';
            controls.appendChild(spacer);

            const slot = document.createElement('div');
            slot.style.cssText = 'min-width: 175px; width: 175px; flex-shrink: 0; display: flex; justify-content: flex-end;';

            const wrap = document.createElement('div');
            wrap.style.cssText = 'position: relative; min-width: 120px; width: 120px; flex-shrink: 0;';

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.style.cssText = 'background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.42); border: 1px solid rgba(255,255,255,0.07); padding: 5px 10px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 600; min-width: 120px; width: 100%; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; outline: none; box-shadow: none; letter-spacing: 0.3px; transition: background 0.15s, border-color 0.15s, color 0.15s;';

            const btnLabel = document.createElement('span');
            btnLabel.textContent = 'Favorites';

            const caret = document.createElement('span');
            caret.className = 'melee-vm-fav-caret';
            caret.textContent = '▾';
            caret.style.cssText = 'margin-left: 6px; opacity: 0.45; flex-shrink: 0; font-size: 10px;';

            btn.appendChild(btnLabel);
            btn.appendChild(caret);

            const list = document.createElement('div');
            list.className = 'melee-vm-fav-list';
            list.style.cssText = 'display: none; position: absolute; top: calc(100% + 4px); right: 0; width: 100%; min-width: 120px; max-height: 120px; overflow-y: auto; background: #16161a; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; z-index: 100001; box-shadow: 0 4px 14px rgba(0,0,0,0.55);';

            function getFavoriteOptions() {
                return buildFavoritesOptions(allOptions, loadFavoriteSkins(storageKey));
            }

            function closeList() {
                list.style.display = 'none';
                list.style.position = 'absolute';
                list.style.top = 'calc(100% + 4px)';
                list.style.bottom = 'auto';
                list.style.left = '';
                list.style.right = '0';
                list.style.width = '100%';
                list.style.minWidth = '120px';
                caret.textContent = '▾';
            }

            function openList() {
                closeAllSkinPopups();
                rebuildListItems();
                list.style.display = 'block';
                caret.textContent = '▴';

                const wrapRect = wrap.getBoundingClientRect();
                const listHeight = Math.min(list.scrollHeight, 120);
                const spaceBelow = window.innerHeight - wrapRect.bottom - 8;
                const spaceAbove = wrapRect.top - 8;
                const openUp = spaceBelow < listHeight && spaceAbove >= spaceBelow;

                list.style.position = 'fixed';
                list.style.width = wrapRect.width + 'px';
                list.style.minWidth = wrapRect.width + 'px';
                list.style.left = wrapRect.left + 'px';
                list.style.right = 'auto';

                if (openUp) {
                    list.style.top = 'auto';
                    list.style.bottom = (window.innerHeight - wrapRect.top + 4) + 'px';
                } else {
                    list.style.top = (wrapRect.bottom + 4) + 'px';
                    list.style.bottom = 'auto';
                }
            }

            function rebuildListItems() {
                list.textContent = '';
                const favOptions = getFavoriteOptions();
                const keys = Object.keys(favOptions);

                if (!keys.length) {
                    const empty = document.createElement('div');
                    empty.textContent = 'No favorites yet';
                    empty.style.cssText = 'padding: 8px 10px; font-size: 11px; color: rgba(255,255,255,0.35); cursor: default;';
                    list.appendChild(empty);
                    return;
                }

                for (let i = 0; i < keys.length; i++) {
                    const k = keys[i];
                    const item = document.createElement('div');
                    item.textContent = favOptions[k];
                    item.dataset.key = k;
                    item.style.cssText = 'padding: 7px 10px; cursor: pointer; font-size: 11px; color: #ccc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
                    item.onmouseenter = function () { item.style.background = 'rgba(255,255,255,0.06)'; };
                    item.onmouseleave = function () { item.style.background = ''; };
                    item.onclick = function (e) {
                        e.stopPropagation();
                        closeList();
                        onSelect(k);
                        btn.blur();
                    };
                    list.appendChild(item);
                }
            }

            btn.onmouseenter = function () {
                btn.style.background = 'rgba(255,255,255,0.05)';
                btn.style.borderColor = 'rgba(255,255,255,0.11)';
                btn.style.color = 'rgba(255,255,255,0.55)';
            };
            btn.onmouseleave = function () {
                btn.style.background = 'rgba(255,255,255,0.03)';
                btn.style.borderColor = 'rgba(255,255,255,0.07)';
                btn.style.color = 'rgba(255,255,255,0.42)';
            };

            btn.onclick = function (e) {
                e.stopPropagation();
                if (list.style.display === 'none') openList();
                else closeList();
                btn.blur();
            };

            wrap.appendChild(btn);
            wrap.appendChild(list);
            slot.appendChild(wrap);
            controls.appendChild(slot);
            row.appendChild(controls);
            target.appendChild(row);

            return {
                refresh: rebuildListItems,
                close: closeList,
            };
        }

        document.addEventListener('click', () => {
            closeAllSkinPopups();
            closeAllPreviewBubbles();
        });

        function makeRarityPill(rarity) {
            const style = RARITY_STYLES[rarity] || RARITY_STYLES.Mythical;
            const pill = document.createElement('span');
            pill.textContent = rarity;
            Object.assign(pill.style, {
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.3px',
                background: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
                textShadow: style.shadow,
                boxShadow: '0 2px 6px rgba(0,0,0,0.45)',
            });
            return pill;
        }

        function makeInfoRow(label, value) {
            const row = document.createElement('div');
            row.style.cssText = 'margin-bottom: 8px; font-size: 12px; line-height: 1.45;';
            row.innerHTML = `<span style="color: rgba(255,255,255,0.55);">${label}</span><br>`;
            const val = document.createElement('span');
            val.textContent = value;
            val.style.cssText = 'color: #fff; font-weight: 600; word-break: break-all;';
            row.appendChild(val);
            return row;
        }

        function makeSkinPreviewBox(target, weaponType, skinOptions, favoriteStorageKey, onFavoritesChanged) {
            const wrap = document.createElement('div');
            Object.assign(wrap.style, {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                marginBottom: '4px',
                position: 'relative',
            });

            const box = document.createElement('div');
            Object.assign(box.style, {
                width: '110px',
                height: '110px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box',
                cursor: 'pointer',
            });

            const img = document.createElement('img');
            Object.assign(img.style, {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'none',
                pointerEvents: 'none',
            });
            img.alt = '';

            const bubble = document.createElement('div');
            bubble.className = 'melee-vm-preview-bubble';
            Object.assign(bubble.style, {
                display: 'none',
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '220px',
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(165deg, #1a1a20 0%, #101014 100%)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 10px 28px rgba(0,0,0,0.65)',
                zIndex: '100002',
                boxSizing: 'border-box',
            });
            bubble.onclick = (e) => e.stopPropagation();

            const bubbleBody = document.createElement('div');
            bubble.appendChild(bubbleBody);

            box.appendChild(img);
            wrap.appendChild(box);
            wrap.appendChild(bubble);
            target.appendChild(wrap);

            let currentKey = 'none';
            let bubbleOpen = false;

            function renderBubble() {
                bubbleBody.textContent = '';
                if (currentKey === 'none') {
                    const msg = document.createElement('div');
                    msg.textContent = 'Using your equipped skin. Select a swap to preview texture info.';
                    msg.style.cssText = 'font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.7);';
                    bubbleBody.appendChild(msg);
                    return;
                }
                const file = normalizeTextureFilename(currentKey) || currentKey;
                const name = skinOptions[currentKey] || SKIN_NAMES[currentKey] || 'Unknown';
                const rarity = SKIN_RARITY[file] || SKIN_RARITY[currentKey] || 'Mythical';

                const title = document.createElement('div');
                title.textContent = name;
                title.style.cssText = 'font-size: 15px; font-weight: 700; margin-bottom: 10px; color: #fff;';
                bubbleBody.appendChild(title);

                const rarityRow = document.createElement('div');
                rarityRow.style.cssText = 'margin-bottom: 10px;';
                rarityRow.appendChild(makeRarityPill(rarity));
                bubbleBody.appendChild(rarityRow);

                bubbleBody.appendChild(makeInfoRow('Weapon', weaponType));
                bubbleBody.appendChild(makeInfoRow('Texture', file));

                const actionRow = document.createElement('div');
                actionRow.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-top: 10px;';

                const copyBtn = document.createElement('button');
                copyBtn.type = 'button';
                copyBtn.textContent = 'Copy';
                const copyBase = {
                    flex: '1',
                    minWidth: '0',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.65)',
                    fontFamily: 'inherit',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.4px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: 'none',
                    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                };
                Object.assign(copyBtn.style, copyBase);

                const favBtn = document.createElement('button');
                favBtn.type = 'button';
                favBtn.title = 'Favorite';
                favBtn.style.cssText = 'flex-shrink: 0; width: 28px; height: 28px; padding: 0; border: none; background: transparent; font-family: inherit; font-size: 16px; line-height: 1; cursor: pointer; outline: none; box-shadow: none; transition: color 0.15s, text-shadow 0.15s, transform 0.12s;';

                function paintFavoriteBtn() {
                    const favorited = isFavoriteSkin(favoriteStorageKey, currentKey);
                    favBtn.textContent = favorited ? '\u2665' : '\u2661';
                    favBtn.style.color = favorited ? '#ff6b9d' : 'rgba(255,255,255,0.35)';
                    favBtn.style.textShadow = favorited ? '0 0 10px rgba(255,107,157,0.65)' : 'none';
                }

                paintFavoriteBtn();

                favBtn.onmouseenter = function () {
                    if (!isFavoriteSkin(favoriteStorageKey, currentKey)) {
                        favBtn.style.color = 'rgba(255,255,255,0.55)';
                    }
                };
                favBtn.onmouseleave = function () {
                    paintFavoriteBtn();
                };
                favBtn.onclick = function (e) {
                    e.stopPropagation();
                    toggleFavoriteSkin(favoriteStorageKey, currentKey);
                    paintFavoriteBtn();
                    if (onFavoritesChanged) onFavoritesChanged();
                    favBtn.blur();
                };

                const fullUrl = TEXTURE_CDN + file;
                let copyTimer = null;
                copyBtn.onmouseenter = () => {
                    if (copyBtn.textContent === 'Copy') {
                        copyBtn.style.background = 'rgba(255,255,255,0.07)';
                        copyBtn.style.color = 'rgba(255,255,255,0.85)';
                    }
                };
                copyBtn.onmouseleave = () => {
                    if (copyBtn.textContent === 'Copy') {
                        Object.assign(copyBtn.style, copyBase);
                    }
                };
                copyBtn.onclick = (e) => {
                    e.stopPropagation();
                    copyTextWithFallback(fullUrl).then(() => {
                        copyBtn.textContent = 'Copied!';
                        copyBtn.style.color = '#2cff7c';
                        copyBtn.style.borderColor = 'rgba(44,255,124,0.35)';
                        copyBtn.style.background = 'rgba(44,255,124,0.08)';
                        if (copyTimer) clearTimeout(copyTimer);
                        copyTimer = setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                            Object.assign(copyBtn.style, copyBase);
                            copyTimer = null;
                        }, 1200);
                    }).catch(() => {});
                    copyBtn.blur();
                };

                actionRow.appendChild(copyBtn);
                actionRow.appendChild(favBtn);
                bubbleBody.appendChild(actionRow);
            }

            function positionBubble() {
                const boxRect = box.getBoundingClientRect();
                const gap = 6;
                bubble.style.position = 'fixed';
                bubble.style.width = '220px';
                bubble.style.left = (boxRect.left + boxRect.width / 2) + 'px';
                bubble.style.transform = 'translateX(-50%)';
                bubble.style.bottom = 'auto';

                const bubbleH = bubble.offsetHeight || 210;
                const top = boxRect.bottom + gap;
                if (top + bubbleH > window.innerHeight - 8 && boxRect.top > bubbleH + gap + 8) {
                    bubble.style.top = 'auto';
                    bubble.style.bottom = (window.innerHeight - boxRect.top + gap) + 'px';
                } else {
                    bubble.style.top = top + 'px';
                    bubble.style.bottom = 'auto';
                }
            }

            function resetBubblePosition() {
                bubble.style.position = 'absolute';
                bubble.style.top = 'calc(100% + 6px)';
                bubble.style.left = '50%';
                bubble.style.transform = 'translateX(-50%)';
                bubble.style.bottom = 'auto';
            }

            function setBubbleOpen(open) {
                if (open) {
                    closeAllPreviewBubbles();
                    bubbleOpen = true;
                    renderBubble();
                    bubble.style.display = 'block';
                    positionBubble();
                } else {
                    bubbleOpen = false;
                    bubble.style.display = 'none';
                    resetBubblePosition();
                }
            }

            box.onclick = (e) => {
                e.stopPropagation();
                setBubbleOpen(!bubbleOpen);
            };

            previewBubbleControllers.push({
                forceClose: function () {
                    bubbleOpen = false;
                    bubble.style.display = 'none';
                    resetBubblePosition();
                },
            });

            return (textureKey) => {
                currentKey = textureKey || 'none';
                const file = normalizeTextureFilename(textureKey);
                if (!file || textureKey === 'none') {
                    img.style.display = 'none';
                    img.removeAttribute('src');
                    setBubbleOpen(false);
                    return;
                }
                preloadSwapTexture(textureKey);
                img.src = TEXTURE_CDN + file;
                img.style.display = 'block';
                if (bubbleOpen) {
                    renderBubble();
                    positionBubble();
                }
            };
        }

        function makeSwapperDivider(target) {
            const divider = document.createElement('div');
            Object.assign(divider.style, {
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
                margin: '14px 0 6px',
            });
            target.appendChild(divider);
        }

        const mainCard = makeCard(mainTab);
        createSectionHeader(mainCard, 'Knife Only');
        createOption(mainCard, 'Melee Only', cfg.meleeOnlyEnabled, v => {
            cfg.meleeOnlyEnabled = v;
            syncCfgFlags();
            localStorage.setItem('kirka-melee-enabled', v);
        }, MUTED_LABEL);
        createSectionDescription(mainCard, 'KNIFE ONLY: Hides every gun in first person and leaves only your melee (bayonet or tomahawk). The script hooks the game\u2019s WebGL renderer \u2014 while your viewmodel draws, it checks each texture hash against a whitelist and skips anything not on that list (it doesn\u2019t actually detect knives, only known bayonet/tomahawk texture files 6/13/26). Client-side only. Kirka please just add this lol');
        if (mainCard.lastElementChild) mainCard.lastElementChild.style.marginTop = '10px';
        createOption(mainCard, 'Wireframe (melee only)', cfg.wireframeMeleeEnabled, v => {
            cfg.wireframeMeleeEnabled = v;
            syncCfgFlags();
            localStorage.setItem('kirka-wireframe-melee-enabled', v);
        }, MUTED_LABEL);
        createSectionDescription(mainCard, 'WIREFRAME: Draws your melee as wireframe lines instead of a solid model. Only affects your viewmodel.');
        if (mainCard.lastElementChild) mainCard.lastElementChild.style.marginTop = '10px';

        const swapperCard = makeCard(swapperTab);
        swapperCard.style.overflow = 'visible';
        swapperCard.style.paddingBottom = SWAPPER_PREVIEW_RESERVE;
        createSectionDescription(swapperCard, 'TEXTURE SWAP: Intercepts your current melee texture and replaces it with the one you choose below. (Client side only)');

        let updateBayonetPreview = () => {};
        const applyBayonetSkin = (v) => {
            cfg.skinSwapBayonet = v;
            syncCfgFlags();
            localStorage.setItem('kirka-skin-swap-bayonet', v);
            if (v !== 'none') {
                preloadSwapTexture(v, function () {
                    requestRefreshMeleeSwap('bayonet');
                });
            }
            requestRefreshMeleeSwap('bayonet');
            updateBayonetPreview(v);
        };
        let bayonetDropdown;
        let bayonetFavoritesDropdown;
        createSkinSearchBar(swapperCard, SWAPPABLE_BAYONET_SKINS, (key) => {
            bayonetDropdown.applyValue(key);
        });
        bayonetDropdown = createSkinDropdown(swapperCard, 'Bayonet', SWAPPABLE_BAYONET_SKINS, cfg.skinSwapBayonet, applyBayonetSkin);
        bayonetFavoritesDropdown = createFavoritesDropdown(swapperCard, SWAPPABLE_BAYONET_SKINS, FAV_STORAGE.bayonet, (key) => {
            bayonetDropdown.applyValue(key);
        });
        updateBayonetPreview = makeSkinPreviewBox(swapperCard, 'Bayonet', SWAPPABLE_BAYONET_SKINS, FAV_STORAGE.bayonet, () => {
            bayonetFavoritesDropdown.refresh();
        });
        updateBayonetPreview(cfg.skinSwapBayonet);

        makeSwapperDivider(swapperCard);

        let updateTomahawkPreview = () => {};
        const applyTomahawkSkin = (v) => {
            cfg.skinSwapTomahawk = v;
            syncCfgFlags();
            localStorage.setItem('kirka-skin-swap-tomahawk', v);
            if (v !== 'none') {
                preloadSwapTexture(v, function () {
                    requestRefreshMeleeSwap('tomahawk');
                });
            }
            requestRefreshMeleeSwap('tomahawk');
            updateTomahawkPreview(v);
        };
        let tomahawkDropdown;
        let tomahawkFavoritesDropdown;
        createSkinSearchBar(swapperCard, SWAPPABLE_TOMAHAWK_SKINS, (key) => {
            tomahawkDropdown.applyValue(key);
        });
        tomahawkDropdown = createSkinDropdown(swapperCard, 'Tomahawk', SWAPPABLE_TOMAHAWK_SKINS, cfg.skinSwapTomahawk, applyTomahawkSkin);
        tomahawkFavoritesDropdown = createFavoritesDropdown(swapperCard, SWAPPABLE_TOMAHAWK_SKINS, FAV_STORAGE.tomahawk, (key) => {
            tomahawkDropdown.applyValue(key);
        });
        updateTomahawkPreview = makeSkinPreviewBox(swapperCard, 'Tomahawk', SWAPPABLE_TOMAHAWK_SKINS, FAV_STORAGE.tomahawk, () => {
            tomahawkFavoritesDropdown.refresh();
        });
        updateTomahawkPreview(cfg.skinSwapTomahawk);
    }

    const checkBody = setInterval(() => {
        if (document.body) {
            clearInterval(checkBody);
            initMenu();
        }
    }, 500);

})();
