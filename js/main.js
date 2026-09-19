/* ==========================================================
   UPCYLO: site script
   1. CONFIG holds the contact details in ONE place.
   2. Fills WhatsApp, email and phone links on every page.
   3. Renders products (home, products page, detail page).
   4. Sends the forms by email.
   ========================================================== */

const CONFIG = {
  // PLACEHOLDER. Replace with the real WhatsApp number:
  // digits only, country code first, no plus sign or spaces (e.g. 2348012345678)
  whatsapp: "2340000000000",

  // All form submissions and the email links go here.
  // Swap for the correct address when the client sends it.
  email: "Upcyclensplendor@yahoo.com",

  // Phone numbers from the catalogue. Confirm these with the client.
  phones: ["+234-8078938150", "+234-8103796274"],

  // Free service that turns a form post into an email (formsubmit.co).
  // The first submission sends an activation email to the address above.
  formEndpoint: "https://formsubmit.co/ajax/",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 2. Contact links ---------- */

function waLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

function initContactLinks(root = document) {
  $$("[data-wa]", root).forEach((el) => {
    const text = el.dataset.waText || "Hi UPCYLO, I'd like to make an enquiry.";
    el.href = waLink(text);
    el.target = "_blank";
    el.rel = "noopener";
  });

  $$("[data-email]", root).forEach((el) => {
    el.href = `mailto:${CONFIG.email}`;
    if (el.dataset.email === "text") el.textContent = CONFIG.email;
  });

  $$("[data-phone]", root).forEach((el) => {
    const number = CONFIG.phones[Number(el.dataset.phone)];
    if (!number) return;
    el.href = `tel:${number.replace(/[^\d+]/g, "")}`;
    // only rewrite the visible text when the link has no child elements (icons, labels)
    if (!el.children.length) el.textContent = number;
  });

  $$("[data-year]", root).forEach((el) => (el.textContent = new Date().getFullYear()));
}

/* ---------- 3. Products ---------- */

function productUrl(product) {
  return `product.html?p=${encodeURIComponent(product.slug)}`;
}

function productCard(product) {
  const url = productUrl(product);
  return `
    <div class="col-12 col-sm-6 col-lg-4">
      <article class="product-card">
        <a class="product-card__media" href="${url}" tabindex="-1" aria-hidden="true">
          <img src="${product.image}" alt="" loading="lazy" />
        </a>
        <div class="product-card__body">
          <div class="product-card__top">
            <h3 class="product-card__name"><a href="${url}">${escapeHtml(product.name)}</a></h3>
            <span class="tag">${escapeHtml(product.material)}</span>
          </div>
          <p class="product-card__blurb">${escapeHtml(product.blurb)}</p>
        </div>
      </article>
    </div>`;
}

/* Home: featured products */
function initFeatured() {
  const target = $("#featured-products");
  if (!target || typeof PRODUCTS === "undefined") return;
  target.innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");
}

/* Products page: filters + grid */
function initProductsPage() {
  const grid = $("#product-grid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  const pills = $("#category-pills");
  const materialSelect = $("#material-select");
  const count = $("#result-count");

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  const materials = ["All materials", ...new Set(PRODUCTS.map((p) => p.material))];

  const state = { category: "All", material: "All materials" };

  pills.innerHTML = categories
    .map((c) => `<button type="button" class="filter-btn" data-category="${escapeHtml(c)}" aria-pressed="${c === "All"}">${escapeHtml(c)}</button>`)
    .join("");
  materialSelect.innerHTML = materials.map((m) => `<option>${escapeHtml(m)}</option>`).join("");

  function render() {
    const list = PRODUCTS.filter(
      (p) =>
        (state.category === "All" || p.category === state.category) &&
        (state.material === "All materials" || p.material === state.material)
    );

    count.textContent = `Showing ${list.length} of ${PRODUCTS.length} pieces`;

    if (!list.length) {
      grid.innerHTML = `
        <div class="col-12">
          <div class="empty-state">
            <h3 class="h-section h-section--sm">Nothing matches that filter</h3>
            <p>Try a different material or category, or tell us what you're after and we'll see what we can build.</p>
            <a class="btn btn-upc btn-green" data-wa data-wa-text="Hi UPCYLO, I'm looking for something I couldn't find in the catalogue." href="#"><i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp</a>
          </div>
        </div>`;
      initContactLinks(grid);
      return;
    }

    grid.innerHTML = list.map(productCard).join("");
  }

  pills.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    $$(".filter-btn", pills).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    render();
  });

  materialSelect.addEventListener("change", () => {
    state.material = materialSelect.value;
    render();
  });

  render();
}

