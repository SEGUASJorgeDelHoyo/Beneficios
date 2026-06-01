import { addBeneficio, getBeneficioById, updateBeneficio } from '../data.js';

const CATEGORIAS = [
  { value: 'salud', label: 'Salud' },
  { value: 'formacion', label: 'Formación' },
  { value: 'conciliacion', label: 'Conciliación' },
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'finanzas', label: 'Finanzas' },
  { value: 'ocio', label: 'Ocio y Deporte' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'general', label: 'General' }
];

const ICONOS = ['⭐', '🏥', '🎓', '🏠', '🍽️', '💪', '📈', '🚗', '🎯', '🎁', '💼', '🌍'];

function buildForm(beneficio = null) {
  const isEdit = Boolean(beneficio);
  return `
    <div class="form-page" id="nuevos-page">
      <h1 class="form-page-title">${isEdit ? 'Editar beneficio' : 'Añadir Beneficio'}</h1>
      <p class="form-page-subtitle">${isEdit ? 'Modifica este beneficio y guarda los cambios.' : 'Crea un nuevo beneficio social sin necesidad de modificar código.'}</p>
      <div class="form-card">
        <form id="form-nuevo">
          <div class="form-row">
            <div class="form-group">
              <label for="nuevo-titulo">Título *</label>
              <input type="text" id="nuevo-titulo" required placeholder="Ej: Seguro dental" value="${beneficio?.titulo || ''}">
            </div>
            <div class="form-group">
              <label for="nuevo-categoria">Categoría</label>
              <select id="nuevo-categoria">
                ${CATEGORIAS.map(c => `<option value="${c.value}" ${beneficio?.categoria === c.value ? 'selected' : ''}>${c.label}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="nuevo-icono">Icono</label>
              <select id="nuevo-icono">
                ${ICONOS.map(i => `<option value="${i}" ${beneficio?.icono === i ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="nuevo-imagen">URL de imagen (opcional)</label>
              <input type="url" id="nuevo-imagen" placeholder="https://ejemplo.com/imagen.jpg" value="${beneficio?.imagen || ''}">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:1.25rem">
            <label for="nuevo-corta">Descripción corta * (máx. 120 caracteres)</label>
            <input type="text" id="nuevo-corta" required maxlength="120" placeholder="Breve resumen del beneficio..." value="${beneficio?.descripcionCorta || ''}">
          </div>
          <div class="form-group" style="margin-bottom:1.25rem">
            <label for="nuevo-extendida">Descripción completa *</label>
            <textarea id="nuevo-extendida" required rows="6" placeholder="Descripción detallada del beneficio social...">${beneficio?.descripcionExtendida || ''}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:1.5rem">
            <label for="nuevo-imgs">URLs de imágenes adicionales (separadas por coma)</label>
            <input type="text" id="nuevo-imgs" placeholder="url1.jpg, url2.jpg" value="${(beneficio?.imagenesAdicionales || []).join(', ')}">
          </div>
          <button type="submit" class="btn-primary" id="btn-crear">${isEdit ? '💾 Guardar cambios' : '✨ Crear beneficio'}</button>
        </form>
      </div>
    </div>
  `;
}

export function renderNuevos(isAdmin, id = null) {
  if (!isAdmin) {
    return `
      <div class="form-page" id="nuevos-page">
        <h1 class="form-page-title">Acceso restringido</h1>
        <p class="form-page-subtitle">Solo los administradores pueden crear, editar o eliminar beneficios.</p>
        <div class="form-card" style="text-align:center; padding: 2rem;">
          <p>Inicia sesión con una cuenta de administrador para continuar.</p>
          <button class="btn-primary" onclick="window.location.hash='#/todos'">Volver a beneficios</button>
        </div>
      </div>
    `;
  }

  const beneficio = id ? getBeneficioById(id) : null;
  if (id && !beneficio) {
    return `
      <div class="form-page" id="nuevos-page">
        <h1 class="form-page-title">Beneficio no encontrado</h1>
        <p class="form-page-subtitle">No se pudo cargar el beneficio para editarlo.</p>
        <div class="form-card" style="text-align:center; padding: 2rem;">
          <button class="btn-primary" onclick="window.location.hash='#/todos'">Volver a beneficios</button>
        </div>
      </div>
    `;
  }

  return buildForm(beneficio);
}

export function bindNuevosEvents(showToast, isAdmin, id = null) {
  if (!isAdmin) return;

  const form = document.getElementById('form-nuevo');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('nuevo-titulo').value.trim();
    const categoria = document.getElementById('nuevo-categoria').value;
    const icono = document.getElementById('nuevo-icono').value;
    const imagen = document.getElementById('nuevo-imagen').value.trim();
    const descripcionCorta = document.getElementById('nuevo-corta').value.trim();
    const descripcionExtendida = document.getElementById('nuevo-extendida').value.trim();
    const imgsRaw = document.getElementById('nuevo-imgs').value.trim();
    const imagenesAdicionales = imgsRaw ? imgsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

    if (!titulo || !descripcionCorta || !descripcionExtendida) return;

    if (id) {
      updateBeneficio(id, { titulo, descripcionCorta, descripcionExtendida, imagen, imagenesAdicionales, categoria, icono });
      showToast('✅ Beneficio actualizado correctamente');
    } else {
      addBeneficio({ titulo, descripcionCorta, descripcionExtendida, imagen, imagenesAdicionales, categoria, icono });
      showToast('✅ Beneficio creado correctamente');
    }

    setTimeout(() => { window.location.hash = '#/todos'; }, 1200);
  });
}
