# GitHub Pages – Erreur « Runner not acquired »

## L’erreur

**"The job was not acquired by Runner of type hosted even after multiple attempts"**

C’est un problème côté GitHub : aucun runner hébergé n’a pu prendre le job après plusieurs tentatives (souvent temporaire).

---

## Solutions (dans l’ordre)

### 1. Réessayer le workflow

- Onglet **Actions** du dépôt → ouvrir le workflow en échec → **Re-run all jobs** (ou **Re-run failed jobs**).
- Souvent le déploiement passe au 2ᵉ ou 3ᵉ essai.

### 2. Utiliser « Deploy from a branch » (recommandé si le site est déjà buildé)

Votre site Retype est déjà généré (HTML à la racine). Vous n’avez pas besoin d’un job qui build.

1. **Settings** du repo → **Pages** (dans « Code and automation »).
2. **Build and deployment** → **Source** : choisir **Deploy from a branch** (et non « GitHub Actions »).
3. **Branch** : `main` (ou la branche où se trouve le site).
4. **Folder** : `/ (root)`.
5. **Save**.

Le site sera servi directement depuis la branche, sans job Actions → plus de risque « runner not acquired » pour ce déploiement.

### 3. Vérifier l’état de GitHub

- [githubstatus.com](https://www.githubstatus.com/) : incidents sur **Actions** ou **Pages**.
- En cas d’incident, attendre la résolution puis réessayer (voir 1).

### 4. Si le dépôt est sous une organisation (ex. VeqtaDev)

- **Settings** de l’org → **Actions** → **Runners** / **Policies** : vérifier qu’aucune règle ne bloque les workflows de ce repo (ex. « Selected workflows » trop restrictif).

---

## Workflow fourni

Le fichier `workflows/pages-deploy-from-branch.yml` sert uniquement si vous gardez **Source = GitHub Actions** dans Pages. Il envoie le contenu actuel du repo (site déjà buildé) vers GitHub Pages.

- En cas d’erreur « runner not acquired » : utiliser la **solution 1** (Re-run) ou passer à la **solution 2** (Deploy from a branch).
