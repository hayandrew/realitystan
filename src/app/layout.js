import "./fonts.css";
import "./theme.css";
import "./index.css";
import "./App.css";
import "../components/Footer/Footer.css";
import "../components/Header/Header.css";
import "../components/Overlay/Overlay.css";
import "../components/People/People.css";
import "../components/Person/Person.css";
import "../components/SelectBox/SelectBox.css";
import "../components/LoadingSpinner/LoadingSpinner.css";

export const metadata = {
  title: "RealityStan",
  description:
    "A simulator and calculator to track Head of Household, nominees, votes, and evictions on Big Brother.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
