import { FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client'


const Home = ({products, bannerData})=> {
  console.log(bannerData)
  return (
    <>
      
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h3>Original Apple Gadgets</h3>
        <p>Iphones, Airpods, Iwatch</p>
      </div>
      <div className='products-container'>
        {products.map((product)=> <Product key={product._id} product={product} />)}

      </div>

      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
     

     
    </>
  )
}
//Get query from server ie sanityclient, check which type and render accordingly.
export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);
  

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);
  // console.log(bannerData)

  return{
    props: {products, bannerData}
  }
}

export default Home

