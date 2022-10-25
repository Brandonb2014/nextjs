import '../styles/globals.css';
import '../dist/output.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div className='md:container md:mx-auto bg-zinc-50'>
      <Navbar title={Component.name} />

      <Component {...pageProps} />

      <footer>
        <span className='text-xs'>icons from <a href='https://www.flaticon.com/'>flaticon</a></span>
      </footer>
    </div>
  );
}

export default MyApp;
