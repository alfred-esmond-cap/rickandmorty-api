document.addEventListener("DOMContentLoaded", async () => {
  try {
    const characterId = new URLSearchParams(window.location.search).get("id");

    const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
    const character = response.data;

    document.querySelector(".complete-data").innerHTML = `
      <div class="complete-data-img">
        <img src="${character.image}" alt="${character.name}" />
      </div>
      <div class="complete-data-info">
        <p><strong>Nombre:</strong> ${character.name}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Tipo:</strong> ${character.type || "No disponible"}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <p><strong>Ubicación actual:</strong> ${character.location.name}</p>
        <p><strong>Creado:</strong> ${new Date(character.created).toLocaleDateString()}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error al obtener los datos del personaje:", error);
  }
});
