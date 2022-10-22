import Layout from '../components/layout';

export default function Home() {
  return (
    <div className='container'>
      <Layout title="Home">
        <div>Home</div>
      </Layout>
      
      <p className="text-3xl font-bold underline">
        Welcome to the SWAPI-dia!
      </p>
    </div>
  )
}
