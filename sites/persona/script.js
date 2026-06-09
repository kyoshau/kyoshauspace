// Major Arcana Data with Persona Tarot Card Images
const arcanas = [
    {
        number: '0',
        name: 'THE FOOL',
        image: 'arcanas/jester.jpg',
        title: 'The Beginning of a Journey',
        meaning: 'You are a free spirit, unbound by convention. You embrace the unknown with childlike wonder and take risks others fear. Your path is yours alone to forge.',
        traits: ['Spontaneous', 'Optimistic', 'Adventurous', 'Fearless'],
        color: '#FFD700'
    },
    {
        number: 'I',
        name: 'THE MAGICIAN',
        image: 'arcanas/magician.jpg',
        title: 'Master of Reality',
        meaning: 'You possess the power to manifest your desires into reality. Your willpower and skill transform dreams into achievements. You are resourceful and creative.',
        traits: ['Resourceful', 'Skilled', 'Confident', 'Creative'],
        color: '#4169E1'
    },
    {
        number: 'II',
        name: 'THE PRIESTESS',
        image: 'arcanas/priestess.jpg',
        title: 'Guardian of Mysteries',
        meaning: 'You understand what others cannot see. Intuition guides you through life\'s mysteries. You are deeply connected to your inner wisdom and the unseen world.',
        traits: ['Intuitive', 'Mysterious', 'Wise', 'Spiritual'],
        color: '#9370DB'
    },
    {
        number: 'III',
        name: 'THE EMPRESS',
        image: 'arcanas/empress.jpg',
        title: 'Nurturing Creation',
        meaning: 'You embody creativity and abundance. Your nurturing nature brings growth and beauty to everything you touch. You create harmony and foster life.',
        traits: ['Nurturing', 'Abundant', 'Creative', 'Compassionate'],
        color: '#FF69B4'
    },
    {
        number: 'IV',
        name: 'THE EMPEROR',
        image: 'arcanas/emperor.jpg',
        title: 'Authority and Structure',
        meaning: 'You are a natural leader with unwavering conviction. Structure and order are your foundation. You build empires and command respect through strength and wisdom.',
        traits: ['Authoritative', 'Structured', 'Protective', 'Strategic'],
        color: '#DC143C'
    },
    {
        number: 'V',
        name: 'THE HIEROPHANT',
        image: 'arcanas/hierophant.jpg',
        title: 'Keeper of Tradition',
        meaning: 'You are the bridge between the earthly and the divine. You value tradition, education, and spiritual guidance. You teach and preserve sacred knowledge.',
        traits: ['Traditional', 'Wise', 'Spiritual', 'Mentor'],
        color: '#DAA520'
    },
    {
        number: 'VI',
        name: 'THE LOVERS',
        image: 'arcanas/lovers.jpg',
        title: 'Union and Choice',
        meaning: 'You understand the power of connection and meaningful choices. You seek harmony in relationships and make decisions from the heart. Love guides your path.',
        traits: ['Loving', 'Harmonious', 'Decisive', 'Passionate'],
        color: '#FF1493'
    },
    {
        number: 'VII',
        name: 'THE CHARIOT',
        image: 'arcanas/chariot.jpg',
        title: 'Willpower Triumphant',
        meaning: 'You charge forward with unstoppable determination. Victory comes through focused willpower and controlled aggression. You overcome all obstacles in your path.',
        traits: ['Determined', 'Victorious', 'Focused', 'Driven'],
        color: '#00CED1'
    },
    {
        number: 'VIII',
        name: 'JUSTICE',
        image: 'arcanas/justice.jpg',
        title: 'Balance and Truth',
        meaning: 'You seek fairness and truth above all else. Your judgments are sound and your actions balanced. You understand that every action has consequences.',
        traits: ['Fair', 'Truthful', 'Balanced', 'Rational'],
        color: '#4682B4'
    },
    {
        number: 'IX',
        name: 'THE HERMIT',
        image: 'arcanas/hermit.jpg',
        title: 'Inner Light',
        meaning: 'You walk alone to seek deeper truths. Solitude is your teacher, and introspection your guide. You illuminate the path for others through your wisdom.',
        traits: ['Introspective', 'Wise', 'Solitary', 'Enlightened'],
        color: '#708090'
    },
    {
        number: 'X',
        name: 'WHEEL OF FORTUNE',
        image: 'arcanas/fortune.jpg',
        title: 'Cycles of Fate',
        meaning: 'You understand that life is ever-changing. You adapt to fortune\'s turns with grace. You know that what goes up must come down, and vice versa.',
        traits: ['Adaptable', 'Lucky', 'Philosophical', 'Opportunistic'],
        color: '#FFD700'
    },
    {
        number: 'XI',
        name: 'STRENGTH',
        image: 'arcanas/hunger.jpg',
        title: 'Inner Courage',
        meaning: 'Your strength comes not from force, but from courage and compassion. You tame your inner beasts through love and patience. True power is gentle.',
        traits: ['Courageous', 'Compassionate', 'Patient', 'Resilient'],
        color: '#FF6347'
    },
    {
        number: 'XII',
        name: 'THE HANGED MAN',
        image: 'arcanas/hanged_man.jpg',
        title: 'New Perspective',
        meaning: 'You see the world differently. Through sacrifice and surrender, you gain enlightenment. Your willingness to let go brings profound understanding.',
        traits: ['Sacrificial', 'Enlightened', 'Patient', 'Unique'],
        color: '#20B2AA'
    },
    {
        number: 'XIII',
        name: 'DEATH',
        image: 'arcanas/death.jpg',
        title: 'Transformation',
        meaning: 'You are not an end, but a beginning. Transformation is your essence. You release the old to make way for the new. Rebirth follows every ending.',
        traits: ['Transformative', 'Fearless', 'Renewing', 'Profound'],
        color: '#2F4F4F'
    },
    {
        number: 'XIV',
        name: 'TEMPERANCE',
        image: 'arcanas/temperance.jpg',
        title: 'Balance and Moderation',
        meaning: 'You are the alchemist of life, blending opposites into harmony. Patience and balance are your gifts. You find the middle path in all things.',
        traits: ['Balanced', 'Patient', 'Moderate', 'Harmonious'],
        color: '#87CEEB'
    },
    {
        number: 'XV',
        name: 'THE DEVIL',
        image: 'arcanas/the_devil.jpg',
        title: 'Bondage and Freedom',
        meaning: 'You understand the chains we forge ourselves. Material desires and base instincts hold power, but you can break free. Recognition is the first step to liberation.',
        traits: ['Intense', 'Aware', 'Powerful', 'Unbound'],
        color: '#8B0000'
    },
    {
        number: 'XVI',
        name: 'THE TOWER',
        image: 'arcanas/the_tower.jpg',
        title: 'Sudden Revelation',
        meaning: 'You are the lightning that shatters illusions. Sudden change and revelation are your nature. From destruction comes clarity and new foundations.',
        traits: ['Revolutionary', 'Honest', 'Transformative', 'Bold'],
        color: '#FF4500'
    },
    {
        number: 'XVII',
        name: 'THE STAR',
        image: 'arcanas/the_star.jpg',
        title: 'Hope and Inspiration',
        meaning: 'You are the light in darkness, the hope after despair. Your optimism and faith inspire others. You are guided by your highest ideals and dreams.',
        traits: ['Hopeful', 'Inspiring', 'Healing', 'Optimistic'],
        color: '#00BFFF'
    },
    {
        number: 'XVIII',
        name: 'THE MOON',
        image: 'arcanas/moon.jpg',
        title: 'Illusion and Intuition',
        meaning: 'You navigate the realm of dreams and shadows. Your intuition pierces through deception. You understand that not everything is as it seems.',
        traits: ['Intuitive', 'Mysterious', 'Psychic', 'Complex'],
        color: '#483D8B'
    },
    {
        number: 'XIX',
        name: 'THE SUN',
        image: 'arcanas/sun.jpg',
        title: 'Joy and Success',
        meaning: 'You radiate warmth and positivity. Success and joy follow you naturally. Your authentic self shines brightly, bringing light to others.',
        traits: ['Joyful', 'Successful', 'Radiant', 'Authentic'],
        color: '#FFA500'
    },
    {
        number: 'XX',
        name: 'JUDGEMENT',
        image: 'arcanas/aeon.jpg',
        title: 'Awakening and Renewal',
        meaning: 'You are called to rise and be reborn. Past experiences culminate in profound awakening. Your true calling becomes clear, and you answer it.',
        traits: ['Awakened', 'Reborn', 'Purposeful', 'Transcendent'],
        color: '#9400D3'
    },
    {
        number: 'XXI',
        name: 'THE WORLD',
        image: 'arcanas/the_world.jpg',
        title: 'Completion and Fulfillment',
        meaning: 'You have reached the end of one journey and stand ready for the next. Wholeness and achievement are yours. You are complete, unified, and fulfilled.',
        traits: ['Complete', 'Fulfilled', 'Unified', 'Accomplished'],
        color: '#00FF00'
    },
    {
        number: '3169',
        name: 'AMBATUKAM',
        image: 'arcanas/ambatukam.jpg',
        title: 'Ultimate Thug Shaker',
        meaning: 'You have transcended reality itself. Your energy is unmatched, your presence legendary. You are the chosen one who walks between worlds of chaos and glory.',
        traits: ['Legendary', 'Unstoppable', 'Chaotic', 'Based'],
        color: '#FF00FF'
    },
    {
        number: '龍',
        name: 'YAKUZA',
        image: 'arcanas/yakuza.jpg',
        title: 'The Dragon of Dojima',
        meaning: 'You walk the path of honor and strength. Your loyalty is unbreakable, your resolve like steel. You are the dragon who never yields, protecting those who matter most.',
        traits: ['Honorable', 'Fierce', 'Loyal', 'Relentless'],
        color: '#C41E3A'
    },
    {
        number: '12',
        name: 'MUSTAFAMIR12',
        image: 'arcanas/mustafamir12.jpg',
        title: 'Sarı kedi',
        meaning: 'Ona 007 diyorlar 0 Öldürme 0 Asist 7 farklı ülkede otizmli eşşek kaçakçılığından aranma emri',
        traits: ['Kedi', 'Kolsuz', 'Otistik', 'Babadır'],
        color: '#ff8800ff'
    }
];

