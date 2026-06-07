import React, { useState }from "react";

function NewPlantForm() {
  const API_URL = "http://localhost:6001/plants";
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, price: parseFloat(price)}),
    })
      .then((response) => {// Check if the response is ok
        if (!response.ok) { throw new Error("Failed to Post Plant"); }
        return response.json();// Parse the JSON data
      })
      .then((newPlant) => {
        onAddPlant(newPlant); // Call the onAddPlant prop to update the plant list
        setName("");// Clear the form fields after successful submission
        setImage("");
        setPrice(0);
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });

  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name"
         value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL"
         value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" name="price" step="0.01" placeholder="Price"
         value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