/* Product detail page */
function initProductDetail() {
  const target = $("#product-detail");
  if (!target || typeof PRODUCTS === "undefined") return;

  const slug = new URLSearchParams(window.location.search).get("p");
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    target.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <h1 class="h-section">We couldn't find that product</h1>
          <p>The link may be old, or the piece may have moved. Have a look through the full catalogue.</p>
          <a class="btn btn-upc btn-green" href="products.html">See all products</a>
        </div>
      </div>`;
    return;
  }

  document.title = `${product.name} | UPCYLO`;
  const description = $('meta[name="description"]');
  if (description) description.content = `${product.name}: ${product.blurb} Order on WhatsApp or send an enquiry.`;

  const waText = `Hi UPCYLO, I'd like to order the ${product.name}. Is it available?`;

  const related = [
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 3);

  target.innerHTML = `
    <section class="section--tight">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="index.html">Home</a> / <a href="products.html">Products</a> / ${escapeHtml(product.name)}
        </nav>
        <div class="row g-4 g-lg-5 align-items-start">
          <div class="col-lg-7">
            <div class="detail-media">
              <img src="${product.image}" alt="${escapeHtml(product.name)}, made from ${escapeHtml(product.material.toLowerCase())}" />
            </div>
          </div>
          <div class="col-lg-5">
            <div class="detail-info">
              <span class="tag">${escapeHtml(product.category)}</span>
              <h1 class="h-page detail-title">${escapeHtml(product.name)}</h1>
              <p class="lead-muted mt-0">${escapeHtml(product.blurb)}</p>
              <p class="mt-3">${escapeHtml(product.desc)}</p>
              <ul class="detail-facts">
                <li><span>Made from</span><strong>${escapeHtml(product.material)}</strong></li>
                <li><span>Great for</span><strong>${escapeHtml(product.where)}</strong></li>
                <li><span>Price</span><strong>On request</strong></li>
              </ul>
              <div class="d-grid d-sm-flex gap-3">
                <a class="btn btn-upc btn-green" data-wa data-wa-text="${escapeHtml(waText)}" href="#"><i class="fa-brands fa-whatsapp"></i> Order on WhatsApp</a>
                <a class="btn btn-upc btn-ink" href="#enquiry">Send an enquiry</a>
              </div>
              <p class="mt-3 mb-0 text-muted-ink small">Want a different size, colour or finish? <a href="custom-orders.html">Ask for a custom version.</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="enquiry">
      <div class="container">
        <div class="row g-4 g-lg-5">
          <div class="col-lg-5">
            <h2 class="h-section">Send an enquiry about the ${escapeHtml(product.name)}</h2>
            <p class="lead-muted">Fill this in and we'll get back to you with availability, price and next steps.</p>
          </div>
          <div class="col-lg-7">
            <form class="form-card needs-validation" data-upcylo-form novalidate>
              <input type="hidden" name="_subject" value="Product enquiry: ${escapeHtml(product.name)}" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" class="d-none" tabindex="-1" autocomplete="off" />
              <input type="hidden" name="Product" value="${escapeHtml(product.name)}" />
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label" for="enq-name">Your name</label>
                  <input class="form-control" id="enq-name" name="Name" type="text" required autocomplete="name" />
                  <div class="invalid-feedback">Please tell us your name.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="enq-phone">Phone or WhatsApp number</label>
                  <input class="form-control" id="enq-phone" name="Phone" type="tel" required autocomplete="tel" />
                  <div class="invalid-feedback">We need a number to reply to.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="enq-email">Email <span class="form-text-optional">(optional)</span></label>
                  <input class="form-control" id="enq-email" name="Email" type="email" autocomplete="email" />
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="enq-qty">How many?</label>
                  <input class="form-control" id="enq-qty" name="Quantity" type="number" min="1" value="1" />
                </div>
                <div class="col-12">
                  <label class="form-label" for="enq-msg">Anything else we should know? <span class="form-text-optional">(optional)</span></label>
                  <textarea class="form-control" id="enq-msg" name="Message" placeholder="Size, colour, where it's going, when you need it"></textarea>
                </div>
                <div class="col-12">
                  <button class="btn btn-upc btn-ink" type="submit">Send enquiry</button>
                </div>
              </div>
              <div class="form-status" role="status" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="section-head">
          <h2 class="h-section">You might also like</h2>
          <a class="link-arrow" href="products.html">See all products <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="row g-4">${related.map(productCard).join("")}</div>
      </div>
    </section>`;

  initContactLinks(target);
  initForms(target);
}

/* ---------- 4. Forms ---------- */

function initForms(root = document) {
  $$("form[data-upcylo-form]", root).forEach((form) => {
    if (form.dataset.bound) return;
    form.dataset.bound = "true";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const button = form.querySelector('[type="submit"]');
      const status = form.querySelector(".form-status");
      const originalLabel = button.innerHTML;
      button.disabled = true;
      button.textContent = "Sending...";
      status.className = "form-status";
      status.textContent = "";

      try {
        const response = await fetch(CONFIG.formEndpoint + CONFIG.email, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const data = await response.json();
        if (!response.ok || String(data.success) !== "true") throw new Error("Send failed");

        form.reset();
        form.classList.remove("was-validated");
        status.className = "form-status alert alert-success mb-0";
        status.textContent = "Thanks, we've got it. We'll reply as soon as we can.";
      } catch (error) {
        status.className = "form-status alert alert-danger mb-0";
        status.innerHTML = `That didn't go through. Please try again, or <a class="alert-link" data-wa href="#">message us on WhatsApp</a> instead.`;
        initContactLinks(status);
      } finally {
        button.disabled = false;
        button.innerHTML = originalLabel;
      }
    });
  });
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initFeatured();
  initProductsPage();
  initProductDetail();
  initContactLinks();
  initForms();
});
