
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WebLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default WebLayout;
