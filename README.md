# 💼 Portfolio Insight Platform

### Full-Stack Data Engineering & Analytics Project

A **full-stack analytics platform** that demonstrates core **data engineering principles** such as data ingestion, transformation, storage, and downstream consumption through a web application.

The project integrates **real-time financial data ingestion**, backend analytics, and interactive frontend visualization to simulate a **production-style data pipeline** suitable for portfolio tracking and analysis.

---

## 🧠 Project Overview

This project focuses on building a **reliable end-to-end data flow**:

> **API Ingestion → Data Cleaning → Relational Storage → Backend Analytics → Frontend Visualization**

While not a big-data system, the project emphasizes **foundational data engineering concepts** including ETL automation, schema design, data validation, and serving analytical data to downstream applications.

---

## ⚙️ System Architecture

### ☁️ Data Ingestion & ETL Layer

**File:** `etl_pipeline.py`

* Periodically fetches live stock market data using the **Twelve Data API**
* Parses, validates, and normalizes raw API responses
* Transforms data into a structured format suitable for relational storage
* Loads cleaned data into a **cloud-hosted relational database**
* Designed to run continuously at fixed intervals

This layer demonstrates a **lightweight ETL pipeline** commonly used in real-world data systems.

---

### 🗄️ Data Storage Layer

* Uses a **relational database (PostgreSQL / MySQL)** accessed via **SQLAlchemy**
* Stores normalized stock price data and portfolio records
* Enforces structured schema design for analytical queries
* Database choice is **interchangeable**, highlighting portability through ORM usage

The database acts as the **single source of truth** for analytics and reporting.

---

### 🧩 Backend Analytics Layer (Flask)

**Key Components:**

* `routes/portfolio_routes.py`
* `routes/stock_routes.py`
* `utils/calculations.py`
* `db.py`

**Responsibilities:**

* Exposes REST APIs for portfolio and stock data
* Retrieves processed data from the database using SQLAlchemy
* Computes analytics such as:

  * Invested value
  * Current portfolio value
  * Profit / Loss
  * Percentage gain
* Acts as a **data-serving layer**, bridging stored data and frontend visualization

---

### 💻 Frontend Visualization Layer (React)

**Key Components:**

* Portfolio dashboard
* Holdings table
* Performance charts

**Features:**

* Displays portfolio metrics fetched from backend APIs
* Allows users to add or update holdings
* Visualizes portfolio performance using charts and tables
* Clean and responsive UI suitable for analytical dashboards

The frontend represents the **final data consumption layer** of the pipeline.

---

## 🔁 Data Flow Summary

| Stage         | Component       | Purpose                        |
| ------------- | --------------- | ------------------------------ |
| Ingestion     | Twelve Data API | Fetch live market data         |
| ETL           | Python pipeline | Clean and normalize data       |
| Storage       | Relational DB   | Persist structured datasets    |
| Analytics     | Flask backend   | Compute portfolio metrics      |
| Visualization | React app       | Display insights interactively |

---

## 🧩 Tech Stack

* **Frontend:** React, Axios, Recharts
* **Backend:** Flask, SQLAlchemy
* **Database:** Relational DB (PostgreSQL / MySQL)
* **ETL:** Python, REST APIs
* **Configuration:** dotenv
* **Version Control:** Git

---

## 📌 Key Learnings & Highlights

* Implemented an **automated ETL pipeline** for real-time data ingestion
* Designed a **normalized relational schema** for analytical queries
* Used **ORM-based data access** for portability and maintainability
* Built a **data-serving backend** that computes derived metrics
* Delivered insights via a **frontend analytics dashboard**
* Gained hands-on experience with **end-to-end data workflows**

---

## 🧭 Summary

The **Portfolio Insight Platform** is a practical demonstration of how **data engineering concepts integrate with full-stack development**.
It showcases how raw external data can be ingested, transformed, stored, analyzed, and finally visualized in a structured and reliable manner.

