/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "chat-bg": "#212121",
            "chat-sidebar": "#171717",
            "chat-user-bubble": "#303030",
            "chat-ai-bubble": "#212121",
        }
    },
  },
  plugins: [],
}
