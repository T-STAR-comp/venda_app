import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/home.module.css';
import Footer from '../Footer/footer';
import Login from '../Auth/Login';
import Signup from '../Auth/signup';
import UserOptionsModal from './components/userOptions';
import PostAdModal from './components/postAd';

const carImg = 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80';
const houseImg = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80';
const laptopImg = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80';
const sofaImg = 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80';

// SVG icon components
const CategoryIcons = {
  Vehicles: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="5" rx="2"/>
      <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>
      <circle cx="7.5" cy="18.5" r="1.5"/>
      <circle cx="16.5" cy="18.5" r="1.5"/>
      <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>
    </svg>
  ),
  'Real Estate': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 4l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10.5z"/><rect x="9" y="14" width="6" height="8"/></svg>
  ),
  Electronics: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 20h12"/></svg>
  ),
  'Sports & Outdoors': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17H3V3h2zm14 0h2V3h-2zM7 17l5-8 5 8"/></svg>
  ),
  Commercial: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="7" height="13"/><rect x="14" y="3" width="7" height="17"/></svg>
  ),
  Fashion: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7V5a4 4 0 0 0-8 0v2"/><rect x="4" y="7" width="16" height="13" rx="2"/></svg>
  ),
};

const categories = [
  { name: 'Vehicles' },
  { name: 'Real Estate' },
  { name: 'Electronics' },
  { name: 'Sports & Outdoors' },
  { name: 'Commercial' },
  { name: 'Fashion' },
];

