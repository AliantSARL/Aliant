const map = L.map('Map').setView([43.6650551, 7.1717081], 14);

const marker = L.marker([43.6650551, 7.1717081]).addTo(map);

marker.bindPopup("Aliant").openPopup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'elsia/ckta3o8jw6j3317qo6v3mo77r',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWxzaWEiLCJhIjoiY2t0YTNkbzRlMGVzZjJvbXc1dXp1aHdhbCJ9.I53ObfEc6mLpeeTB_Rqxhg'
}).addTo(map);