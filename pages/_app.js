import '../styles/globals.css';
import '../dist/output.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar title={Component.name} />

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
