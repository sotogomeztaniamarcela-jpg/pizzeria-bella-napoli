/* ========================================
   PIZZERÍA BELLA NAPOLI
   Filtros, WhatsApp y menú móvil
======================================== */

// WhatsApp de Colombia
const whatsappNumber = "573205359482";

// Generar enlaces de WhatsApp
function createWhatsAppLink(message) {
  return "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);
}

// Enlaces generales de pedidos
document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
  link.href = createWhatsAppLink(
    "¡Hola, Pizzería Bella Napoli! 🍕\n" +
    "Quiero conocer su menú y hacer un pedido. " +
    "¿Me pueden ayudar?"
  );

  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Pedir un producto específico
document.querySelectorAll(".add-order").forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;

    const message =
      "¡Hola, Pizzería Bella Napoli! 🍕\n\n" +
      "Estoy interesado/a en pedir: " + productName + ".\n" +
      "¿Me confirman el precio y las opciones disponibles?";

    window.open(
      createWhatsAppLink(message),
      "_blank",
      "noopener,noreferrer"
    );
  });
});

// Filtros para pizzas, entradas, bebidas y postres
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.filter;

    filterButtons.forEach(function (filter) {
      filter.classList.remove("active");
      filter.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    productCards.forEach(function (card) {
      const matches =
        category === "todas" ||
        card.dataset.category === category;

      card.hidden = !matches;
    });
  });
});

// Menú desplegable para celulares
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.setAttribute("aria-controls", "mainNav");

menuToggle.addEventListener("click", function () {
  const open = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Cerrar menú" : "Abrir menú"
  );

  menuToggle.textContent = open ? "✕" : "☰";
});

// Cerrar menú después de seleccionar una sección
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Año automático
document.getElementById("currentYear").textContent =
  new Date().getFullYear();