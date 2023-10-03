import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';
import Footer from './Footer';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
// outlet comes with router and it is like children passed. It will render (what is being inside element) at the place of outlet  ref -> element={<p>cities</p>} />
