document.getElementById("newFighterCheckbox").addEventListener("change", function() {
    document.getElementById("newFighter").disabled = !this.checked;
});

// स्वतंत्रता सेनानी की लिस्ट लोड करें (Google Sheets से डेटा लाने के लिए)
const sheetID = "1fzPJ2Vr_oHww9f-iYLfMI0ztKvFBjpL8FiAoPqwxh0Q";
const sheetName = "familydata";
const apiKey = "AIzaSyDJhgzVded82rg_BCBSlAhtsGdF0QQ_6fI"; 

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

async function loadFreedomFighters() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.values) {
        const fighterList = document.getElementById("fighterList");
        data.values.slice(1).forEach(row => {
            const option = document.createElement("option");
            option.value = row[1]; // सेनानी का नाम
            fighterList.appendChild(option);
        });
    }
}

loadFreedomFighters();

// संभाग और जिलों को ऑटो अपडेट करने के लिए
function populateSambhag() {
    const state = document.getElementById('state').value;
    const sambhagSelect = document.getElementById('sambhag');
    sambhagSelect.innerHTML = '<option value="">चुनें</option>';

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
    jilaSelect.innerHTML = '<option value="">चुनें</option>';

    const jilaOptions = {
        'इन्दौर संभाग': ['बड़वानी', 'बुरहानपुर', 'धार', 'इंदौर', 'झाबुआ', 'खंडवा', 'खरगोन', 'अलीराजपुर'],
        'सागर संभाग': ['छतरपुर', 'दमोह', 'पन्ना', 'सागर', 'टीकमगढ़', 'निवाड़ी'],
        'उज्जैन संभाग': ['देवास', 'मंदसौर', 'नीमच', 'रतलाम', 'शाजापुर', 'आगर मालवा', 'उज्जैन'],
        'ग्वालियर संभाग': ['अशोकनगर', 'दतिया', 'गुना', 'ग्वालियर', 'शिवपुरी'],
        'चंबल संभाग': ['मुरैना', 'भिण्ड', 'श्योपुर'],
        'जबलपुर संभाग': ['जबलपुर', 'कटनी', 'नरसिंहपुर', 'सिवनी', 'छिंदवाड़ा', 'बालाघाट', 'मंडला', 'डिंडौरी'],
        'नर्मदापुरम संभाग': ['नर्मदापुरम', 'हरदा', 'बैतूल'],
        'भोपाल संभाग': ['भोपाल', 'रायसेन', 'राजगढ़', 'सीहोर', 'विदिशा'],
        'रीवा संभाग': ['रीवा', 'सतना', 'सीधी', 'सिंगरौली', 'मऊगंज'],
        'शहडोल संभाग': ['अनूपपुर', 'उमरिया', 'शहडोल']
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
