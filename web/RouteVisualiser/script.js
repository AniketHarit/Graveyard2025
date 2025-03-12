let map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

document.getElementById('traceButton').addEventListener('click', async () => {
    let ip = document.getElementById('ip_address').value.trim();
    if (!ip) {
        alert("Please enter an IP address");
        return;
    }

    try {
        let response = await fetch(`http://ip-api.com/json/${ip}`);
        let data = await response.json();

        if (data.status !== "success") {
            alert("Could not fetch location for this IP.");
            return;
        }

        let { lat, lon } = data;
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`IP: ${ip}<br>Location: ${data.city}, ${data.country}`)
            .openPopup();

        map.setView([lat, lon], 10);
    } catch (error) {
        console.error("Error fetching IP data:", error);
        alert("Failed to fetch data. Try again later.");
    }
});
