export function renderHeader(activeTab = 'todos') {
  const tabs = [
    { id: 'todos', label: 'Todos', hash: '#/todos' },
    { id: 'nuevos', label: 'Nuevos', hash: '#/nuevos' },
    { id: 'perfil', label: 'Perfil', hash: '#/perfil' }
  ];

  return `
    <header class="app-header" id="main-header">
      <a href="#/todos" class="header-brand">
        <div class="header-logo">S</div>
        <div class="header-title"><span>SEGUAS</span> — Beneficios Sociales</div>
      </a>
      <nav class="header-nav" id="main-nav">
        ${tabs.map(t => `
          <a href="${t.hash}" id="nav-${t.id}" class="${activeTab === t.id ? 'active' : ''}">${t.label}</a>
        `).join('')}
      </nav>
      <div class="header-actions">
        <div id="user-card" class="user-card"><p>Inicia sesión para ver tus beneficios</p></div>
        <button class="btn-secondary" id="btn-logic">Iniciar sesión</button>
        <button class="btn-primary" id="btn-logout" style="display:none;">Cerrar sesión</button>
      </div>
    </header>
  `;
}
