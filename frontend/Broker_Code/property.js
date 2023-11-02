// Function to retrieve properties for a specific broker
function displayBrokerProperties() {
    var propertyListContainer = document.getElementById('propertyList');
    
    // Replace 'properties' with your actual collection name in Firestore
    firebase.firestore().collection('properties').where('broker_id', '==', 'broker id').get()
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
