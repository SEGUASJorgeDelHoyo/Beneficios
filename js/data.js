const STORAGE_KEY_BENEFICIOS = 'seguas_beneficios_custom';
const STORAGE_KEY_PERFIL = 'seguas_perfil';

let beneficiosBase = [];
let beneficiosCustom = [];

function persistBeneficiosCustom() {
  localStorage.setItem(STORAGE_KEY_BENEFICIOS, JSON.stringify(beneficiosCustom));
}

export async function initData() {
  try {
    const res = await fetch('./data/beneficios.json');
    beneficiosBase = await res.json();
  } catch (e) {
    console.warn('No se pudo cargar beneficios.json, usando datos vacíos.', e);
    beneficiosBase = [];
  }
  const stored = localStorage.getItem(STORAGE_KEY_BENEFICIOS);
  beneficiosCustom = stored ? JSON.parse(stored) : [];
}

function buildBeneficiosMap() {
  const map = new Map();
  beneficiosBase.forEach((b) => map.set(b.id, { ...b }));
  beneficiosCustom.forEach((item) => {
    if (item.deleted) {
      map.delete(item.id);
    } else {
      map.set(item.id, { ...item });
    }
  });
  return map;
}

export function getAllBeneficios() {
  const map = buildBeneficiosMap();
  return Array.from(map.values()).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export function getBeneficioById(id) {
  const map = buildBeneficiosMap();
  return map.get(id) || null;
}

export function getRelacionados(id, limit = 6) {
  const current = getBeneficioById(id);
  if (!current) return getAllBeneficios().filter(b => b.id !== id).slice(0, limit);
  const all = getAllBeneficios().filter(b => b.id !== id);
  const sameCategory = all.filter(b => b.categoria === current.categoria);
  const others = all.filter(b => b.categoria !== current.categoria);
  return [...sameCategory, ...others].slice(0, limit);
}

export function addBeneficio(data) {
  const idBase = data.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${idBase}-${Date.now()}`;
  const nuevo = {
    id,
    titulo: data.titulo,
    descripcionCorta: data.descripcionCorta,
    descripcionExtendida: data.descripcionExtendida,
    imagen: data.imagen || '',
    imagenesAdicionales: data.imagenesAdicionales || [],
    categoria: data.categoria || 'general',
    icono: data.icono || '⭐',
    fecha: new Date().toISOString().split('T')[0],
    created: true
  };
  beneficiosCustom.push(nuevo);
  persistBeneficiosCustom();
  return nuevo;
}

export function updateBeneficio(id, data) {
  const existing = getBeneficioById(id);
  if (!existing) return null;

  const customIndex = beneficiosCustom.findIndex(item => item.id === id);
  const updated = {
    ...existing,
    titulo: data.titulo,
    descripcionCorta: data.descripcionCorta,
    descripcionExtendida: data.descripcionExtendida,
    imagen: data.imagen || '',
    imagenesAdicionales: data.imagenesAdicionales || [],
    categoria: data.categoria || 'general',
    icono: data.icono || '⭐',
    fecha: existing.fecha || new Date().toISOString().split('T')[0],
    created: customIndex >= 0 ? beneficiosCustom[customIndex].created : false
  };

  if (customIndex >= 0) {
    beneficiosCustom[customIndex] = updated;
  } else {
    beneficiosCustom.push(updated);
  }

  persistBeneficiosCustom();
  return updated;
}

export function deleteBeneficio(id) {
  const customIndex = beneficiosCustom.findIndex(item => item.id === id);
  if (customIndex >= 0) {
    if (beneficiosCustom[customIndex].created) {
      beneficiosCustom.splice(customIndex, 1);
    } else {
      beneficiosCustom[customIndex] = { id, deleted: true };
    }
    persistBeneficiosCustom();
    return true;
  }

  const existsInBase = beneficiosBase.some(item => item.id === id);
  if (existsInBase) {
    beneficiosCustom.push({ id, deleted: true });
    persistBeneficiosCustom();
    return true;
  }

  return false;
}

export function getPerfil() {
  const stored = localStorage.getItem(STORAGE_KEY_PERFIL);
  return stored ? JSON.parse(stored) : { nombre: '', apellido: '', email: '', departamento: '', telefono: '' };
}

export function savePerfil(data) {
  localStorage.setItem(STORAGE_KEY_PERFIL, JSON.stringify(data));
}
