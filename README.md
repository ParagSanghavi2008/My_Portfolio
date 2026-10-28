# Parag Rajeshkumar Sanghavi 

---

## 📁 Project Architecture

```
Portfolio/
├── index.html            # Semantic HTML5 markup, OpenGraph, accessibility landmarks
├── css/
│   ├── main.css          # Design system tokens, typography, colors, responsive resets
│   ├── components.css    # Cards, badges, buttons, timeline, navigation, modals
│   └── animations.css    # Subtle glows, glass effects, keyframes, transitions
├── js/
│   ├── config.js         # Centralized personal info, links, projects & journey data
│   ├── canvas-network.js # Interactive AI Neural Synapse/Particle Constellation canvas
│   └── app.js            # Main controller: scroll spy, mobile drawer, modals, form validation
└── README.md             # Documentation, customisation guide & deployment instructions
```

---

## ✏️ How to Customize Your Information

All dynamic project details, personal links, and journey milestones can be customized in **two quick places**:

### 1. `js/config.js`
Open [`js/config.js`](file:///Users/paragrajeshkumarsanghavi/Portfolio/js/config.js) to update:
- Your GitHub profile URL: `github: "https://github.com/your-username"`
- Your LinkedIn URL: `linkedin: "https://www.linkedin.com/in/your-username"`
- Your contact email: `email: "your.name@example.com"`
- Add, edit, or reorder projects and journey milestones.

### 2. `index.html`
Any static copy (such as the location, headline, or bio paragraphs) can be modified directly in [`index.html`](file:///Users/paragrajeshkumarsanghavi/Portfolio/index.html).

---

## 🌐 Deploying to the Web

### Free Deployment via GitHub Pages (Recommended for Students)

1. Create a new GitHub repository named `portfolio` (or `<your-username>.github.io`).
2. Push your files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of modern developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings > Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/portfolio/` within minutes!

---

## 📄 License
Released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to adapt and expand this portfolio throughout your Computer Science and AI/ML journey.
