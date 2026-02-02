const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..');

const commandInfos = {
  staffmenu: { syntax: 'staffmenu', desc: 'Ouvre le menu staff (F12). Accès : fondateur, gérant, modérateur, helpeur.' },
  resetban: { syntax: 'resetban', desc: 'Réinitialise toutes les listes de ban (hardware, account, ban_id) dans le datacenter.' },
  skin: { syntax: 'skin &lt;id&gt;', desc: 'Ouvre le menu skin du joueur ciblé.' },
  coords: { syntax: 'coords', desc: 'Copie les coordonnées actuelles dans le presse-papier.' },
  dvcarall: { syntax: 'dvcarall', desc: 'Supprime tous les véhicules pour tous les joueurs (client).' },
  tp: { syntax: 'tp &lt;x&gt; &lt;y&gt; &lt;z&gt; ou tp &lt;x,y,z&gt;', desc: 'Téléporte le joueur aux coordonnées.' },
  tpm: { syntax: 'tpm', desc: 'Téléporte au waypoint (marqueur sur la carte).' },
  car: { syntax: 'car &lt;nom_modèle&gt;', desc: 'Fait apparaître un véhicule et place le joueur dedans.' },
  dv: { syntax: 'dv', desc: 'Supprime le véhicule devant soi ou celui dans lequel on est.' },
  bring: { syntax: 'bring &lt;id&gt;', desc: 'Ramène le joueur ciblé à sa position.' },
  bringback: { syntax: 'bringback &lt;id&gt;', desc: 'Renvoie le joueur à sa position avant bring.' },
  goto: { syntax: 'goto &lt;id&gt;', desc: 'Téléporte vers le joueur ciblé.' },
  goback: { syntax: 'goback', desc: 'Retour à la position avant goto.' },
  setjob: { syntax: 'setjob &lt;id&gt; &lt;métier&gt; [grade]', desc: 'Définit le métier et le grade du joueur (grade optionnel, défaut 0).' },
  giveequip: { syntax: 'giveequip &lt;id&gt; &lt;nom_équipement&gt; &lt;niveau&gt;', desc: 'Donne un équipement au joueur (event add.equip).' },
  giveitem: { syntax: 'giveitem &lt;id&gt; &lt;nom_objet&gt; &lt;quantité&gt;', desc: 'Donne un objet (non arme) au joueur.' },
  clearinventory: { syntax: 'clearinventory &lt;id&gt;', desc: 'Vide l\'inventaire du joueur.' },
  addcapsule: { syntax: 'addcapsule &lt;id&gt; &lt;nom_capsule&gt; &lt;quantité&gt;', desc: 'Ajoute des capsules au joueur.' },
  removecapsule: { syntax: 'removecapsule &lt;id&gt; &lt;nom_capsule&gt; &lt;quantité&gt;', desc: 'Retire des capsules au joueur.' },
  addstone: { syntax: 'addstone &lt;id&gt; &lt;nom_pierre&gt; &lt;quantité&gt;', desc: 'Ajoute des pierres au joueur.' },
  removestone: { syntax: 'removestone &lt;id&gt; &lt;nom_pierre&gt; &lt;quantité&gt;', desc: 'Retire des pierres au joueur.' },
  addcapsulepoint: { syntax: 'addcapsulepoint &lt;id&gt; &lt;quantité&gt;', desc: 'Ajoute des points capsule au joueur.' },
  addmoney: { syntax: 'addmoney &lt;id&gt; &lt;montant&gt;', desc: 'Ajoute de l\'argent au joueur.' },
  setmoney: { syntax: 'setmoney &lt;id&gt; &lt;montant&gt;', desc: 'Définit l\'argent du joueur.' },
  adddiamond: { syntax: 'adddiamond &lt;id&gt; &lt;quantité&gt;', desc: 'Ajoute des diamants au joueur.' },
  addruby: { syntax: 'addruby &lt;id&gt; &lt;quantité&gt;', desc: 'Ajoute des rubis au joueur.' },
  addskin: { syntax: 'addskin &lt;id&gt; &lt;nom_skin&gt; &lt;quantité&gt;', desc: 'Donne un skin au joueur (event on.addskin.menu).' },
  removeskin: { syntax: 'removeskin &lt;id&gt; &lt;nom_skin&gt; &lt;quantité&gt;', desc: 'Retire un skin au joueur.' },
  giveweapon: { syntax: 'giveweapon &lt;id&gt; &lt;nom_arme&gt; &lt;munitions&gt;', desc: 'Donne une arme (ou ajoute des munitions si déjà possédée).' },
  revive: { syntax: 'revive &lt;id&gt;', desc: 'Réanime le joueur ciblé.' },
  heal: { syntax: 'heal &lt;id&gt;', desc: 'Soigne le joueur (200 PV).' },
  healall: { syntax: 'healall', desc: 'Soigne tous les joueurs.' },
  reviveall: { syntax: 'reviveall', desc: 'Réanime tous les joueurs.' },
  addfashion: { syntax: 'addfashion &lt;id&gt; &lt;type&gt; &lt;quantité&gt;', desc: 'Donne une tenue fashion au joueur.' },
  giveitemall: { syntax: 'giveitemall &lt;nom_objet&gt; &lt;quantité&gt;', desc: 'Donne l\'objet à tous les joueurs connectés.' },
  model: { syntax: 'model &lt;id&gt; &lt;nom_modèle&gt;', desc: 'Change le modèle (ped) du joueur.' },
  addcloth: { syntax: 'addcloth &lt;id&gt; &lt;type_vêtement&gt; &lt;id_vêtement&gt;', desc: 'Ajoute un vêtement au joueur.' },
  removecloth: { syntax: 'removecloth &lt;id&gt; &lt;type_vêtement&gt; &lt;id_vêtement&gt;', desc: 'Retire un vêtement au joueur.' },
  clearcardall: { syntax: 'clearcardall &lt;id&gt;', desc: 'Supprime toutes les cartes du joueur.' },
  givetransform: { syntax: 'givetransform &lt;id&gt; [nom]', desc: 'Donne une transformation au joueur (event on.give).' },
  givecard: { syntax: 'givecard &lt;id&gt; &lt;nom_gacha&gt; &lt;niveau&gt;', desc: 'Donne une carte au joueur (ex. card_1, niveau 1-3).' },
  ban: { syntax: 'ban &lt;id&gt; [raison]', desc: 'Bannit le joueur (event on.ban).' },
  addallmoney: { syntax: 'addallmoney &lt;montant&gt;', desc: 'Ajoute le montant à tous les joueurs.' },
  addalltran: { syntax: 'addalltran &lt;quantité&gt;', desc: 'Donne à tous les joueurs 1 de chaque item afwfr1 à afwfr14.' },
  addalltranid: { syntax: 'addalltranid &lt;id&gt;', desc: 'Donne au joueur 1 de chaque item afwfr1 à afwfr14.' },
  addallafw: { syntax: 'addallafw &lt;quantité&gt;', desc: 'Ajoute l\'AFW à tous les joueurs.' },
  addafw: { syntax: 'addafw &lt;id&gt; &lt;quantité&gt;', desc: 'Ajoute l\'AFW au joueur.' },
  addquest: { syntax: 'addquest &lt;id&gt; &lt;id_quête&gt;', desc: 'Ajoute une quête au joueur.' },
  removequest: { syntax: 'removequest &lt;id&gt; &lt;id_quête&gt;', desc: 'Retire une quête au joueur.' },
  queststatus: { syntax: 'queststatus &lt;id&gt; &lt;id_quête&gt; &lt;statut&gt;', desc: 'Change le statut d\'une quête.' },
  setmisstionvalue: { syntax: 'setmisstionvalue &lt;id&gt; &lt;id_quête&gt; &lt;id_mission&gt; &lt;valeur&gt;', desc: 'Met à jour une valeur de mission.' },
  clearallquest: { syntax: 'clearallquest &lt;id&gt;', desc: 'Efface toutes les quêtes du joueur.' },
};

