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
          <main className="my-20 mx-10">{children}</main>
          <Footer />
        </CollectionProvider>
      </body>
    </html>
  );
}
