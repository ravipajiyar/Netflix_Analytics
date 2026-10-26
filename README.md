# Netflix Analytics

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-API-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Pandas](https://img.shields.io/badge/Pandas-Data-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![Plotly](https://img.shields.io/badge/Plotly-Charts-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/javascript/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **Netflix Analytics** — A full-stack dashboard that turns the Netflix titles dataset into interactive insights on catalog growth, genres, talent, sentiment, duration, and regional reach.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Pages & Views](#-pages--views)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Security Notes](#-security-notes)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📖 Overview

Netflix Analytics is a data-visualization project built around the **Netflix Movies and TV Shows** dataset. A Flask API loads the CSV into memory, processes it with Pandas and TextBlob, and exposes clean JSON endpoints. A React + Vite frontend consumes those endpoints and presents the results through a responsive, Netflix-inspired analytics workspace.

The bundled dataset contains **8,809 titles** with fields including title type, director, cast, country, release year, maturity rating, duration, genres, and description.

The application includes both live API-driven views and clearly marked illustrative panels for concepts such as audience demographics and social impact.

---

## ✨ Features

### 📊 Catalog Analytics
- **Dashboard overview** — Total titles, movies, TV shows, and unique directors
- **Year filtering** — Compare the full catalog or a specific release year
- **Content trends** — Release timeline, format split, and movie-versus-TV comparisons
- **Peak-year detection** — Identify the year with the highest release volume

### 🎭 Genre & Talent Insights
- **Genre analysis** — Top genres, distribution, dominant share, and title counts
- **Top actors** — Ranked cast appearances with a leaderboard
- **Top directors** — Ranked director credits with a leaderboard
- **Yearly and monthly views** — Switch between live yearly data and illustrative monthly views

### 💬 Sentiment & Duration
- **Description sentiment** — TextBlob polarity analysis grouped as Positive, Neutral, or Negative
- **Sentiment over time** — Track audience tone across release years
- **Runtime analysis** — Average and longest movie runtimes
- **Series length** — Average seasons and season distribution
- **Duration breakdowns** — Runtime buckets and viewing-pattern panels

### 🗺️ Geography & Reports
- **Interactive world map** — Country-level content intensity with a playback slider
- **Report workspace** — Report templates, status cards, and a simulated generation flow

### 🎨 User Experience
- **Netflix-inspired dark theme** — Custom Tailwind color palette and gradients
- **Responsive layout** — Collapsible sidebar and adaptive chart grids
- **Interactive charts** — Plotly-powered bars, lines, pies, and grouped comparisons
- **Loading and empty states** — Smooth transitions across API-driven views
- **Modern typography** — Inter and Plus Jakarta Sans from Google Fonts

> **Note:** The core analytics are driven by the Flask API. Some supporting panels (for example viewer demographics, social-media reach, and sample reports) use illustrative mock data.

---

## 🗺 Pages & Views

| Route | View | Description |
|-------|------|-------------|
| `/` | Dashboard | Catalog KPIs, growth chart, sentiment mix, top actors, and top genres |
| `/content-trend` | Content Analysis | Release timeline, format split, and movie-versus-TV output |
| `/genre-analysis` | Genre Analytics | Genre ranking, distribution, growth trends, and engagement panels |
| `/actors` | Actor Analytics | Top actors, leaderboard, and illustrative audience panels |
| `/directors` | Director Analysis | Top directors, leaderboard, and production-trend panels |
| `/sentiment-analysis` | Sentiment Analysis | Positive/neutral/negative shares and sentiment over time |
| `/duration-analysis` | Duration Analysis | Movie runtimes, series seasons, and viewing-completion views |
| `/map` | Content Footprint | World map with country intensity and a timeline playback control |
| `/reports` | Reports | Report categories, recent reports, and report generation UI |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based user interface |
| **Vite 5** | Development server and production build |
| **React Router 6** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling and custom theme |
| **Plotly.js / react-plotly.js** | Interactive charts |
| **Axios** | HTTP requests to the Flask API |
| **Lucide React** | Icon system |
| **React Simple Maps** | World map visualization |
| **Framer Motion** | UI animation support |

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3** | Runtime |
| **Flask** | REST API server |
| **Flask-CORS** | Cross-origin requests from the Vite frontend |
| **Pandas** | Dataset loading, grouping, and aggregation |
| **TextBlob** | Description sentiment analysis |

### Data & Tooling
| Technology | Purpose |
|------------|---------|
| **CSV** | Source dataset (`netflix_titles.csv`) |
| **ESLint** | JavaScript and React linting |
| **PostCSS / Autoprefixer** | CSS processing |

---

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser (React + Vite)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  React Pages │  │  Components  │  │   Plotly Charts     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ Axios requests
                            ▼
                    ┌─────────────────────┐
                    │     Flask API       │
                    │  • Dashboard routes │
                    │  • Chart endpoints  │
                    │  • CORS enabled     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   netflix_titles.csv │
                    │   Pandas + TextBlob  │
                    └─────────────────────┘
```

The frontend runs separately from the API during development. The API loads the CSV at startup and keeps the processed dataset in memory; every request performs the required aggregation and returns JSON.

---

## 📁 Project Structure

```bash
Netflix_Analytics/
├── backend/
│   ├── app.py                  # Flask app and analytics endpoints
│   ├── netflix_titles.csv      # Dataset used by the API
│   ├── .python-version         # Python 3.13.5 for Render
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Local Python environment (optional)
├── public/
├── src/
│   ├── components/
│   │   ├── BarChart.jsx
│   │   ├── ChartCard.jsx
│   │   ├── DataSection.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FilterSelect.jsx
│   │   ├── GroupedBarChart.jsx
│   │   ├── LineChart.jsx
│   │   ├── Loading.jsx
│   │   ├── PageHeader.jsx
│   │   ├── PieChart.jsx
│   │   ├── ProgressList.jsx
│   │   ├── SegmentedControl.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── Topbar.jsx
│   │   └── YearSlider.jsx
│   ├── data/
│   │   └── netflix_titles.csv  # Frontend copy of the dataset
│   ├── pages/
│   │   ├── Actors.jsx
│   │   ├── ContentTrend.jsx
│   │   ├── Directors.jsx
│   │   ├── DurationAnalysis.jsx
│   │   ├── GenreAnalysis.jsx
│   │   ├── Home.jsx
│   │   ├── Map.jsx
│   │   ├── Reports.jsx
│   │   └── SentimentAnalysis.jsx
│   ├── api.js                  # Axios API client
│   ├── App.jsx                 # Routes and layout
│   ├── index.css               # Global styles and Tailwind layers
│   ├── main.jsx                # React entry point
│   ├── navItems.jsx            # Sidebar navigation configuration
│   └── utils.js                # Formatting and data helpers
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── render.yaml                 # Render backend blueprint
├── tailwind.config.js
├── vercel.json                 # Vercel frontend configuration
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/) 3.10 or newer
- No database is required — analytics are computed from the bundled CSV

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/ravipajiyar/Netflix_Analytics.git
cd Netflix_Analytics
```

2. **Start the backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

The Flask API runs at [http://localhost:3001](http://localhost:3001).

> On Windows, activate the environment with `venv\Scripts\activate`.

3. **Start the frontend** (from the project root in a second terminal)
```bash
npm install
npm run dev
```

The Vite app runs at [http://localhost:5173](http://localhost:5173).

4. **Open the dashboard**

Visit [http://localhost:5173](http://localhost:5173) after both servers are running.

### If Port 3001 Is Already in Use

Start Flask on another port:
```bash
cd backend
flask --app app run --port 3002
```

Then create a `.env` file at the project root:
```env
VITE_API_BASE_URL=http://localhost:3002
```

Restart the Vite dev server after changing environment variables.

### Environment Variables

| Variable | Location | Default | Purpose |
|----------|----------|---------|---------|
| `VITE_API_BASE_URL` | Project root `.env` | `http://localhost:3001` | Base URL used by the frontend API client |
| `CORS_ORIGINS` | Render environment | `*` | Comma-separated list of allowed frontend origins |