const products = [
  {
    id: 1,
    title: 'Sedan 2020',
    price: 'MWK 15,000,000',
    location: 'Lilongwe',
    time: 'Today 12:30',
    image: carImg,
    featured: true,
    category: 'Vehicles',
    listerName: 'James Banda',
    whatsapp: '+265991234567',
    description: 'A well-maintained 2020 sedan with low mileage, full service history, and excellent fuel economy.',
  },
  {
    id: 2,
    title: '3 bedroom house',
    price: 'MWK 80,000,000',
    location: 'Blantyre',
    time: 'Today 11:15',
    image: houseImg,
    featured: false,
    category: 'Real Estate',
    listerName: 'Mary Chirwa',
    whatsapp: '+265888765432',
    description: 'A spacious 3-bedroom house located in a quiet neighborhood.',
  },
  {
    id: 3,
    title: 'Laptop for sale',
    price: 'MWK 250,000',
    location: 'Mzuzu',
    time: 'Today 03:00',
    image: laptopImg,
    featured: true,
    category: 'Electronics',
    listerName: 'Peter Mvula',
    whatsapp: '+265997654321',
    description: 'A high-performance laptop with a 16GB RAM and 512GB SSD.',
  },
  {
    id: 4,
    title: 'Sofa',
    price: 'MWK 180,000',
    location: 'Zomba',
    time: 'Yesterday 15:45',
    image: sofaImg,
    featured: false,
    category: 'Fashion',
    listerName: 'Grace Phiri',
    whatsapp: '+265881234567',
    description: 'A comfortable sofa made from high-quality materials.',
  },
  {
    id: 5,
    title: 'Mountain Bike',
    price: 'MWK 350,000',
    location: 'Lilongwe',
    time: 'Today 09:00',
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Sports & Outdoors',
    listerName: 'John Mwale',
    whatsapp: '+265991112233',
    description: 'A rugged mountain bike suitable for off-road adventures.',
  },
  {
    id: 6,
    title: 'Office Space for Rent',
    price: 'MWK 1,200,000/month',
    location: 'Blantyre',
    time: 'Today 10:30',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Commercial',
    listerName: 'Linda Nkhoma',
    whatsapp: '+265882223344',
    description: 'A modern office space with a view of the city skyline.',
  },
  {
    id: 7,
    title: 'Designer Dress',
    price: 'MWK 90,000',
    location: 'Mzuzu',
    time: 'Today 08:00',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Fashion',
    listerName: 'Agnes Chikondi',
    whatsapp: '+265883334455',
    description: 'A stunning designer dress for special occasions.',
  },
  {
    id: 8,
    title: 'Smart TV 55"',
    price: 'MWK 700,000',
    location: 'Lilongwe',
    time: 'Yesterday 17:00',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Electronics',
    listerName: 'Brian Chirwa',
    whatsapp: '+265884445566',
    description: 'A large 55" Smart TV with 4K resolution.',
  },
  {
    id: 9,
    title: 'Soccer Ball',
    price: 'MWK 15,000',
    location: 'Blantyre',
    time: 'Today 13:00',
    image: 'https://images.unsplash.com/photo-1505843279827-4b2b9c5c0c88?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Sports & Outdoors',
    listerName: 'Samuel Banda',
    whatsapp: '+265885556677',
    description: 'A high-quality soccer ball for professional use.',
  },
  {
    id: 10,
    title: 'Warehouse for Sale',
    price: 'MWK 45,000,000',
    location: 'Lilongwe',
    time: 'Yesterday 10:00',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Commercial',
    listerName: 'Patricia Moyo',
    whatsapp: '+265886667788',
    description: 'A large warehouse with ample storage space.',
  },
  {
    id: 11,
    title: 'Convertible 2018',
    price: 'MWK 22,000,000',
    location: 'Blantyre',
    time: 'Today 14:00',
    image: 'https://images.unsplash.com/photo-1511391403515-1c1c5b6a1a9b?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Vehicles',
    listerName: 'Victor Chisale',
    whatsapp: '+265887778899',
    description: 'A stylish 2018 convertible with a powerful engine.',
  },
  {
    id: 12,
    title: 'Luxury Apartment',
    price: 'MWK 150,000/month',
    location: 'Lilongwe',
    time: 'Today 16:00',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Real Estate',
    listerName: 'Emily Jere',
    whatsapp: '+265888889900',
    description: 'A luxurious apartment with stunning city views.',
  },
  {
    id: 13,
    title: 'Bluetooth Headphones',
    price: 'MWK 60,000',
    location: 'Zomba',
    time: 'Yesterday 19:00',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Electronics',
    listerName: 'Chikondi Phiri',
    whatsapp: '+265889990011',
    description: 'High-quality Bluetooth headphones with noise-cancellation.',
  },
  {
    id: 14,
    title: "Men's Suit",
    price: 'MWK 120,000',
    location: 'Mzuzu',
    time: 'Today 09:30',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Fashion',
    listerName: 'Kelvin Nyondo',
    whatsapp: '+265880001122',
    description: 'A tailored men\'s suit for formal occasions.',
  },
  {
    id: 15,
    title: 'Family House',
    price: 'MWK 60,000,000',
    location: 'Blantyre',
    time: 'Today 10:45',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Real Estate',
    listerName: 'Martha Chirwa',
    whatsapp: '+265881122334',
    description: 'A spacious family house with a large backyard.',
  },
  {
    id: 16,
    title: 'Used Pickup',
    price: 'MWK 8,000,000',
    location: 'Lilongwe',
    time: 'Yesterday 12:00',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
    featured: false,
    category: 'Vehicles',
    listerName: 'Blessings Mbewe',
    whatsapp: '+265882233445',
    description: 'A used pickup truck with low mileage and good condition.',
  },
  {
    id: 17,
    title: 'Treadmill',
    price: 'MWK 400,000',
    location: 'Blantyre',
    time: 'Today 07:30',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Sports & Outdoors',
    listerName: 'Hope Banda',
    whatsapp: '+265883344556',
    description: 'A high-quality treadmill for home use.',
  },
  {
    id: 18,
    title: 'Shop for Rent',
    price: 'MWK 300,000/month',
    location: 'Mzuzu',
    time: 'Yesterday 16:00',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Commercial',
    listerName: 'Lilian Kumwenda',
    whatsapp: '+265884455667',
    description: 'A commercial shop for rent in a busy area.',
  },
  {
    id: 19,
    title: "Women's Handbag",
    price: 'MWK 45,000',
    location: 'Lilongwe',
    time: 'Today 13:30',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    featured: true,
    category: 'Fashion',
    listerName: 'Ruth Manda',
    whatsapp: '+265885566778',
    description: 'A stylish women\'s handbag for everyday use.',
  },
  {
    id: 20,
    title: 'Gaming Console',
    price: 'MWK 350,000',
    location: 'Blantyre',
    time: 'Today 15:00',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    featured: false,
    category: 'Electronics',
    listerName: 'Patrick Chirwa',
    whatsapp: '+265886677889',
    description: 'A powerful gaming console for high-quality gaming.',
  },
];

