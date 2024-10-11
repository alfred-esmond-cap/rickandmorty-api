let currentPage = 1;
let totalPages = 1;
let filters = { name: "", status: "", species: "", type: "", gender: "" };

const getCharacters = async (page = 1, filters = {}) => {
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;

  const { name, status, species, type, gender } = filters;

  name || status || species || type || gender
    ? (url += `&${new URLSearchParams(filters).toString()}`)
    : null;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { info, results } = data;
    totalPages = info.pages;
    return results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};


const loadCharacters = async () => {
  const characters = await getCharacters(currentPage, filters);
  characters ? displayCharacters(characters) : console.warn("No characters found.");
  updatePaginationInfo();
};

const displayCharacters = (characters) => {
  const characterListContainer = document.querySelector("#character-list");

  characterListContainer.innerHTML = characters
    .map(
      (character) => {
        const { id, name, species, origin, image } = character;
        return `
        <div class="character" id="${id}">
          <div class="character-image"><img src="${image}" alt="${name}" /></div>
          <div class="basic-info">
            <p>Name: ${name}</p>
            <p>Species: ${species}</p>
            <p>Origin: ${origin.name}</p>
          </div>
        </div>`;
      }
    )
    .join("");

  document.querySelectorAll(".character").forEach((characterElement) => {
    characterElement.addEventListener("click", () => {
      const id = characterElement.getAttribute("id");
      window.open(`info.html?id=${id}`, "_blank");
    });
  });
};


const getFiltersForm = () => ({
  name: document.getElementById("name").value.trim(),
  status: document.getElementById("status").value,
  species: document.getElementById("species").value.trim(),
  type: document.getElementById("type").value.trim(),
  gender: document.getElementById("gender").value,
});

const handleFilterSubmit = (e) => {
  e.preventDefault();
  filters = getFiltersForm();
  currentPage = 1;
  loadCharacters();
};

const paginationClick = () => {
  document.getElementById("pagination").addEventListener("click", (e) => {
    e.preventDefault();
    const direction = e.target.id === "prev-page" ? -1 : e.target.id === "next-page" ? 1 : 0;
    direction && currentPage + direction > 0 && currentPage + direction <= totalPages 
      ? (currentPage += direction, loadCharacters()) 
      : null;
  });
};

const updatePaginationInfo = () => {
  document.getElementById("pagination-info").innerText = `Página ${currentPage} de ${totalPages}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filter-form").addEventListener("submit", handleFilterSubmit);
    document.getElementById("reset").addEventListener("click", () => location.reload());
    paginationClick();
    loadCharacters();
});
