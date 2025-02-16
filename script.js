document.getElementById("freedomFighterName").addEventListener("change", function() {
    const newFighterSection = document.getElementById("newFighterSection");
    if (this.value === "नया सेनानी जोड़ें") {
        newFighterSection.style.display = "block";
    } else {
        newFighterSection.style.display = "none";
    }
});

// Google Sheets से स्वतंत्रता सेनानी की सूची लोड करें
const sheetID = "1fzPJ2Vr_oHww9f-iYLfMI0ztKvFBjpL8FiAoPqwxh0Q";
const sheetName = "familydata";
const apiKey = "AIzaSyDJhgzVded82rg_BCBSlAhtsGdF0QQ_6fI"; 

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

async function loadFreedomFighters() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.values) {
        const fighterList = document.getElementById("freedomFighterName");
        let uniqueFighters = new Set();

        data.values.slice(1).forEach(row => {
            uniqueFighters.add(row[1]); // सेनानी का नाम (Duplicate हटाने के लिए Set उपयोग किया)
        });

        uniqueFighters.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            fighterList.appendChild(option);
        });
    }
}

loadFreedomFighters();

// संभाग और जिला सूची को राज्य के आधार पर अपडेट करें
function populateSambhag() {
    const state = document.getElementById('state').value;
    const sambhagSelect = document.getElementById('sambhag');
    sambhagSelect.innerHTML = '<option value="">संभाग चुनें</option>';

    if (state === 'मध्य प्रदेश') {
        const sambhags = ['इन्दौर संभाग', 'सागर संभाग', 'उज्जैन संभाग', 'ग्वालियर संभाग', 'चंबल संभाग', 'जबलपुर संभाग', 'नर्मदापुरम संभाग', 'भोपाल संभाग', 'रीवा संभाग', 'शहडोल संभाग'];
        sambhags.forEach(sambhag => {
            const option = document.createElement('option');
            option.value = sambhag;
            option.text = sambhag;
            sambhagSelect.appendChild(option);
        });
    }
}

function populateJila() {
    const sambhag = document.getElementById('sambhag').value;
    const jilaSelect = document.getElementById('jila');
    jilaSelect.innerHTML = '<option value="">जिला चुनें</option>';

    const jilaOptions = {
        'इन्दौर संभाग': ['इंदौर', 'धार', 'खंडवा', 'खरगोन'],
        'सागर संभाग': ['सागर', 'दमोह', 'पन्ना'],
        'उज्जैन संभाग': ['उज्जैन', 'रतलाम', 'मंदसौर'],
        'ग्वालियर संभाग': ['ग्वालियर', 'शिवपुरी', 'दतिया'],
        'चंबल संभाग': ['मुरैना', 'भिंड', 'श्योपुर'],
        'जबलपुर संभाग': ['जबलपुर', 'कटनी', 'सिवनी'],
        'नर्मदापुरम संभाग': ['नर्मदापुरम', 'हरदा', 'बैतूल'],
        'भोपाल संभाग': ['भोपाल', 'रायसेन', 'राजगढ़'],
        'रीवा संभाग': ['रीवा', 'सतना', 'सीधी'],
        'शहडोल संभाग': ['शहडोल', 'अनूपपुर', 'उमरिया']
    };

    if (jilaOptions[sambhag]) {
        jilaOptions[sambhag].forEach(jila => {
            const option = document.createElement('option');
            option.value = jila;
            option.text = jila;
            jilaSelect.appendChild(option);
        });
    }
}
