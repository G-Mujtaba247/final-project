
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WebLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.1),transparent_35%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.08),transparent_38%)]">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default WebLayout;
