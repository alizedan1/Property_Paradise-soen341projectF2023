// Assuming you're using Firebase Firestore for data storage
var propertyListContainer = document.getElementById('propertyList');

// Function to retrieve properties from Firebase and display them
function displayProperties() {
    // Replace 'properties' with your actual collection name in Firestore
    firebase.firestore().collection('properties').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var property = doc.data();
            var propertyCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${property.propertyImages[0]}" class="card-img-top" alt="Property Image">
                        <div class="card-body">
                            <h5 class="card-title">${property.propertyTitle}</h5>
                            <p>Location: ${property.location}</p>
                            <p>Price: ${property.price}</p>
                            <p>Property Year: ${property.propertyYear}</p>
                            <p>Property Type: ${property.propertyType}</p>
                            <button class="btn btn-danger" onclick="deleteProperty('${doc.id}')">Delete Property</button>
                            <a class="btn btn-primary" href="edit_property.html?id=${doc.id}">Edit Property</a>
                        </div>
                    </div>
                </div>
            `;
            propertyListContainer.innerHTML += propertyCard;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

// Function to delete a property
function deleteProperty(propertyId) {
    // Replace 'properties' with your actual collection name in Firestore
    firebase.firestore().collection('properties').doc(propertyId).delete()
    .then(function() {
        console.log("Document successfully deleted!");
        propertyListContainer.innerHTML = ""; // Clear existing properties
        displayProperties(); // Reload properties after deletion
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// Call the function to display properties when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayProperties();
});
