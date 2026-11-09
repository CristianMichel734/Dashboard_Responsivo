// --- INTERACCIÓN Y GESTIÓN DE ZONAS ---

// Conmutación de Modo Oscuro / Claro
const btnToggleTheme = document.getElementById('btnToggleTheme');
btnToggleTheme.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
});

// Control de Sidebar en Móvil
const btnToggleSidebar = document.getElementById('btnToggleSidebar');
const sidebar = document.getElementById('sidebar');
btnToggleSidebar?.addEventListener('click', () => sidebar.classList.toggle('active'));

// ZONA 3: Panel Contextual (Drawer)
const drawer = document.getElementById('contextDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer(nodeId) {
  document.getElementById('inputHostname').value = nodeId;
  drawer.classList.add('active');
  drawerOverlay.classList.add('active');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  drawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
  drawer.setAttribute('aria-hidden', 'true');
}

// ZONA 3: Confirmación Segura en Modal (Acción Crítica)
const confirmModal = document.getElementById('confirmModal');
const confirmInput = document.getElementById('confirmInput');
const btnExecuteAction = document.getElementById('btnExecuteAction');

function openModal() {
  confirmModal.classList.add('active');
  confirmModal.setAttribute('aria-hidden', 'false');
  confirmInput.value = '';
  btnExecuteAction.setAttribute('disabled', 'true');
  confirmInput.focus();
}

function closeModal() {
  confirmModal.classList.remove('active');
  confirmModal.setAttribute('aria-hidden', 'true');
}

// Validación de doble paso en tiempo real
confirmInput.addEventListener('input', (e) => {
  if (e.target.value.trim() === 'NODE-04') {
    btnExecuteAction.removeAttribute('disabled');
  } else {
    btnExecuteAction.setAttribute('disabled', 'true');
  }
});

// Simulación del estado Loading en acción crítica
function executeCriticalAction() {
  btnExecuteAction.classList.add('is-loading');
  
  setTimeout(() => {
    btnExecuteAction.classList.remove('is-loading');
    closeModal();
    closeDrawer();
    alert('✅ Instancia node-us-east-04 reiniciada exitosamente.');
  }, 2000);
}