function ViewProducts({ category, onProductClick }) {
  let filtered;
  if (!category) {
    filtered = products.filter(p => p.featured);
  } else {
    filtered = products.filter(p => p.category === category);
  }
  return (
    <section className={styles.productGridSection}>
      <div className={styles.productGrid}>
        {filtered.map((prod) => (
          <div className={styles.productCard} key={prod.id} onClick={() => onProductClick && onProductClick(prod)} style={{cursor:'pointer'}}>
            <img src={prod.image} alt={prod.title} className={styles.productImgTall} />
            <div className={styles.productInfo}>
              <div className={styles.productTitle}>{prod.title}</div>
              <div className={styles.productPrice}>{prod.price}</div>
              <div className={styles.productMeta}>
                <span className={styles.productLocation}>📍 {prod.location}</span>
                <span className={styles.productTime}>{prod.time}</span>
              </div>
              {prod.featured && (
                <span style={{color:'#D7263D',fontWeight:600,fontSize:'0.9rem',marginTop:'0.3rem'}}>★ Featured</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const HomeComp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPostAd, setShowPostAd] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search submitted');
  };

  const handleCategoryClick = (category) => {
    // TODO: Implement category filtering
    console.log('Category clicked:', category);
  };

  const handleProductClick = (product) => {
    setModalProduct(product);
  };

  const handleViewAll = () => {
    // TODO: Navigate to all products page
    console.log('View all clicked');
  };

  const formatPrice = (price, originalPrice) => {
    if (originalPrice && originalPrice !== price) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{price}</span>
          <span style={{ 
            textDecoration: 'line-through', 
            color: '#86868b', 
            fontSize: '0.9rem',
            fontWeight: '400'
          }}>
            {originalPrice}
          </span>
        </div>
      );
    }
    return <span>{price}</span>;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  // Handler for options
  const handleOption = (key) => {
    setShowOptions(false);
    if (key === 'logout') {
      // TODO: Implement logout
      alert('Logged out!');
    } else if (key === 'changePassword') {
      // TODO: Implement change password
      alert('Change password clicked');
    } else if (key === 'postAd') {
      setShowPostAd(true);
    } else if (key === 'viewAds') {
      // TODO: Implement view my ads
      alert('View my ads clicked');
    }
  };

  const handlePostAd = (ad) => {
    alert('Ad posted! (Demo)');
    setShowPostAd(false);
  };

  return (
    <div className={styles.main_div}>
      {/* Header */}
      <header className={styles.headerBar}>
        <div className={styles.headerContent}>
          <span className={styles.logoVenda}>VENDA</span>
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Messages</a>
            <a href="#" className={styles.navLink}>My ads</a>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.postAdBtn} onClick={() => setShowOptions(true)}>Options</button>
            <button className={styles.postAdBtn}>Logout</button>
            <button className={styles.loginBtn} onClick={() => setShowLogin(true)}>Log in</button>
            <button className={styles.postAdBtn} onClick={() => setShowPostAd(true)}>Post ad</button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <form className={styles.searchForm}>
          <input className={styles.searchInput} placeholder="What are you looking for?" />
          <select className={styles.categoryDropdown}>
            <option>All categories</option>
            {categories.map((cat) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button className={styles.searchBtn}>Search</button>
        </form>
      </section>

      {/* Categories Row */}
      <section className={styles.categoriesRowSection}>
        <h2 className={styles.categoriesRowTitle}>Browse categories</h2>
        <div className={styles.categoriesRow}>
          {categories.map((cat) => (
            <div
              className={styles.categoryIconBox}
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{cursor:'pointer'}}
            >
              <span className={styles.categoryIcon}>{CategoryIcons[cat.name]}</span>
              <span className={styles.categoryLabel}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <ViewProducts category={selectedCategory} onProductClick={handleProductClick} />

      {/* Product Modal */}
      {modalProduct && (
        <div className={styles.modalOverlay} onClick={() => setModalProduct(null)}>
          <div className={styles.bottomSheetModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHandle}></div>
            <div className={styles.modalCloseIcon} onClick={() => setModalProduct(null)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <img src={modalProduct.image} alt={modalProduct.title} className={styles.modalImage} />
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{modalProduct.title}</h2>
              <div className={styles.modalPrice}>{modalProduct.price}</div>
              <div className={styles.modalMeta}>
                <span>📍 {modalProduct.location}</span>
                <span>{modalProduct.time}</span>
              </div>
              <div className={styles.modalLister}>Listed by: <b>{modalProduct.listerName}</b></div>
              <div className={styles.modalDescription}>{modalProduct.description}</div>
              <div className={styles.modalActions}>
                <a
                  href={`https://wa.me/${modalProduct.whatsapp.replace(/[^\d]/g, '')}?text=Hi%2C%20I%20am%20interested%20in%20your%20listing%20on%20Venda%3A%20${encodeURIComponent(modalProduct.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  {/* Official WhatsApp icon */}
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.3rem'}}>
                    <circle cx="16" cy="16" r="16" fill="#25D366"/>
                    <path d="M23.472 19.339c-.355-.177-2.104-1.037-2.43-1.155-.326-.119-.563-.177-.8.177-.237.355-.914 1.155-1.122 1.393-.208.237-.415.266-.77.089-.355-.178-1.5-.553-2.86-1.763-1.057-.944-1.77-2.108-1.98-2.463-.208-.355-.022-.546.156-.723.16-.159.355-.415.533-.622.178-.208.237-.355.355-.592.119-.237.06-.444-.03-.622-.089-.178-.8-1.924-1.095-2.637-.288-.692-.58-.597-.8-.608-.208-.009-.444-.011-.68-.011-.237 0-.622.089-.948.444-.326.355-1.24 1.211-1.24 2.951 0 1.74 1.268 3.422 1.445 3.659.178.237 2.5 3.82 6.063 5.209.849.292 1.51.466 2.026.596.851.203 1.626.174 2.238.106.682-.076 2.104-.859 2.403-1.689.296-.83.296-1.541.207-1.689-.089-.148-.326-.237-.681-.414z" fill="#fff"/>
                  </svg>
                  Message on WhatsApp
                </a>
                <a href={`tel:${modalProduct.whatsapp}`} className={styles.callBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.3rem'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div className={styles.bottomSheetModal} onClick={e => e.stopPropagation()} style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <div className={styles.modalHandle}></div>
            <div className={styles.modalCloseIcon} onClick={() => setShowLogin(false)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.modalContent}>
              <LoginModalContent onSignup={() => { setShowLogin(false); setShowSignup(true); }} />
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className={styles.modalOverlay} onClick={() => setShowSignup(false)}>
          <div className={styles.bottomSheetModal} onClick={e => e.stopPropagation()} style={{maxHeight: '90vh', overflowY: 'auto'}}>
            <div className={styles.modalHandle}></div>
            <div className={styles.modalCloseIcon} onClick={() => setShowSignup(false)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L16 16M16 6L6 16" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.modalContent}>
              <SignupModalContent onBack={() => setShowSignup(false)} />
            </div>
          </div>
        </div>
      )}

      {/* User Options Modal */}
      <UserOptionsModal open={showOptions} onClose={() => setShowOptions(false)} onOption={handleOption} />

      {/* Post Ad Modal */}
      <PostAdModal open={showPostAd} onClose={() => setShowPostAd(false)} onSubmit={handlePostAd} />

      {/* Footer uni */}
      <Footer />
    </div>
  );
};

// Helper wrappers to inject the onSignup prop into Login
function LoginModalContent({ onSignup }) {
  return <Login onSignup={onSignup} />;
}

function SignupModalContent({ onBack }) {
  return <Signup onBack={onBack} />;
}

export default HomeComp;