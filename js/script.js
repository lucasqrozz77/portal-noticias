const menuButton = document.getElementById("menuButton");
const categoryNav = document.getElementById("categoryNav");
const searchButton = document.getElementById("searchButton");

if (menuButton && categoryNav) {
    menuButton.addEventListener("click", () => {
        categoryNav.classList.toggle("show-menu");
    });
}

if (searchButton) {
    searchButton.addEventListener("click", () => {
        const search = prompt("Digite o que deseja buscar:");
        if (search && search.trim() !== "") {
            alert("Você pesquisou por: " + search.trim());
        }
    });
}