const commandsDir = path.join(docDir, 'commands');
if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });

for (const [name, info] of Object.entries(commandInfos)) {
  const md = `# ${name}

## Syntaxe

\`\`\`
${info.syntax.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}
\`\`\`

## Description

${info.desc}

## Raccourci

Utilisez \`me\` à la place de l'ID pour cibler soi-même.

---

[← Liste des commandes](../commands.md)
`;
  fs.writeFileSync(path.join(commandsDir, `${name}.md`), md);
}
console.log('Created', Object.keys(commandInfos).length, 'command pages');

// Items & weapons from items-data.json
const dataPath = path.join(docDir, 'items-data.json');
if (!fs.existsSync(dataPath)) {
  console.log('items-data.json not found, run parse-items.js first');
  process.exit(1);
}
const { weapons, nonWeapons } = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Résolution des chemins d'images : associer chaque clé au fichier réel dans images/Eldoria
const imagesDir = path.join(docDir, 'images', 'Eldoria');
const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];

function resolveImage(key) {
  const keyLower = key.toLowerCase();
  const keyNoUnderscore = key.replace(/_/g, '');
  const keyNoUnderscoreLower = keyNoUnderscore.toLowerCase();

  // 1. Correspondance exacte : key.png / key.PNG / key.jpg / key.JPG
  for (const ext of ['png', 'PNG', 'jpg', 'JPG', 'jpeg']) {
    const f = imageFiles.find(file => {
      const base = path.basename(file, path.extname(file));
      return base === key && (path.extname(file).toLowerCase() === '.' + ext.toLowerCase());
    });
    if (f) return `images/Eldoria/${f}`;
  }

  // 2. Fichier dont le nom (sans ext) commence par la clé (ex: astrovian-0AG_UjSQ.png)
  const prefixMatch = imageFiles.find(file => {
    const base = path.basename(file, path.extname(file));
    return base === key || base.toLowerCase() === keyLower ||
      base.startsWith(key + '-') || base.startsWith(key + '_') ||
      base.toLowerCase().startsWith(keyLower + '-') || base.toLowerCase().startsWith(keyLower + '_');
  });
  if (prefixMatch) return `images/Eldoria/${prefixMatch}`;

  // 3. Pour card_X essayer cardX (sans underscore)
  if (key.startsWith('card_')) {
    const f = imageFiles.find(file => {
      const base = path.basename(file, path.extname(file));
      return base === keyNoUnderscore || base.toLowerCase() === keyNoUnderscoreLower;
    });
    if (f) return `images/Eldoria/${f}`;
  }

  return null;
}

