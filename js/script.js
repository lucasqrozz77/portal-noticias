const menuButton = document.getElementById("menuButton");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const searchButton = document.getElementById("searchButton");

// ---------- Sidebar ----------
function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
}

function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
}

if (menuButton && sidebar && overlay) {
    menuButton.addEventListener("click", openMenu);
    overlay.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener("click", closeMenu);
}

// ---------- Link ativo (barra horizontal e lateral) ----------
const paginaAtual = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".category-nav a, .sidebar-nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === paginaAtual);
});

// ---------- Busca ----------
if (searchButton) {
    searchButton.addEventListener("click", () => {
        const search = prompt("Digite o que deseja buscar:");
        if (search && search.trim() !== "") {
            alert("Você pesquisou por: " + search.trim());
        }
    });
}