(function () {
  var WA = "573158386894";
  /* Tienda: filtrar, buscar y ordenar */
  var lista = document.getElementById("productos");
  if (lista) {
    var items = [].slice.call(lista.children), cat = "todo", q = "", ord = "";
    var botones = [].slice.call(document.querySelectorAll("[data-filtro]"));
    var pintar = function () {
      var vis = 0;
      items.forEach(function (li) {
        var ok = (cat === "todo" || li.dataset.cat === cat) && li.dataset.nombre.indexOf(q) > -1;
        li.hidden = !ok; if (ok) vis++;
      });
      if (ord) items.sort(function (a, b) { return ord === "asc" ? a.dataset.precio - b.dataset.precio : b.dataset.precio - a.dataset.precio; }).forEach(function (li) { lista.appendChild(li); });
      document.getElementById("sin-resultados").hidden = vis > 0;
      document.getElementById("conteo").textContent = vis + (vis === 1 ? " pieza" : " piezas");
    };
    botones.forEach(function (b) {
      b.addEventListener("click", function () {
        cat = b.dataset.filtro;
        botones.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        pintar();
      });
    });
    document.getElementById("buscar").addEventListener("input", function (e) { q = e.target.value.toLowerCase().trim(); pintar(); });
    document.getElementById("orden").addEventListener("change", function (e) { ord = e.target.value; pintar(); });
  }
  /* Contacto: abre WhatsApp con el mensaje ya escrito */
  var form = document.getElementById("form-contacto");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var t = "Hola, soy " + d.get("nombre") + " de " + d.get("ciudad") + ". Me interesa: " + d.get("interes") + ". " + d.get("mensaje");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
  });
  /* Cotizador de referencia */
  var c = document.getElementById("cotizador");
  if (c) {
    var sel = document.getElementById("cot-tipo"), qty = document.getElementById("cot-cant"), out = document.getElementById("cot-out"), a = document.getElementById("cot-wa");
    var calc = function () {
      var o = sel.options[sel.selectedIndex], n = Math.max(1, parseInt(qty.value, 10) || 1);
      out.textContent = "desde $" + (Number(o.dataset.precio) * n).toLocaleString("es-CO") + " COP";
      a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Hola, quiero cotizar " + n + " x " + o.textContent + " (" + out.textContent + ")");
    };
    sel.addEventListener("change", calc); qty.addEventListener("input", calc); calc();
  }
})();
