# Parag Rajeshkumar Sanghavi 

---

## 📁 Project Architecture

```
Portfolio/
├── index.html            # Home page
├── about.html             # About
├── skills.html            # Skills
├── projects.html          # Projects
├── open-source.html       # Open Source
├── journey.html           # Journey
├── education.html         # Education
├── achievements.html      # Achievements
├── activities.html        # Activities
├── contact.html           # Contact
├── css/
│   ├── main.css          # Design tokens, typography, colors, and animated background
│   ├── components.css    # Cards, buttons, navigation, modals, and forms
│   └── animations.css    # Aurora/name marquee, navigation motion, and transitions
├── js/
│   ├── config.js         # Centralized personal info, links, projects & journey data
│   └── app.js            # Navigation, modals, form validation, and motion
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
