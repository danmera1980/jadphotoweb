import Footer from '@/components/Footer/Footer';
import MatchesGallery from '@/components/MatchesGallery/MatchesGallery';
import Navbar from '@/components/Navbar/Navbar';

const Gallery = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Galeria de Partidos</h1>
        <MatchesGallery/>
      </div>
      <Footer />
    </div>
  );
}

export default Gallery