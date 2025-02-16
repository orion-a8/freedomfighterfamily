async function sendDataToGoogleSheets() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbx96_adl7FoalwDbU-eKuzp5g9X2CkD5U92oj5rBQvkj0KE2Gywk-AfhUbA1ymW6_dN8Q/exec"; // 🔴 यहाँ नया Deploy किया गया URL डालें।

    const formData = {
        name_user: document.getElementById("name_user").value,
        mobile_user: document.getElementById("mobile_user").value
    };

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            alert("✅ आपका डेटा सफलतापूर्वक सेव हो गया!");
            document.getElementById("registrationForm").reset();
        } else {
            alert("❌ डेटा सेव करने में समस्या आई: " + result.error);
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("❌ डेटा सेव नहीं हो सका। कृपया पुनः प्रयास करें।");
    }
}