The backend requires no secrets. The CSV must remain in the `backend/` directory because `app.py` loads it relative to its own location.

### Dataset

The backend expects these columns:

```text
show_id, type, title, director, cast, country, date_added,
release_year, M_rating, duration, listed_in, description
```

If you replace the CSV, preserve the schema — particularly `M_rating`, which the maturity-rating analytics depend on.

---

## 📜 Available Scripts

Run these from the project root:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

Backend:

| Command | Description |
|---------|-------------|
| `python app.py` | Start Flask in debug mode on port 3001 |
| `flask --app app run --port 3002` | Start Flask on a custom port |

---

## 🔌 API Reference

The Flask API is read-only and uses CORS. All routes return JSON.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard_data` | Aggregate dashboard metrics and chart data |
| `GET` | `/dashboard_data/<year>` | Dashboard data filtered by release year |
| `GET` | `/maturity_ratings` | Maturity-rating counts |
| `GET` | `/top_directors` | Top five directors by title count |
| `GET` | `/top_directors/<year>` | Top directors for a release year |
| `GET` | `/top_actors` | Top five actors by appearance count |
| `GET` | `/top_actors/<year>` | Top actors for a release year |
| `GET` | `/content_trend` | Movie and TV counts by release year |
| `GET` | `/content_trend/<year>` | Content trend for a release year |
| `GET` | `/top_genres` | Top five genres by title count |
| `GET` | `/top_genres/<year>` | Top genres for a release year |
| `GET` | `/sentiment_analysis` | Description sentiment counts by release year |
| `GET` | `/duration_analysis` | Duration values for movies and series |
| `GET` | `/health` | Health check used by Render |

### Example Request

```bash
curl http://localhost:3001/dashboard_data
```

### Example Response Shape

```json
{
  "totalDirectors": 4528,
  "totalMovies": 6131,
  "totalTVShows": 2676,
  "topDirectors": [],
  "contentTrend": [],
  "topGenres": [],
  "sentimentAnalysis": []
}
```

> Sentiment analysis runs TextBlob over every description, so `/sentiment_analysis` and `/dashboard_data` may take a couple of seconds to respond on the first request.

---

## 🌐 Deployment

The project is configured for a split deployment: **Render** hosts the Flask API and **Vercel** hosts the React frontend.

### 1. Deploy the Backend on Render

The repository includes a [`render.yaml`](render.yaml) Blueprint that creates a Python web service with:

- **Root directory:** `backend`
- **Runtime:** Python 3.13.5
- **Build command:** `pip install -r requirements.txt`
- **Start command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 120`
- **Health check:** `/health`

