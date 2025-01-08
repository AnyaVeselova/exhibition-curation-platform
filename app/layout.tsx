
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar/>
        <Footer/>
        <main>{children}</main>
        
      </body>
    </html>
  );
}
