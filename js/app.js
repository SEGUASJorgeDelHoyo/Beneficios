import { initData, getPerfil, savePerfil } from './data.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderTodos, bindTodosEvents } from './views/todos.js';
import { renderDetalle, bindDetalleEvents } from './views/detalle.js';
import { renderNuevos, bindNuevosEvents } from './views/nuevos.js';
import { renderPerfil, bindPerfilEvents, renderTarjeta } from './views/perfil.js';

// Importaciones de Firebase
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth, provider, isAdminUser } from '../firebase/firebase-config.js';

const headerEl = document.getElementById('app-header');
const mainEl = document.getElementById('app-content');
const footerEl = document.getElementById('app-footer');
const toastEl = document.getElementById('app-toast');

let btnLogic = null;
let btnLogout = null;
let userCard = null;
let currentUser = null;
let currentIsAdmin = false;

function refreshHeaderControls() {
  btnLogic = document.getElementById('btn-logic');
  btnLogout = document.getElementById('btn-logout');
  userCard = document.getElementById('user-card');

  if (btnLogic) {
    btnLogic.onclick = async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Error al loguearse:", error);
      }
    };
  }

  if (btnLogout) {
    btnLogout.onclick = () => {
      signOut(auth);
    };
  }
}

function updateUserUI(user) {
  currentUser = user;
  currentIsAdmin = isAdminUser(user);

  if (user && userCard) {
    const initials = user.displayName
      ? user.displayName.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
      : 'US';

    userCard.innerHTML = `
      <div class="user-avatar">
        ${user.photoURL ? `<img src="${user.photoURL}" alt="Avatar">` : `<span>${initials}</span>`}
      </div>
      <div class="user-card-info">
        <p class="user-card-name">${user.displayName || user.email}</p>
        <p class="user-card-role">${currentIsAdmin ? 'Administrador' : 'Usuario estándar'}</p>
      </div>
    `;
  } else if (userCard) {
    userCard.innerHTML = '<p>Inicia sesión para ver tus beneficios</p>';
  }

  if (btnLogic) btnLogic.style.display = user ? 'none' : 'block';
  if (btnLogout) btnLogout.style.display = user ? 'block' : 'none';
}

async function handleAuthState(user) {
  updateUserUI(user);
  render();
}

onAuthStateChanged(auth, handleAuthState);

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 3000);
}

function parseRoute() {
  const hash = window.location.hash || '#/todos';
  if (hash.startsWith('#/detalle/')) {
    const id = hash.replace('#/detalle/', '');
    return { view: 'detalle', id };
  }
  if (hash.startsWith('#/nuevos/')) {
    const id = hash.replace('#/nuevos/', '');
    return { view: 'nuevos', id };
  }
  if (hash.startsWith('#/tarjeta')) {
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    return { view: 'tarjeta', queryString };
  }
  if (hash === '#/nuevos') return { view: 'nuevos' };
  if (hash === '#/perfil') return { view: 'perfil' };
  return { view: 'todos' };
}

function getActiveTab(view) {
  if (view === 'detalle') return 'todos';
  return view;
}

function render() {
  const route = parseRoute();
  const activeTab = getActiveTab(route.view);

  headerEl.innerHTML = renderHeader(activeTab, currentIsAdmin);
  refreshHeaderControls();
  updateUserUI(currentUser);
  footerEl.innerHTML = renderFooter();

  switch (route.view) {
    case 'detalle':
      mainEl.innerHTML = renderDetalle(route.id, currentIsAdmin);
      bindDetalleEvents(currentIsAdmin, showToast);
      break;
    case 'nuevos':
      mainEl.innerHTML = renderNuevos(currentIsAdmin, route.id);
      bindNuevosEvents(showToast, currentIsAdmin, route.id);
      break;
    case 'perfil':
      mainEl.innerHTML = renderPerfil();
      bindPerfilEvents(showToast);
      break;
    case 'tarjeta':
      mainEl.innerHTML = renderTarjeta(route.queryString);
      break;
    default:
      mainEl.innerHTML = renderTodos();
      bindTodosEvents();
      break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function init() {
  await initData();
  render();
  window.addEventListener('hashchange', render);
}

init();
