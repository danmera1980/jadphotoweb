import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Match = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const match = searchParams.get('match');
  console.log(match)

  return (
    <div>
      <Navbar />

      <Footer />
    </div>
  );
}

export default Match