# 🍽️ Recipes Finder

## 1. Introduction

**Recipes Finder** is a modern web application for discovering recipes, designed to offer a simple and fast user experience. Users can search for dishes by ingredients, name, or category and get accurate results in seconds. The user interface is inspired by the popular **Just Eat** app, featuring a clean, accessible, and responsive design.

---

## 2. Technologies

This project is built with the following technologies:

- **Angular 19** – A powerful frontend framework for modern single-page applications.
- **PrimeNG 19** – A rich set of UI components for Angular.
- **PrimeFlex 19** – A lightweight responsive CSS utility library.
- **PrimeIcons 7** – The default icon library of PrimeNG with over 250 open source icons

---

## 3. Design

The user interface is **inspired by the Just Eat app**, focusing on:

- Simple and intuitive navigation
- Fast and interactive search
- Responsive layout for both mobile and desktop
- Clean design and bright color palette for better readability

---

## 4. Folder Structure

### Folder Descriptions

- **pages/** – Contains the main feature modules and routed pages of the application.
- **shared/** – Reusable logic and components shared across the app:
  - **components/** – Modular and reusable UI elements.
  - **models/** – TypeScript interfaces and type definitions for data models.
  - **const/** – Static data and utility constants (routing app paths, routing api paths ecc..).
  - **services/** – General purpose services used throughout the app.
  - **api/** – DTOs and services dedicated to external API communication and data retrieval.
  - **styles/** – Global stylesheets files.

---

## 5. Get Started

### Requirements

- **Node.js** `v18.x` or higher (`v22.14.0` recommended)
- **npm** (Node Package Manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/mpoligang/recepis-finder.git
cd recepis-finder

# Install dependencies
npm install

# Run the app in development mode
npm start

# Build the app for production
npm run build
```
