import Footer from '@/components/Footer/Footer';
import MatchesGallery from '@/components/MatchesGallery/MatchesGallery';
import Navbar from '@/components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Gallery = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get("admin");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col text-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Galeria de Partidos</h1>
        <MatchesGallery isEditable={adminId === "danmera"}/>
      </div>
      <Footer />
    </div>
  );
}

export default Gallery