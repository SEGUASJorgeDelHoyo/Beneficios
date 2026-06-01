import { getAllBeneficios } from '../data.js';

export function renderTodos() {
  const beneficios = getAllBeneficios();

  const cardsHTML = beneficios.map((b, i) => {
    const visual = b.imagen
      ? `<img class="benefit-card-img" src="${b.imagen}" alt="${b.titulo}" loading="lazy">`
      : `<div class="benefit-card-icon">${b.icono || '⭐'}</div>`;

    return `
      <article class="benefit-card" data-id="${b.id}" style="animation-delay: ${i * 0.08}s" id="card-${b.id}">
        ${visual}
        <div class="benefit-card-body">
          <h3 class="benefit-card-title">${b.titulo}</h3>
          <p class="benefit-card-desc">${b.descripcionCorta}</p>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="hero" id="hero-section">
      <div class="hero-content">
        <h1>Beneficios Sociales</h1>
        <p>Descubre todos los beneficios que Seguas pone a tu disposición para cuidar de ti y de los tuyos. Tu bienestar es nuestra prioridad.</p>
      </div>
    </section>
    <section class="benefits-section" id="benefits-section">
      <h2 class="section-title">Todos los beneficios</h2>
      <div class="benefits-grid" id="benefits-grid">
        ${cardsHTML || '<p style="color:var(--color-text-secondary)">No hay beneficios disponibles todavía.</p>'}
      </div>
    </section>
  `;
}

export function bindTodosEvents() {
  document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      window.location.hash = `#/detalle/${id}`;
    });
  });
}
