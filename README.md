# DeployAgent launch check

A standalone React + Vite sample for the first DeployAgent GitHub Pages deployment. It includes an imported SVG, hash navigation, and a click counter. It has no backend, environment variables, remote fonts, analytics, external APIs, or paid services.

The UI reports browser observations only. It does not claim a successful public deployment. The deployment agent separately verifies the public page and its source marker.

## Local build

Use a supported Node.js version (Node 22.12+ for the pinned Vite major). Install from the committed lockfile, matching the agent’s build settings:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build -- --base /deployagent-smoke/
npm run preview -- --host 127.0.0.1 --base /deployagent-smoke/
```

Open the preview address at `/deployagent-smoke/`. Substitute the exact repository name if it differs. A Vite project site needs this base path for generated JavaScript, CSS, and artwork URLs. The agent supplies it automatically during deployment.

For development, run `npm run dev`.

## Publish with DeployAgent

Place the **contents of this directory** at the root of a public GitHub repository owned by your account. Include `package-lock.json`; exclude `node_modules/` and `dist/`. The analyzer supports apps at the repository root or `frontend/`, so this example’s nested directory in the agent workspace is not itself a supported remote deployment root.

Connect that repository in the local DeployAgent dashboard. Analyze it, review the generated workflow, and confirm your GitHub free-account eligibility before deployment. The agent creates its own GitHub Pages workflow; this sample does not include one.

## Public demo checks

After the agent returns a public URL, test it in the browser:

1. Open the URL and confirm the page styling and green orbit artwork load.
2. Click **Test interaction** twice. Confirm the displayed count is `02` and the browser signal records two clicks.
3. Open **Browser checks**. Confirm the address ends in `#checks` and the detailed checklist appears.
4. Refresh that address. Confirm Browser checks remains open and the counter resets to `00`.
5. Open **Overview**, then use the browser’s Back button. Confirm Browser checks returns.
6. Use **Reset** after a click. Confirm the count returns to `00` and Reset becomes disabled.
7. Check a narrow viewport and navigate the links and buttons using the keyboard.
8. Check browser developer tools for failed startup asset requests or console errors.

These steps are a checklist to perform, not a record of passing tests. No public deployment is implied by including this sample.
