
# 💼 Portfolio Insight Platform — Full-Stack Data Engineering System

A **production-style portfolio management and analytics system** that integrates real-time market data ingestion, backend computation, and rich frontend visualization.
Built using **React + Flask + AWS RDS (MySQL)** with a **Twelve Data–driven ETL pipeline**, this project showcases a complete data engineering workflow — from data ingestion to insight delivery.

---

## 🧠 System Overview

This system embodies the **data engineering lifecycle**:

> **Ingestion (ETL)** → **Storage (AWS RDS)** → **Computation (Flask)** → **Visualization (React)**

Each layer operates independently yet synchronously to ensure **accurate, real-time portfolio analytics**.

---

## ⚙️ Architecture

### ☁️ ETL Layer — Automated Data Pipeline

**File:** `etl_pipeline.py`

* Periodically fetches live stock market data from the **Twelve Data API**.
* Cleanses, validates, and normalizes raw data before writing to the database.
* Loads results into **AWS RDS (MySQL)** within the `stocks` table.
* Keeps the backend constantly updated with the **latest market prices**.

This pipeline exemplifies a lightweight yet reliable **data ingestion and transformation process** within a cloud environment.

---

### 🧩 API Layer — Flask Backend

**Key Files:**

* `backend/routes/portfolio_routes.py`
* `backend/routes/stock_routes.py`
* `backend/utils/calculations.py`
* `backend/db.py`

**Responsibilities:**

* Exposes REST endpoints consumed by the React frontend (`/api/portfolio`, `/api/add-portfolio`, etc.).
* Uses **SQLAlchemy ORM** to query AWS RDS for real-time data retrieval.
* Computes per-user metrics such as **invested value**, **current value**, **P/L**, and **percentage gain**.
* Serves as the **computational middleware** connecting raw database data with visual analytics.

---

### 🗄️ Data Layer — AWS RDS (MySQL)

* Acts as the **central analytical datastore** for portfolios and stock data.
* Maintains referential integrity between user positions (`portfolios`) and real-time prices (`stocks`).
* Optimized for analytical queries via SQLAlchemy’s abstraction layer.
* Connection logic handled through `backend/db.py`, with schema initialization by `init_db.py`.

> 🟡 *AWS RDS ensures secure, scalable, and always-on storage for financial datasets, forming the backbone of the project’s reliability.*

---

### 💻 Frontend Layer — React + Vite Dashboard

**Files:**

* `frontend/src/pages/Dashboard.jsx`
* `frontend/src/components/PortfolioForm.jsx`
* `frontend/src/components/PortfolioTable.jsx`
* `frontend/src/components/PortfolioCharts.jsx`

**Features:**

* Real-time portfolio visualization synced with Flask’s API.
* Add or update holdings instantly via `POST /api/add-portfolio`.
* Interactive tables displaying symbol, quantity, average price, market price, P/L, % gain, and last updated time.
* Integrated **historical charts** and **composition pie charts** using Recharts and Twelve Data API.
* Clean, responsive, and intuitive design optimized for financial dashboards.

---

## 🔑 Configuration

All configuration is centralized in the `.env` file at the repository root, including:

* 🗃️ **AWS RDS MySQL connection credentials**
* 🔑 **Twelve Data API key**
* ⚙️ **Flask server and environment variables**

This setup ensures a **secure, environment-agnostic configuration**, ideal for multi-stage (dev, test, prod) deployments.

---

## 🧮 Data Flow Summary

| Stage         | Component         | Function                                 | Technology              |
| ------------- | ----------------- | ---------------------------------------- | ----------------------- |
| Ingestion     | `etl_pipeline.py` | Fetch, clean, and store live data        | Python, Twelve Data API |
| Storage       | AWS RDS (MySQL)   | Centralize market & portfolio data       | Cloud Database          |
| Computation   | Flask Backend     | Perform P/L & portfolio analytics        | Python, SQLAlchemy      |
| Visualization | React Dashboard   | Display charts & analytics interactively | React, Recharts, Axios  |

---

## 🧩 Tech Stack

**Frontend:** React (Vite), Axios, Recharts
**Backend:** Flask, SQLAlchemy
**Database:** MySQL hosted on AWS RDS
**ETL:** Python (scheduled data ingestion via Twelve Data API)
**Hosting (optional):** Render / AWS EC2
**Config Management:** dotenv (`.env`)

---

## 📊 Key Highlights

✅ **AWS RDS Integration** — Secure, cloud-hosted MySQL for persistent storage.
✅ **Automated ETL Pipeline** — Real-time data ingestion & normalization from Twelve Data.
✅ **Full-Stack Synchronization** — Flask connects backend computation to live frontend visualization.
✅ **Financial Intelligence** — Computes invested value, P/L, and gain % dynamically.
✅ **Scalable Architecture** — Each layer (ETL, DB, API, UI) is modular and production-ready.

---

## 🧭 Summary

The **Portfolio Insight Platform** demonstrates how a **data engineering pipeline** can evolve into a **complete analytical ecosystem** — connecting **data ingestion**, **transformation**, **storage**, and **visualization** into a seamless user experience.

> 💡 **In essence:** This isn’t just a portfolio tracker — it’s a real-world example of how to build a **cloud-based data engineering architecture** that transforms raw financial data into actionable insights.

