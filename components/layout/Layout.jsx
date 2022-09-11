import Footer from '@layout/Footer';
import Navbar from '@layout/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
