export function renderHeader(activeTab = 'todos', isAdmin = false) {
  const tabs = [
    { id: 'todos', label: 'Todos', hash: '#/todos' },
    { id: 'perfil', label: 'Perfil', hash: '#/perfil' }
  ];

  if (isAdmin) {
    tabs.splice(1, 0, { id: 'nuevos', label: 'Nuevos', hash: '#/nuevos' });
  }

  return `
    <header class="app-header" id="main-header">
      <a href="#/todos" class="header-brand">
        <div class="header-logo"><img src="./assets/Logo-Seguas_azul.jpg" alt="Logo SEGUAS" /></div>
        <div class="header-title"><span></span> — Beneficios Sociales</div>
      </a>
      <nav class="header-nav" id="main-nav">
        ${tabs.map(t => `
          <a href="${t.hash}" id="nav-${t.id}" class="${activeTab === t.id ? 'active' : ''}">${t.label}</a>
        `).join('')}
      </nav>
      <div class="header-actions">
        <div id="user-card" class="user-card"><p>Inicia sesión para ver tus beneficios</p></div>
        <button class="btn-secondary" id="btn-logic">Iniciar sesión con Google</button>
        <button class="btn-primary" id="btn-logout" style="display:none;">Cerrar sesión</button>
      </div>
    </header>
  `;
}
