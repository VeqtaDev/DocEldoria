const fs = require('fs');
const path = require('path');

const itemLuaPath = process.argv[2] || 'G:\\Serveur Fivem\\Magic Verse\\Magic Verse\\resources\\[head]\\es_extended\\item.lua';
let content;
try {
  content = fs.readFileSync(itemLuaPath, 'utf8');
} catch (e) {
  console.error('Cannot read item.lua:', e.message);
  process.exit(1);
}

const lines = content.split('\n');
const items = [];
let current = null;
let depth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const keyMatch = line.match(/^\s*\[\"([^\"]+)\"\]\s*=\s*\{/);
  if (keyMatch && keyMatch[1] !== 'action' && keyMatch[1] !== 'Category' && keyMatch[1] !== 'Item') {
    current = { key: keyMatch[1], label: '', img: '', type: '', tire: '' };
    depth = 1;
    continue;
  }
  if (!current) continue;
  if (line.match(/\{/)) depth += (line.match(/\{/g) || []).length;
  if (line.match(/\}/)) depth -= (line.match(/\}/g) || []).length;
  const labelM = line.match(/\[\"label\"\]\s*=\s*\"([^\"]*)\"/);
  const imgM = line.match(/\[\"img\"\]\s*=\s*\"([^\"]*)\"/);
  const typeM = line.match(/\[\"type\"\]\s*=\s*\"([^\"]*)\"/);
  const tireM = line.match(/\[\"tire\"\]\s*=\s*\"([^\"]*)\"/);
  if (labelM) current.label = labelM[1];
  if (imgM) current.img = imgM[1];
  if (typeM) current.type = typeM[1];
  if (tireM) current.tire = tireM[1];
  if (depth === 0) {
    if (!current.label) current.label = current.key;
    items.push(current);
    current = null;
  }
}

const weapons = items.filter(i => i.type && i.type.startsWith('item_equip_weapon'));
const nonWeapons = items.filter(i => !i.type || !i.type.startsWith('item_equip_weapon'));

const outDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(outDir, 'items-data.json'), JSON.stringify({ items, weapons, nonWeapons }, null, 2));
console.log('Items:', items.length, 'Weapons:', weapons.length, 'Non-weapons:', nonWeapons.length);
