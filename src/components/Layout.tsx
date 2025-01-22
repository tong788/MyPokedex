import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode; // Define the type of children as React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main> {/* Content from pages will be rendered here */}
      <Footer />
    </div>
  );
};

export default Layout;
