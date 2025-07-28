#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Limpiando cache de Next.js...');

// Directorios a limpiar
const dirsToClean = [
  '.next',
  'node_modules/.cache',
  '.turbo'
];

// Limpiar directorios
dirsToClean.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`🗑️  Eliminando ${dir}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ ${dir} eliminado`);
    } catch (error) {
      console.log(`⚠️  Error al eliminar ${dir}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${dir} no existe`);
  }
});

// Limpiar cache de npm
console.log('🧹 Limpiando cache de npm...');
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Cache de npm limpiado');
} catch (error) {
  console.log('⚠️  Error al limpiar cache de npm:', error.message);
}

// Reinstalar dependencias
console.log('📦 Reinstalando dependencias...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias reinstaladas');
} catch (error) {
  console.log('⚠️  Error al reinstalar dependencias:', error.message);
}

console.log('🎉 Limpieza completada!');
console.log('💡 Ejecuta "npm run dev" para reiniciar el servidor'); 