/**
 * NatGamez · Semana 7 · PÁGINA REACT
 * Portada principal recuperada desde la versión estable de Semana 6.
 *
 * Conserva la estructura, clases y diseño de la portada original, pero sus
 * enlaces al catálogo apuntan a la vista React activa de Semana 7.
 */
import HomeHeader from '../components/home/HomeHeader.jsx';
import HomeNavbar from '../components/home/HomeNavbar.jsx';
import HomeWelcome from '../components/home/HomeWelcome.jsx';
import HomeCategories from '../components/home/HomeCategories.jsx';
import HomeFeatured from '../components/home/HomeFeatured.jsx';
import Footer from '../components/layout/Footer.jsx';

function HomePage() {
  return (
    <>
      <a
        className="salto-contenido"
        href="#inicio"
      >
        Saltar al contenido principal
      </a>

      <HomeHeader />
      <HomeNavbar />

      <main id="inicio">
        <HomeWelcome />
        <HomeCategories />
        <HomeFeatured />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
