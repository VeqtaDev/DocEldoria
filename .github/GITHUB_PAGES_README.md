# GitHub Pages – Erreur « Runner not acquired » / Internal server error

## Les erreurs

- **"The job was not acquired by Runner of type hosted even after multiple attempts"**  
  GitHub n’arrive pas à attribuer un runner à vos jobs (build, deploy, etc.).

- **"Internal server error. Correlation ID: …"**  
  Erreur côté serveur GitHub (Pages / Actions). Les IDs (ex. `a081a09a-836b-41f2-9db3-13284bdf2349`) servent si vous contactez le support.

Ces problèmes viennent de l’infrastructure GitHub (runners / Pages), pas de votre code.

---

## Solution recommandée : **Deploy from a branch**

Pour ce site, le HTML est déjà généré dans le repo. Vous n’avez pas besoin de GitHub Actions. En passant en **Deploy from a branch**, il n’y a plus de job sur un runner → plus d’erreur « runner not acquired » ni « Internal server error » pour le déploiement.

### Étapes (sur GitHub, pas en local)

1. Ouvrez le dépôt **DocEldoria** sur GitHub.
2. **Settings** (onglet du repo).
3. Dans la barre latérale gauche : **Pages** (section « Code and automation »).
4. **Build and deployment** :
   - **Source** : choisir **Deploy from a branch** (pas « GitHub Actions »).
   - **Branch** : `main` (ou la branche où se trouve le site).
   - **Folder** : **/ (root)**.
5. Cliquer **Save**.

Quelques minutes plus tard, le site sera publié depuis la branche. Les workflows Actions ne seront plus utilisés pour le déploiement.

### (Optionnel) Désactiver les workflows pour éviter les e-mails d’échec

- **Actions** → ouvrir un workflow → **…** (en haut à droite) → **Disable workflow**.  
  Ou supprimez le fichier `.github/workflows/pages-deploy-from-branch.yml` du repo si vous ne voulez plus de déploiement via Actions.

---

## Si vous tenez à garder GitHub Actions

- **Réessayer** : Actions → workflow en échec → **Re-run all jobs** (souvent ça passe après 1–2 essais).
- **État GitHub** : [githubstatus.com](https://www.githubstatus.com/) (Actions / Pages).
- **Support GitHub** : si ça bloque longtemps, ouvrir un ticket avec les **Correlation ID** (ex. `a081a09a-836b-41f2-9db3-13284bdf2349`).
