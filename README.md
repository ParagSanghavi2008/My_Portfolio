# Parag Rajeshkumar Sanghavi — Personal Developer Portfolio

A modern, minimal, high-performance personal portfolio website for **Parag Rajeshkumar Sanghavi**, a first-year Computer Science Engineering student specializing in **Artificial Intelligence & Machine Learning** from Maharashtra, India.

Built with an aesthetic dark theme, glassmorphic surfaces, an interactive HTML5 AI neural network canvas, and responsive layouts.

---

## 🚀 Live Local Preview

This project is built using zero-dependency, standard-compliant semantic **HTML5**, **Vanilla CSS3**, and **Modern ES6+ JavaScript**. It requires no Node/npm build steps, compiles instantaneously, and runs in any web browser.

### Option 1: Python Built-in HTTP Server (Instant)

Open your terminal in the portfolio directory and run:

```bash
# macOS / Linux
python3 -m http.server 3000

# Windows
python -m http.server 3000
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: VS Code Live Server Extension
1. Open the project folder in VS Code / Antigravity IDE.
2. Right-click on `index.html` and click **"Open with Live Server"**.

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

## 🎨 Key Features & Design Choices

1. **AI Neural Network Canvas Visualizer**:
   - High-performance, retina-scaled HTML5 canvas in the hero section.
   - Nodes representing neurons and data packets connected by dynamic synaptic lines.
   - Interactive mouse/touch gravitational attraction and synaptic energy pulses.
   - Automatically pauses render loop when scrolled out of view to preserve 60fps performance and zero battery drain.
   - Full support for `prefers-reduced-motion`.

2. **Accent Palette Switcher**:
   - Click the accent pill in the navigation header to cycle between **Electric Blue**, **Cyber Violet**, and **Emerald Green**.
   - Your choice is persisted in `localStorage`.

3. **Honest Engineering Metrics**:
   - In accordance with academic integrity, skills and projects represent true status without fake progress bars or arbitrary percentages.
   - Status chips: `Primary Focus`, `Learning`, `Foundational`, `In Development / Prototype`, `Active Repository`, `Coming Soon`.

4. **Interactive Project System Architecture Modal**:
   - Clicking *"Architecture & Details"* on any project opens a focused, frosted-glass modal detailing the problem context, algorithmic approach, and system design highlights.

5. **Contact Handling with Integrity**:
   - The contact form provides client-side validation and a transparent dispatch modal that offers a 1-click **"Open Email Client"** action or simple instructions for connecting a backend service (e.g. Formspree or EmailJS).
   - Includes a 1-click **Copy to Clipboard** button with toast feedback for your email address.

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
