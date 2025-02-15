const sheetID = "1fzPJ2Vr_oHww9f-iYLfMI0ztKvFBjpL8FiAoPqwxh0Q";
const sheetName = "familydata";
const apiKey = "YOUR_GOOGLE_API_KEY"; 

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

async function fetchRegistrations() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.values) {
        const table = document.getElementById("registrationTable");
        data.values.slice(1).forEach(row => {
            const tr = document.createElement("tr");
            row.slice(0, 3).forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }
}

fetchRegistrations();
