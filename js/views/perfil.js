import { getPerfil, savePerfil } from '../data.js';

export function renderPerfil() {
  const p = getPerfil();
  return `
    <div class="form-page" id="perfil-page">
      <h1 class="form-page-title">Perfil</h1>
      <p class="form-page-subtitle">Tu información personal y tarjeta de visita digital.</p>
      <div class="profile-layout">
        <div class="form-card">
          <form id="form-perfil">
            <div class="form-row">
              <div class="form-group">
                <label for="perfil-nombre">Nombre</label>
                <input type="text" id="perfil-nombre" placeholder="Tu nombre" value="${p.nombre || ''}">
              </div>
              <div class="form-group">
                <label for="perfil-apellido">Apellido</label>
                <input type="text" id="perfil-apellido" placeholder="Tu apellido" value="${p.apellido || ''}">
              </div>
            </div>
            <div class="form-group" style="margin-bottom:1.25rem">
              <label for="perfil-email">Correo electrónico</label>
              <input type="email" id="perfil-email" placeholder="tu.nombre@seguas.com" value="${p.email || ''}">
            </div>
            <div class="form-group" style="margin-bottom:1.25rem">
              <label for="perfil-departamento">Departamento</label>
              <input type="text" id="perfil-departamento" placeholder="Ej: Ingeniería" value="${p.departamento || ''}">
            </div>
            <div class="form-group" style="margin-bottom:1.5rem">
              <label for="perfil-telefono">Teléfono</label>
              <input type="tel" id="perfil-telefono" placeholder="+34 600 000 000" value="${p.telefono || ''}">
            </div>
            <button type="submit" class="btn-primary" id="btn-guardar-perfil">💾 Guardar perfil</button>
          </form>
        </div>
        <div class="profile-card-preview" id="profile-preview">
          <div class="profile-card-visual" id="card-visual">
            <div class="profile-card-logo">
              <img src="./assets/Logo-Seguas_azul.jpg" alt="Logo SEGUAS" style="height: 40px; width: auto; object-fit: contain;" />
            </div>
            <div>
              <div class="profile-card-name" id="card-name">${p.nombre || 'Nombre'} ${p.apellido || 'Apellido'}</div>
              <div class="profile-card-dept" id="card-dept">${p.departamento || 'Departamento'}</div>
            </div>
            <div class="profile-card-contact" id="card-contact">
              ${p.email || 'email@seguas.com'}<br>${p.telefono || '+34 000 000 000'}
            </div>
          </div>
          <div class="profile-qr-container">
            <div id="qr-code"></div>
            <span class="profile-qr-label">Escanea para guardar contacto</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function generateQR(perfil) {
  const container = document.getElementById('qr-code');
  if (!container || typeof QRCode === 'undefined') return;
  container.innerHTML = '';

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${perfil.apellido || ''};${perfil.nombre || ''}
FN:${perfil.nombre || ''} ${perfil.apellido || ''}
ORG:Seguas
TITLE:${perfil.departamento || ''}
TEL:${perfil.telefono || ''}
EMAIL:${perfil.email || ''}
URL:https://www.seguas.com
END:VCARD`;

  new QRCode(container, {
    text: vcard,
    width: 160,
    height: 160,
    colorDark: '#1a1a2e',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

function updateCardPreview() {
  // Corregido aquí: Apuntamos correctamente a la clase .profile-card-logo para asegurar que la imagen esté ahí
  const logoEl = document.querySelector('.profile-card-logo');
  if (logoEl && !logoEl.querySelector('img')) {
    const img = document.createElement('img');
    img.src = 'Logo-Seguas_azul.jpg';
    img.alt = 'Seguas Logo';
    img.style.height = '40px';
    img.style.width = 'auto';
    img.style.objectFit = 'contain';
    logoEl.innerHTML = ''; // Limpiamos el texto plano sobrante si existiera
    logoEl.appendChild(img);
  }

  const nombre = document.getElementById('perfil-nombre')?.value || 'Nombre';
  const apellido = document.getElementById('perfil-apellido')?.value || 'Apellido';
  const email = document.getElementById('perfil-email')?.value || 'email@seguas.com';
  const dept = document.getElementById('perfil-departamento')?.value || 'Departamento';
  const tel = document.getElementById('perfil-telefono')?.value || '+34 000 000 000';

  const nameEl = document.getElementById('card-name');
  const deptEl = document.getElementById('card-dept');
  const contactEl = document.getElementById('card-contact');
  if (nameEl) nameEl.textContent = `${nombre} ${apellido}`;
  if (deptEl) deptEl.textContent = dept;
  if (contactEl) contactEl.innerHTML = `${email}<br>${tel}`;

  generateQR({ nombre, apellido, email, departamento: dept, telefono: tel });
}

export function bindPerfilEvents(showToast) {
  const form = document.getElementById('form-perfil');
  if (!form) return;

  // Live preview updates
  ['perfil-nombre', 'perfil-apellido', 'perfil-email', 'perfil-departamento', 'perfil-telefono'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCardPreview);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('perfil-nombre').value.trim(),
      apellido: document.getElementById('perfil-apellido').value.trim(),
      email: document.getElementById('perfil-email').value.trim(),
      departamento: document.getElementById('perfil-departamento').value.trim(),
      telefono: document.getElementById('perfil-telefono').value.trim()
    };
    savePerfil(data);
    showToast('✅ Perfil guardado correctamente');
  });

  // Initial QR generation
  setTimeout(() => generateQR(getPerfil()), 100);
}