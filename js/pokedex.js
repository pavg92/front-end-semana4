
const fetchPokemon = (url) => {
    
    // const url = `https://pokeapi.co/api/v2/pokemon/${randomPoke}`;
    fetch(url)
    .then(res => {
        if (res.status != "200") {
            console.log(res);
            notFound();
        }
        else {
            return res.json();
        }
    })
    .then(data => {
        console.log(data);
        fetchSpecies(data.species.url);
        insertInfo(data);
        moves(data.moves);
        idCurrent = data.id;
    });
};

const insertInfo = data => {
    const pokeName = document.getElementById('pokeName');
    const pokeImage = document.getElementById('pokeImage');
    const pokeNumber = document.getElementById('pokeNumber');
    const pokeHeight = document.getElementById('height');
    const pokeWeight = document.getElementById('weight');

    pokeName.innerHTML = data.name;
    pokeImage.src = data.sprites.other['official-artwork'].front_default;
    pokeNumber.innerHTML = data.id;
    pokeHeight.innerHTML = data.height/10;
    pokeWeight.innerHTML = data.weight/10;
    showTypes(data.types);
    showAbilities(data.abilities);
    showStats(data.stats);
    
};

const showTypes = types =>{
    const type1 = document.getElementById('type1');
    const type2 = document.getElementById('type2');

    type2.style.display = 'none';

    type1.innerHTML = types[0].type.name;
    type1.classList.replace(type1.classList.item(3),types[0].type.name);
    
    if (types.length == 2) {
        type2.innerHTML = types[1].type.name;
        type2.classList.replace(type2.classList.item(3),types[1].type.name);
        type2.style.display = 'inline-block';
    }
};

const showAbilities = abilitiesArray => {
    const abilities = document.getElementById('abilities');
    const hiddenAbilities = document.getElementById('hiddenAbilities');
    let abilitiesText = [];
    let hiddenAbilitiesText = [];
    
    for (const ability of abilitiesArray) {
        if (ability.is_hidden) {   
            hiddenAbilitiesText.push(ability.ability.name);
        }else {
            abilitiesText.push(ability.ability.name);
        }
    }

    abilities.innerHTML = abilitiesText.join(', ');
    hiddenAbilities.innerHTML = hiddenAbilitiesText.join(', ');
};

const showStats = stats => {
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const spAttack = document.getElementById('spAttack');
    const spDefense = document.getElementById('spDefense');
    const speed = document.getElementById('speed');
    const total = document.getElementById('total');
    const hpBar = document.getElementById('hpBar');
    const attackBar = document.getElementById('attackBar');
    const defenseBar = document.getElementById('defenseBar');
    const spAttackBar = document.getElementById('spAttackBar');
    const spDefenseBar = document.getElementById('spDefenseBar');
    const speedBar = document.getElementById('speedBar');

    hp.innerHTML = stats[0].base_stat;
    attack.innerHTML = stats[1].base_stat;
    defense.innerHTML = stats[2].base_stat;
    spAttack.innerHTML = stats[3].base_stat;
    spDefense.innerHTML = stats[4].base_stat;
    speed.innerHTML = stats[5].base_stat;
    let totalSum = 0;
    for (let i = 0; i < stats.length; i++) {
        totalSum += stats[i].base_stat;
    }
    total.innerHTML = totalSum;
    // console.log((stats[0].base_stat*100/255)+'%')
    hpBar.style.width = (stats[0].base_stat*100/255) + '%';
    attackBar.style.width = (stats[1].base_stat*100/255) + '%';
    defenseBar.style.width = (stats[2].base_stat*100/255) + '%';
    spAttackBar.style.width = (stats[3].base_stat*100/255) + '%';
    spDefenseBar.style.width = (stats[4].base_stat*100/255) + '%';
    speedBar.style.width = (stats[5].base_stat*100/255) + '%';
};

const fetchSpecies = (url) => {
    fetch(url)
    .then(res => {
        if (res.status != "200") {
            console.log(res);
        }
        else {
            return res.json();
        }
    })
    .then(data => {
        console.log(data);
        let genera = document.getElementById('genera');
        let descripPoke = document.getElementById('descripPoke');

        genera.innerHTML = data.genera[7].genus;
        for (const descrip of data.flavor_text_entries) {
            if (descrip.language.name == 'en') {
                descripPoke.innerHTML = descrip.flavor_text;
            }
        }
    });
};

const moves = (movesList) => {
    let fragment = document.createDocumentFragment();
    const container = document.querySelector('.list-group');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    for(let move of movesList){
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = move.move.name;
        
        fragment.appendChild(item);
    }
    container.appendChild(fragment);
};

const notFound = () => {
    const pokeName = document.getElementById('pokeName');
    const pokeImage = document.getElementById('pokeImage');
    const pokeNumber = document.getElementById('pokeNumber');
    const pokeHeight = document.getElementById('height');
    const pokeWeight = document.getElementById('weight');
    const type1 = document.getElementById('type1');
    const type2 = document.getElementById('type2');
    const abilities = document.getElementById('abilities');
    const hiddenAbilities = document.getElementById('hiddenAbilities');
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const spAttack = document.getElementById('spAttack');
    const spDefense = document.getElementById('spDefense');
    const speed = document.getElementById('speed');
    const total = document.getElementById('total');
    const hpBar = document.getElementById('hpBar');
    const attackBar = document.getElementById('attackBar');
    const defenseBar = document.getElementById('defenseBar');
    const spAttackBar = document.getElementById('spAttackBar');
    const spDefenseBar = document.getElementById('spDefenseBar');
    const speedBar = document.getElementById('speedBar');
    let genera = document.getElementById('genera');
    let descripPoke = document.getElementById('descripPoke');

    pokeName.innerHTML = 'Not Found';
    pokeImage.src = 'image/notFound.png';
    pokeNumber.innerHTML = '';
    pokeHeight.innerHTML = '';
    pokeWeight.innerHTML = '';
    type1.innerHTML = '';
    type2.innerHTML = '';
    abilities.innerHTML = '';
    hiddenAbilities.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    spAttack.innerHTML = '';
    spDefense.innerHTML = '';
    speed.innerHTML = '';
    total.innerHTML = '';
    hpBar.style.width = '0%';
    attackBar.style.width = '0%';
    defenseBar.style.width = '0%';
    spAttackBar.style.width = '0%';
    spDefenseBar.style.width = '0%';
    speedBar.style.width = '0%';
    genera.innerHTML = '';
    descripPoke.innerHTML = '';
    idCurrent = 0;
};

let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let changeBtn = document.getElementById('btnChange');
let randomPoke = Math.floor(Math.random() * 898) + 1;
let urlPoke = `https://pokeapi.co/api/v2/pokemon/${randomPoke}`;
let idCurrent = 0
let change = false;

fetchPokemon(urlPoke);

prevBtn.addEventListener('click', e =>{
    let idChange = idCurrent-1;
    if (idChange > 0) {
        urlPoke = `https://pokeapi.co/api/v2/pokemon/${idChange}`;
        fetchPokemon(urlPoke);
    }
});

nextBtn.addEventListener('click', e => {
    let idChange = idCurrent + 1;
    if (idChange < 899) {
        urlPoke = `https://pokeapi.co/api/v2/pokemon/${idChange}`;
        fetchPokemon(urlPoke);
    }
});

changeBtn.addEventListener('click', e =>{
    change = !change;
    let info = document.querySelector('.infoPrin');
    let moves = document.querySelector('.moveSet');
    if(change){
        info.style.display = 'none';
        moves.style.display = 'flex'
    }else{
        info.style.display = 'block';
        moves.style.display = 'none';
    }
});