let itemsMd = `# Liste des items

Commande pour donner un item : \`giveitem <id> <nom_item> <quantité>\`

| Image | Nom (clé) | Label | Type | Rareté | Commande |
|-------|-----------|-------|------|--------|----------|
`;
for (const i of nonWeapons) {
  const resolved = resolveImage(i.key);
  const img = resolved ? `![${i.label}](${resolved})` : '—';
  itemsMd += `| ${img} | \`${i.key}\` | ${i.label} | ${i.type || '-'} | ${i.tire || '-'} | \`giveitem me ${i.key} 1\` |\n`;
}
fs.writeFileSync(path.join(docDir, 'items.md'), itemsMd);
console.log('Written items.md with', nonWeapons.length, 'items');

let weaponsMd = `# Liste des armes

Commande pour donner une arme : \`giveweapon <id> <nom_arme> <munitions>\`

| Image | Nom (clé) | Label | Type | Rareté | Commande |
|-------|-----------|-------|------|--------|----------|
`;
for (const w of weapons) {
  const resolved = resolveImage(w.key);
  const img = resolved ? `![${w.label}](${resolved})` : '—';
  weaponsMd += `| ${img} | \`${w.key}\` | ${w.label} | ${w.type || '-'} | ${w.tire || '-'} | \`giveweapon me ${w.key} 100\` |\n`;
}
fs.writeFileSync(path.join(docDir, 'weapons.md'), weaponsMd);
console.log('Written weapons.md with', weapons.length, 'weapons');

