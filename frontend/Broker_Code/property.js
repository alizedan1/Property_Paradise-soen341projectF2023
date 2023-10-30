// Initialize Firebase
var firebaseConfig = {
   apiKey: "AIzaSyD2s0r0eAXlBUQ22UEpEpSF6d03FgFsBb0",
    authDomain: "propertyparadise-83a03.firebaseapp.com",
    projectId: "propertyparadise-83a03",
    storageBucket: "propertyparadise-83a03.appspot.com",
    messagingSenderId: "452198388057",
    appId: "1:452198388057:web:d4029f9a5678364f8b7c48",
    measurementId: "G-C7G8NXT1PD"
};

firebase.initializeApp(firebaseConfig);

var propertyListContainer = document.getElementById('propertyList');

function displayProperties() {
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

function deleteProperty(propertyId) {
    firebase.firestore().collection('properties').doc(propertyId).delete()
    .then(function() {
        console.log("Document successfully deleted!");
        propertyListContainer.innerHTML = "";
        displayProperties();
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayProperties();
});
