let vehicles =[];
// Get HTML elements
document.addEventListener("DOMContentLoaded", function () {
    const vehicleForm = document.getElementById("vehicleForm");
    const vehicleFormContainer = document.getElementById("vehicleFormContainer");
    const vehicleList = document.getElementById("vehicleList");
    const emptyVehicles = document.getElementById("emptyVehicles");
    const showVehicleForm = document.getElementById("showVehicleForm");
    const cancelVehicleForm = document.getElementById("cancelVehicleForm");
    document.getElementById("totalVehicles").textContent = vehicles.length;
}); 

// Show the vehicle form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showVehicleForm").addEventListener("click", function () {
        vehicleFormContainer.style.display = "block";
    });
});

// Hide the vehicle form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cancelVehicleForm").addEventListener("click", function () {
        vehicleFormContainer.style.display = "none";
        vehicleForm.reset();
    });
});

// Add a new vehicle
document.addEventListener("DOMContentLoaded", function () {
vehicleForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const make = document.getElementById("vehicleMake").value.trim();
    const model = document.getElementById("vehicleModel").value.trim();
    const year = Number(document.getElementById("vehicleYear").value);
    const mileage = Number(document.getElementById("vehicleMileage").value);

    // Basic validation
    const currentYear = new Date().getFullYear();

    if (!make || !model || !Number.isInteger(year) ||
        year < 1886 || year > currentYear + 1 ||
        !Number.isInteger(mileage) || mileage < 0) {
        alert("Please enter valid vehicle information.");
        return;
    }

    // Create vehicle object
    const vehicle = {
        id: Date.now(),
        make: make,
        model: model,
        year: year,
        mileage: mileage
    };

    // Add vehicle to array
    vehicles.push(vehicle);
    document.getElementById("totalVehicles").textContent = vehicles.length;

    // Update vehicle display
    displayVehicles();

    // Reset and hide form
    vehicleForm.reset();
    vehicleFormContainer.style.display = "none";
});
});
// Display all vehicles
function displayVehicles() {

    // Clear existing cards
    vehicleList.replaceChildren();

    // Display empty message if no vehicles exist
    emptyVehicles.style.display =
        vehicles.length === 0 ? "block" : "none";

    // Create a card for each vehicle
    vehicles.forEach(function (vehicle) {

        const card = document.createElement("div");
        card.className = "vehicle-card";

        const image = document.createElement("div");
        image.className = "vehicle-image";
        image.textContent = "🚘";

        const details = document.createElement("div");
        details.className = "vehicle-details";

        const status = document.createElement("span");
        status.className = "vehicle-status";
        status.textContent = "Active";

        const title = document.createElement("h3");
        title.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

        const vehicleID = document.createElement("p");
        vehicleID.textContent = `Vehicle ID: VH-${vehicle.id}`;

        const info = document.createElement("div");
        info.className = "vehicle-info";

        const mileageInfo = document.createElement("div");

        const mileageLabel = document.createElement("small");
        mileageLabel.textContent = "Mileage";

        const mileageValue = document.createElement("strong");
        mileageValue.textContent =
            `${vehicle.mileage.toLocaleString()} mi`;

        mileageInfo.append(mileageLabel, mileageValue);
        info.appendChild(mileageInfo);

        const actions = document.createElement("div");
        actions.className = "vehicle-card-actions";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-vehicle";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteVehicle(vehicle.id);
        });

        actions.appendChild(deleteButton);

        details.append(
            status,
            title,
            vehicleID,
            info,
            actions
        );

        card.append(image, details);

        vehicleList.appendChild(card);
    });
};


// Delete a vehicle
function deleteVehicle(vehicleID) {

    vehicles = vehicles.filter(function (vehicle) {
        return vehicle.id !== vehicleID;
    });
    document.getElementById("totalVehicles").textContent = vehicles.length;
    displayVehicles();
}

document.addEventListener("DOMContentLoaded", function () {
    displayVehicles();
});



// Get HTML elements
document.addEventListener("DOMContentLoaded", function () {
    const maintenanceForm = document.getElementById("maintenanceForm");
    const maintenanceFormContainer = document.getElementById("maintenanceFormContainer");
    const showMaintenanceForm = document.getElementById("showMaintenanceForm");
    const cancelMaintenanceForm = document.getElementById("cancelMaintenanceForm");
    const maintenanceVehicle = document.getElementById("maintenanceVehicle");
    const maintenanceTableBody = document.getElementById("maintenanceTableBody");
    const emptyMaintenance = document.getElementById("emptyMaintenance");

});
// Store maintenance records
let maintenanceRecords = [];