Steps:

1. Push the repository to GitHub.
2. Open the [Render Dashboard](https://dashboard.render.com/) and choose **New → Blueprint**.
3. Connect the repository and apply `render.yaml`.
4. After deployment, copy the service URL, for example `https://netflix-analytics-api.onrender.com`.
5. Verify it with:
```bash
curl https://your-service.onrender.com/health
```
Expected response: `{"status":"ok"}`.

The CSV is loaded relative to `app.py`, so `backend/netflix_titles.csv` must be included in the deployed source. Render's free instances spin down after inactivity, so the first request may take longer.

### 2. Deploy the Frontend on Vercel

The repository includes a [`vercel.json`](vercel.json) configuration with:

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrite:** all routes fall back to `index.html`

Steps:

1. Open the [Vercel Dashboard](https://vercel.com/dashboard) and choose **Add New → Project**.
2. Import the GitHub repository.
3. Keep the root directory as `./` and let `vercel.json` provide the build settings.
4. Add this environment variable for **Production** (and Preview if desired):
```env
VITE_API_BASE_URL=https://your-service.onrender.com
```
5. Deploy the project.
6. Copy the Vercel production URL.

Vercel does not include `.env` files from Git, so `VITE_API_BASE_URL` must be added in **Project Settings → Environment Variables** before building.

### 3. Connect the Frontend and Backend

After both deployments exist:

1. In Render, open the backend service → **Environment**.
2. Set `CORS_ORIGINS` to your Vercel URL:
```env
CORS_ORIGINS=https://your-app.vercel.app
```
3. Redeploy the backend.
4. Open the Vercel URL and verify that the dashboard loads API data.

`CORS_ORIGINS` accepts a comma-separated list for multiple origins. The default `*` allows every origin and is convenient for initial setup, but should be restricted in production.

---

## 🔒 Security Notes

This project is intended for analytics and portfolio use. Before exposing it publicly:

- **No authentication** — All endpoints are open and read-only.
- **CORS** — Set `CORS_ORIGINS` to your frontend URL in production. The default `*` allows requests from any origin.
- **Development server** — `app.run(debug=True)` is only suitable for local development. Use Gunicorn or another production WSGI server when deployed.
- **No secrets** — The application does not require credentials, but never commit `.env` files or deployment secrets.
- **Input validation** — Year routes accept integers; add stricter validation and rate limiting if the API is public.
- **Data exposure** — The bundled CSV is a public dataset. Avoid uploading private data to this project as-is.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please run `npm run lint` and verify the dashboard before opening a pull request.

---

## 📄 License

No license file is currently included in this repository. Unless a license is added, all rights are reserved by the author. If you plan to redistribute the project, consider adding an MIT or another OSI-approved license.

---

## 👨‍💻 Author

**Ravi Pajiyar**

- GitHub: [@ravipajiyar](https://github.com/ravipajiyar)
- LinkedIn: [Ravi Pajiyar](https://www.linkedin.com/in/ravi-pajiyar-a4a5512ba/)
- Live Link: https://netflix-analytics-gules.vercel.app/

---

Built with ❤️ for exploring streaming data.