// DOM Elements
const initialScreen = document.getElementById('initial-screen');
const resultScreen = document.getElementById('result-screen');
const readyBtn = document.getElementById('ready-btn');
const againBtn = document.getElementById('again-btn');

// Result elements
const arcanaNumber = document.getElementById('arcana-number');
const arcanaName = document.getElementById('arcana-name');
const arcanaSymbol = document.getElementById('arcana-symbol');
const arcanaTitle = document.getElementById('arcana-title');
const arcanaMeaning = document.getElementById('arcana-meaning');
const arcanaTraits = document.getElementById('arcana-traits');

// Event Listeners
readyBtn.addEventListener('click', revealArcana);
againBtn.addEventListener('click', reset);

// Functions
function revealArcana() {
    // Random arcana selection
    const randomArcana = arcanas[Math.floor(Math.random() * arcanas.length)];

    // Fade out initial screen
    initialScreen.classList.remove('active');

    // Wait for transition, then show result
    setTimeout(() => {
        displayArcana(randomArcana);
        resultScreen.classList.add('active');
    }, 1000);
}

function displayArcana(arcana) {
    // Set card content
    arcanaNumber.textContent = arcana.number;
    arcanaName.textContent = arcana.name;
    arcanaSymbol.innerHTML = `<img src="${arcana.image}" alt="${arcana.name}" style="max-width: 100%; max-height: 350px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));">`;

    // Set description
    arcanaTitle.textContent = arcana.title;
    arcanaMeaning.textContent = arcana.meaning;

    // Set traits
    arcanaTraits.innerHTML = '';
    arcana.traits.forEach((trait, index) => {
        const traitEl = document.createElement('div');
        traitEl.className = 'trait';
        traitEl.textContent = trait;
        traitEl.style.animationDelay = `${index * 0.1 + 1}s`;
        arcanaTraits.appendChild(traitEl);
    });

    // Update card color
    const card = document.querySelector('.arcana-card');
    card.style.background = `linear-gradient(135deg, #1a1a2e 0%, ${arcana.color} 100%)`;

    // Change result screen background
    resultScreen.style.background = `radial-gradient(circle at center, ${arcana.color}15 0%, #000 70%)`;
}

function reset() {
    // Fade out result screen
    resultScreen.classList.remove('active');

    // Fade in initial screen
    setTimeout(() => {
        initialScreen.classList.add('active');
    }, 1000);
}

// Easter egg: Konami code for special arcana
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Show The World arcana
        initialScreen.classList.remove('active');
        setTimeout(() => {
            displayArcana(arcanas[21]); // The World
            resultScreen.classList.add('active');
        }, 1000);
    }
});