// Cartes : régénérer cards.md avec chemins d'images résolus
const cardsData = [
  { id: 'card_1', name: 'Verdant Guardian', lieu: 'Asthania', desc: "Se déplacer vers l'avant", rarete: 'common' },
  { id: 'card_2', name: 'Kuma No Ken', lieu: 'Asthania', desc: "Se déplacer vers l'arrière", rarete: 'common' },
  { id: 'card_3', name: 'Zephyros The Radiant', lieu: 'Asthania', desc: "Créer un mur d'arbres millénaires", rarete: 'common' },
  { id: 'card_4', name: 'Fenghuang', lieu: 'Asthania', desc: 'Tirer une flèche phénix', rarete: 'rare' },
  { id: 'card_5', name: 'Kogane', lieu: 'Asthania', desc: "Créer une onde repoussant les ennemis", rarete: 'super_legendary' },
  { id: 'card_6', name: 'Kogane', lieu: 'Asthania', desc: 'Créer une grande tempête', rarete: 'common' },
  { id: 'card_7', name: 'Kogane', lieu: 'Asthania', desc: 'Augmente PV et mana des alliés à proximité', rarete: 'rare' },
  { id: 'card_8', name: 'Kogane', lieu: 'Asthania', desc: 'Danse infligeant des dégâts aux ennemis devant', rarete: 'rare' },
  { id: 'card_9', name: 'Kogane', lieu: 'Asthania', desc: 'Invoque une météorite sur les ennemis', rarete: 'rare' },
  { id: 'card_10', name: 'Kogane', lieu: 'Asthania', desc: 'Foudre en zone sur la cible', rarete: 'super_legendary' },
  { id: 'card_11', name: 'Kogane', lieu: 'Asthania', desc: "Boule de feu sur l'ennemi puis bond en arrière", rarete: 'legendary' },
  { id: 'card_12', name: 'Kogane', lieu: 'Asthania', desc: 'Nezuburo : frappe aléatoire les ennemis devant', rarete: 'rare' },
];
let cardsMd = `# Cartes (Card) Eldoria

Commande pour donner une carte : **\`givecard <id> <nom_gacha> <niveau>\`**  
Exemple : \`givecard me card_1 3\` — donne la carte Verdant Guardian au niveau 3.

Les images des cartes se trouvent dans **\`/images\`** (ex. \`images/Eldoria/card_1.JPG\`).

---

## Liste des cartes avec images

| Image | ID | Nom | Lieu | Description | Rareté | Commande |
|-------|-----|-----|------|-------------|--------|----------|
`;
for (const c of cardsData) {
  const resolved = resolveImage(c.id) || resolveImage(c.id.replace('_', ''));
  const img = resolved ? `![${c.name}](${resolved})` : '—';
  cardsMd += `| ${img} | \`${c.id}\` | ${c.name} | ${c.lieu} | ${c.desc} | ${c.rarete} | \`givecard me ${c.id} 3\` |\n`;
}
cardsMd += `
---

## Autres commandes liées aux cartes

| Commande | Description |
|----------|-------------|
| [clearcardall](commands/clearcardall.md) | Supprime toutes les cartes du joueur. |

---

## Raretés

- **common** — rare
- **rare** — rare
- **epic** — épique
- **legendary** — légendaire
- **super_legendary** — super légendaire

Les images des cartes sont au format JPG dans le dossier **images** (par ex. \`images/Eldoria/card_1.JPG\`). Ajoutez-les dans ce dossier si elles ne s'affichent pas.
`;
fs.writeFileSync(path.join(docDir, 'cards.md'), cardsMd);
console.log('Written cards.md with', cardsData.length, 'cards');
