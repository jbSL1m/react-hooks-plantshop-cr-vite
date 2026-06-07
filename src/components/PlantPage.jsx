import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = "http://localhost:6001/plants";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {// Check if the response is ok
        if (!response.ok) { throw new Error("Failed to fetch Plants"); }
        return response.json();// Parse the JSON data
      })
      .then((data) => setPlants(data))// Update the state with the fetched plants
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm />
      <Search />
      <PlantList />
    </main>
  );
}

export default PlantPage;
