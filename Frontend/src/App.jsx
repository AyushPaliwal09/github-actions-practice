import { useState, useRef, useEffect } from 'react'
import './App.css'
import Modal from './Modal';

function App() {
  const [data, setData] = useState({
  products: []
});
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      console.log("Sentinel is visible");
      if (!isLoading && hasMore) {
        getData();
      }
    }
  });

  if (sentinelRef.current) {
    observer.observe(sentinelRef.current);
  }

  return () => {
    observer.disconnect();
  };
}, [skip, isLoading, hasMore]);

  async function getData() {
    if(data.products.length >= 194) {
      setHasMore(false);
      return;
    }
    console.log("getData called");
    setIsLoading(true);

    try {
      console.log(`Fetching data with skip=${skip}`);
      const response = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=10`);
      const jsonData = await response.json();
      setData(prevData => ({
        ...prevData, products: [...(prevData.products || []), ...jsonData.products]
      }));
      setSkip(prevSkip => prevSkip + 10);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }
  const onClose = () => {
    console.log(modalOpen);
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center' }}>Products</h2>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.products && data.products.map((item) => (
            <li key={item.id} className="card">
              <img src={item.thumbnail} alt={item.title} style={{ width: '60%', height: 'auto', margin: '0 auto', display: 'block', alignItems: 'center' }} />
              <h5>{item.id}</h5>
              <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
              <p style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px' }}>{item.description}</p>
              <p style={{ textAlign: 'center', margin: '10px 0', fontSize: '16px', fontWeight: 'bold', margin: '0' }}>Price: ${item.price}</p>
              <button onClick={() => setModalOpen(true)} style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '0px 0', textAlign: 'center' }}>Buy Now</button>
            </li>
            ))}
        </ul>
        <div ref={sentinelRef} style={{textAlign:'center'}}>Loading...</div>
        {modalOpen && <Modal onclose={onClose}/>}
      </div>
     
    </>
  )
}

export default App
