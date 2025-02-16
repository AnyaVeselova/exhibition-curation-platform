import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { CollectionProvider } from "./collectionContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body >
        <CollectionProvider>
          <Navbar /> 
          <main className="py-20 px-20 my-20">{children}</main>
          <Footer />
        </CollectionProvider>
      </body>
    </html>
  );
}
