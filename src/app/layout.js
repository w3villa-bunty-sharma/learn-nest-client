import "./globals.css";

export const metadata = {
  title: "LearnNest | Learn Today. Grow Tomorrow.",
  description: "Your platform for learning and growing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}