// Show form
document.addEventListener("DOMContentLoaded", function () {
    showMaintenanceForm.addEventListener("click", function () {
        populateVehicleDropdown();
        maintenanceFormContainer.style.display = "block";
    });


// Hide form
cancelMaintenanceForm.addEventListener("click", function () {
    maintenanceForm.reset();
    clearMaintenanceErrors();
    maintenanceFormContainer.style.display = "none";
});

// Populate vehicle dropdown using existing vehicles array
function populateVehicleDropdown() {

    maintenanceVehicle.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a vehicle";
    maintenanceVehicle.appendChild(defaultOption);

    vehicles.forEach(function (vehicle) {

        const option = document.createElement("option");

        option.value = vehicle.id;
        option.textContent =
            `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

        maintenanceVehicle.appendChild(option);
    });
}

// Update dropdown whenever vehicles are added or deleted
document.addEventListener("vehiclesUpdated", function () {
    populateVehicleDropdown();
});
});
// Add maintenance record
document.addEventListener("DOMContentLoaded", function () {
maintenanceForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearMaintenanceErrors();

    // Get form values
    const vehicleID = maintenanceVehicle.value;
    const description = document
        .getElementById("maintenanceDescription").value.trim();

    const date = document.getElementById("maintenanceDate").value;
    const mileageInput = document.getElementById("maintenanceMileage");
    const costInput = document.getElementById("maintenanceCost");

    const mileage = Number(mileageInput.value);
    const cost = Number(costInput.value);

    let valid = true;

    // Find selected vehicle
    const selectedVehicle = vehicles.find(function (vehicle) {
        return vehicle.id === Number(vehicleID);
    });

    // Validate vehicle
    if (!vehicleID || !selectedVehicle) {
        showMaintenanceError(
            maintenanceVehicle,
            "vehicleError",
            "Please select a registered vehicle."
        );
        valid = false;
    }

    // Validate description
    if (description === "") {
        showMaintenanceError(
            document.getElementById("maintenanceDescription"),
            "descriptionError",
            "Please enter the type of maintenance performed."
        );
        valid = false;
    }

    // Validate date
    if (!date) {
        showMaintenanceError(
            document.getElementById("maintenanceDate"),
            "dateError",
            "Please select the date of maintenance."
        );
        valid = false;
    }
    else if (date > new Date().toLocaleDateString("en-CA")) {
        showMaintenanceError(
            document.getElementById("maintenanceDate"),
            "dateError",
            "Maintenance date cannot be in the future."
        );
        valid = false;
    }

    // Validate mileage
    if (mileageInput.value.trim() === "") {
        showMaintenanceError(
            mileageInput,
            "maintenanceMileageError",
            "Please enter the vehicle mileage."
        );
        valid = false;
    }
    else if (!Number.isInteger(mileage) || mileage < 0) {
        showMaintenanceError(
            mileageInput,
            "maintenanceMileageError",
            "Mileage must be a non-negative whole number."
        );
        valid = false;
    }
    else if (selectedVehicle && mileage > selectedVehicle.mileage) {
        showMaintenanceError(
            mileageInput,
            "maintenanceMileageError",
            "Mileage cannot exceed the vehicle's current recorded mileage."
        );
        valid = false;
    }

    // Validate cost
    if (costInput.value.trim() === "") {
        showMaintenanceError(
            costInput,
            "costError",
            "Please enter the maintenance cost."
        );
        valid = false;
    }
    else if (!Number.isFinite(cost) || cost < 0) {
        showMaintenanceError(
            costInput,
            "costError",
            "Cost must be a valid non-negative amount."
        );
        valid = false;
    }

    // Stop if validation fails
    if (!valid) {
        return;
    }

    // Create maintenance record
    const record = {
        id: Date.now(),
        vehicleID: selectedVehicle.id,
        vehicleName:
            `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
        description: description,
        date: date,
        mileage: mileage,
        cost: cost
    };

    // Add record to array
    maintenanceRecords.push(record);

    // Refresh maintenance history
    displayMaintenanceRecords();

    // Reset and hide form
    maintenanceForm.reset();
    maintenanceFormContainer.style.display = "none";
});
});

// Display maintenance records
function displayMaintenanceRecords() {

    maintenanceTableBody.replaceChildren();

    emptyMaintenance.style.display =
        maintenanceRecords.length === 0 ? "block" : "none";

    // Display newest records first
    const sortedRecords = [...maintenanceRecords].sort(function (a, b) {
        return b.date.localeCompare(a.date);
    });

    sortedRecords.forEach(function (record) {

        const row = document.createElement("tr");

        const vehicleCell = document.createElement("td");
        vehicleCell.textContent = record.vehicleName;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = record.description;

        const dateCell = document.createElement("td");
        dateCell.textContent = new Date(
            record.date + "T00:00:00"
        ).toLocaleDateString();

        const mileageCell = document.createElement("td");
        mileageCell.textContent =
            `${record.mileage.toLocaleString()} mi`;

        const costCell = document.createElement("td");
        costCell.textContent = record.cost.toLocaleString(
            "en-US",
            {
                style: "currency",
                currency: "USD"
            }
        );

        row.append(
            vehicleCell,
            descriptionCell,
            dateCell,
            mileageCell,
            costCell
        );

        maintenanceTableBody.appendChild(row);
    });
}

// Display an individual validation error
function showMaintenanceError(input, errorID, message) {

    document.getElementById(errorID).textContent = message;
    input.classList.add("invalid");
}

// Clear maintenance validation errors
function clearMaintenanceErrors() {

    const errorIDs = [
        "vehicleError",
        "descriptionError",
        "dateError",
        "maintenanceMileageError",
        "costError"
    ];

    const inputIDs = [
        "maintenanceVehicle",
        "maintenanceDescription",
        "maintenanceDate",
        "maintenanceMileage",
        "maintenanceCost"
    ];

    errorIDs.forEach(function (id) {
        document.getElementById(id).textContent = "";
    });

    inputIDs.forEach(function (id) {
        document.getElementById(id).classList.remove("invalid");
    });
}

// Initial setup
populateVehicleDropdown();
displayMaintenanceRecords();

