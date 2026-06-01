import { deleteBeneficio, getBeneficioById, getRelacionados } from '../data.js';

export function renderDetalle(id, isAdmin = false) {
  const b = getBeneficioById(id);
  if (!b) {
    return `
      <div class="detail-view">
        <button class="detail-back" onclick="window.location.hash='#/todos'">← Volver</button>
        <h1 class="detail-title">Beneficio no encontrado</h1>
        <p class="detail-body">El beneficio solicitado no existe o ha sido eliminado.</p>
      </div>
    `;
  }

  const heroVisual = b.imagen
    ? `<img class="detail-hero-img" src="${b.imagen}" alt="${b.titulo}">`
    : `<div class="detail-hero-icon">${b.icono || '⭐'}</div>`;

  const gallery = (b.imagenesAdicionales && b.imagenesAdicionales.length > 0)
    ? `<div class="detail-gallery">${b.imagenesAdicionales.map(img => `<img src="${img}" alt="Imagen de ${b.titulo}" loading="lazy">`).join('')}</div>`
    : '';

  const adminActions = isAdmin
    ? `
      <div class="detail-actions">
        <button class="btn-secondary" id="btn-edit-beneficio">✏️ Editar</button>
        <button class="btn-danger" id="btn-delete-beneficio">🗑️ Eliminar</button>
      </div>
    `
    : '';

  const relacionados = getRelacionados(id);
  const relacionadosHTML = relacionados.length > 0
    ? `
      <div class="related-section">
        <h2 class="section-title">Beneficios relacionados</h2>
        <div class="related-scroll" id="related-scroll">
          ${relacionados.map(r => {
            const rVisual = r.imagen
              ? `<img class="related-card-img" src="${r.imagen}" alt="${r.titulo}" loading="lazy">`
              : `<div class="related-card-icon">${r.icono || '⭐'}</div>`;
            return `
              <div class="related-card" data-id="${r.id}">
                ${rVisual}
                <div class="related-card-title">${r.titulo}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <div class="detail-view" id="detail-view">
      <button class="detail-back" id="btn-back">← Volver a beneficios</button>
      <h1 class="detail-title">${b.titulo}</h1>
      ${heroVisual}
      <div class="detail-body">${b.descripcionExtendida}</div>
      ${adminActions}
      ${gallery}
      ${relacionadosHTML}
    </div>
  `;
}

export function bindDetalleEvents(isAdmin = false, showToast) {
  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/todos';
    });
  }

  document.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#/detalle/${card.dataset.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  if (!isAdmin) return;

  const editBtn = document.getElementById('btn-edit-beneficio');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const currentId = window.location.hash.replace('#/detalle/', '');
      window.location.hash = `#/nuevos/${currentId}`;
    });
  }

  const deleteBtn = document.getElementById('btn-delete-beneficio');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const currentId = window.location.hash.replace('#/detalle/', '');
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este beneficio?');
      if (!confirmed) return;

      if (deleteBeneficio(currentId)) {
        showToast('✅ Beneficio eliminado correctamente');
        setTimeout(() => { window.location.hash = '#/todos'; }, 800);
      } else {
        showToast('⚠️ No se pudo eliminar el beneficio.');
      }
    });
  }
}
