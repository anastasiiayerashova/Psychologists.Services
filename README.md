# 🧠 psychologist.services

**psychologist.services** is a web application designed to help users find psychologists, explore detailed information about them, and easily make appointments. The app also allows users to manage their favorite psychologists, filter specialists based on various criteria, and handle their session through a full authentication system. The project follows modern frontend practices and emphasizes clean, reusable code.

## ✨ Project Overview

This application offers a catalog of psychologists with the ability to:

- Filter psychologists by popularity, price, and name

- Add and remove favorites

- View detailed information of each psychologist

- Book an appointment via an easy-to-use form

- Sign up, sign in, fetch current user info, and sign out

## 🎨 Theme Support

The app includes three color themes to choose from:

- 🟢 Green

- 🔵 Blue

- 🟠 Orange

The selected theme is persisted between sessions for authorized users, so when they log in again, their preferred style is automatically applied.

Theme changes are reflected instantly across the UI for a personalized experience.

---

## 🟦 Built with TypeScript

This project is written entirely in **TypeScript**, ensuring:

- Strong typing and better developer experience
- Early detection of potential bugs
- Improved readability and maintainability of the codebase

## ⚙️ Tech Stack

- 🟦 **TypeScript** — for type safety and scalability
- 🚀 **Vite** + ⚛️ **React** — for fast and efficient development
- 📦 **Redux Toolkit** — state management
- 🔗 **React Redux** — binding Redux to React
- 🛣️ **React Router** — client-side routing
- 🔥 **Firebase** — authentication and backend support
- 📝 **React Hook Form** + ✅ **Yup** — for form handling and validation
- 🎨 **MUI (Material UI)** — UI component library
- 🧩 **Custom Components** — TimePicker, ControlledSwitch, CustomAlert
- 🌍 **Vercel** — hosting and deployment
- 🎞️ **Framer Motion** + **GSAP** — for advanced animations

## 🔐 Authentication

- Sign Up
- Sign In
- Sign Out
- Fetch current user

## 🔍 Key Features

- 🧠 **Psychologist filtering by**:

  - **A to Z**: sorts psychologists alphabetically by name (ascending)
  - **Z to A**: sorts psychologists alphabetically by name (descending)
  - **Less than 10$**: shows psychologists with a price below $10
  - **Greater than 10$**: shows psychologists with a price above $10
  - **Popular**: filters by those with high popularity (based on rating)
  - **Not Popular**: filters less popular psychologists
  - **All**: shows the full, unfiltered list

- ❤️ **Favorites page**:

  - Authorized users can add or remove psychologists from their favorites
  - The Favorites page is easily accessible via the navigation bar
  - The list updates dynamically — psychologists can be instantly removed with a single click

- 📄 **Psychologist page**:

  - Each psychologist has a detailed card with extended information
  - A Read More button to reveal additional details
  - A Make an Appointment button opens a form for scheduling

- ✅ **Validated form**:

  - 📝 Built with `react-hook-form` for easy form management and `Yup` for schema-based validation
  - 💡 **Real-time password hints** — as the user types a password during registration, interactive hints appear to guide them (e.g. "At least 8 characters", "Contains a number", "Includes a special character")
  - 🔒 **Password validation** is strict and updates live to reflect whether each condition is met, helping users create strong, secure passwords
  - 🔔 **Custom `Snackbar`** shows confirmation or error messages upon form submission, ensuring smooth user interaction
  - 🧾 **Form fields** include inputs like name, email, rental duration, car model, and accessories selection
  - ⚠️ Dynamic form validation ensures that users provide the necessary information before submitting their booking request.

## 🔧 Code Principles and Best Practices

- 💡 **DRY principle** (Don't Repeat Yourself) is followed — components are reused, and logic is well-organized
- 📱 **Responsive Design** — The application is built to be mobile-friendly and adapts to different screen sizes.
- 🛠 **SOLID principles** — Following object-oriented design principles to create modular, flexible, and reusable code.
- 📂 **Separation of Concerns** — Each component and module has a clear responsibility, improving maintainability and scalability.
- 🚀 **YAGNI principle** (You Aren’t Gonna Need It) — Features are implemented only when they are needed, avoiding unnecessary code or functionality.

## 📁 Project Structure

```plaintext

src/
├── blocks/ # Reactbits blocks
├── components/ # Reusable components
├── config/ # Firebase configuration
├── constants/ # App constants
├── fonts/ # App fonts
├── hooks/ # Reusable hooks
├── pages/ # Page components
├── redux/ # Redux store, slices, selectors
├── styles/ # Custom MUI styles
├── types/ # TypeScript types and interfaces
├── utils/ # Context setup for global state
├── validation/ # Yup schemas
├── index.css # Global styles
├── main.jsx # App entry point
public/
├── favicon.svg # App favicon
├── sprite.svg # SVG icons

```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/anastasiiayerashova/Psychologists.Services

```

2. Install dependencies:

```bash
npm install

```

3. Create a .env file:

```bash
cp .env.example .env

```

4. Then, fill in the required environment variables inside .env. For example:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

> ⚠️ **Do not commit your `.env` file to version control.**  
> It contains sensitive credentials.

5. Start the development server:

```bash
npm run dev

```

6. Open your browser and visit:

```bash
http://localhost:5173

```

## 👩‍💻 About the Author

**Anastasiia Yerashova** — Junior Full-Stack Developer passionate about writing clean and efficient code, growing professionally, and collaborating with purpose-driven teams.

> "I'm a Junior Full-Stack Developer with a strong commitment to building reliable and maintainable solutions.
> I strive to grow professionally by taking on meaningful challenges and collaborating with motivated teams.
> I approach each task with responsibility and dedication, always aiming to deliver my best work.
> My adaptability and eagerness to learn help me stay effective in dynamic, fast-paced environments."

## 📫 Contact

- [LinkedIn](www.linkedin.com/in/anastasia-yerashova)
- [GitHub](https://github.com/anastasiiayerashova)
- Email: yerashova.a@gmail.com

> Thank you for checking out the project! If you found it helpful or interesting, feel free to leave a ⭐ on the repository.
