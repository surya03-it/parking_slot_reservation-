const parkingSpots = Array.from({ length: 5 }, (_, i) => ({ id: `Spot ${i + 1}`, occupied: false }));
const parkedVehicles = {};

function renderParkingSpots() {
    const spotList = document.getElementById("spot-list");
    spotList.innerHTML = "";
    parkingSpots.forEach(spot => {
        const li = document.createElement("li");
        li.textContent = spot.id + (spot.occupied ? " (Occupied)" : " (Available)");
        li.className = spot.occupied ? "occupied" : "available";
        spotList.appendChild(li);
    });
}

document.getElementById("park-button").addEventListener("click", () => {
    const vehicleNumber = document.getElementById("vehicle-input").value.trim();
    const availableSpot = parkingSpots.find(spot => !spot.occupied);

    if (vehicleNumber && availableSpot) {
        availableSpot.occupied = true;
        parkedVehicles[vehicleNumber] = availableSpot.id;
        document.getElementById("message").textContent = `Vehicle ${vehicleNumber} parked in ${availableSpot.id}.`;
    } else if (!vehicleNumber) {
        document.getElementById("message").textContent = "Please enter a vehicle number.";
    } else {
        document.getElementById("message").textContent = "No available parking spots.";
    }

    renderParkingSpots();
    document.getElementById("vehicle-input").value = "";
});

document.getElementById("remove-button").addEventListener("click", () => {
    const vehicleNumber = document.getElementById("vehicle-input").value.trim();

    if (parkedVehicles[vehicleNumber]) {
        const spotId = parkedVehicles[vehicleNumber];
        const spot = parkingSpots.find(s => s.id === spotId);
        spot.occupied = false;
        delete parkedVehicles[vehicleNumber];
        document.getElementById("message").textContent = `Vehicle ${vehicleNumber} removed from ${spotId}.`;
    } else if (!vehicleNumber) {
        document.getElementById("message").textContent = "Please enter a vehicle number.";
    } else {
        document.getElementById("message").textContent = "Vehicle not found.";
    }

    renderParkingSpots();
    document.getElementById("vehicle-input").value = "";
});

// Initial render
renderParkingSpots();
