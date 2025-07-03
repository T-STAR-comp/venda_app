import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/home.module.css';
import Footer from '../Footer/footer';
import Login from '../Auth/Login';
import Signup from '../Auth/signup';
import UserOptionsModal from './components/userOptions';
import PostAdModal from './components/postAd';
import Loader from '../components/loader';
import { socketGetAds } from './functions/socketGetAds';
import UserAds from './components/UserAds';
import { filterAdsBySearch } from './functions/filterAdsBySearch';
import ChangePassword from './components/ChangePassword';

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

// Map backend ad to UI product format
function mapBackendAdToProduct(ad) {
  let imageUrl = '';
  if (ad.image && ad.image.startsWith('/9j/')) {
    imageUrl = `data:image/jpeg;base64,${ad.image}`;
  } else if (ad.img_path) {
    imageUrl = `/api/${ad.img_path.replace(/\\/g, '/')}`;
  }
  return {
    id: ad.id,
    title: ad.product_name,
    price: `MWK ${Number(ad.price).toLocaleString()}`,
    location: ad.location,
    time: ad.created_at ? new Date(ad.created_at).toLocaleString() : '',
    image: imageUrl,
    featured: ad.featured === 1 || ad.featured === '1' || ad.featured === true,
    category: ad.category,
    listerName: ad.username,
    whatsapp: ad.phone || '',
    description: ad.description,
    email: ad.email,
  };
}

function ViewProducts({ category, onProductClick, products }) {
  let filtered;
  if (!category) {
    // Only show featured ads by default
    filtered = products.filter(p => p.featured);
  } else {
    filtered = products.filter(p => p.category === category);
  }
  return (
    <section className={styles.productGridSection}>
      {filtered.length === 0 ? (
        <div style={{textAlign: 'center', color: '#888', padding: '2rem 0', fontSize: '1.1rem'}}>
          No products found in this category.
        </div>
      ) : (
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
      )}
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
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Loading...');
  const [ads, setAds] = useState([]);
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [showUserAds, setShowUserAds] = useState(false);
  const [userAds, setuserAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null); // null = no search, [] = no results
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const ws = socketGetAds((data) => {
      if (data && Array.isArray(data.ads)) {

        const mapped = data.ads.map(mapBackendAdToProduct);
        setAds(mapped);
        setuserAds(data.ads);
        console.log('Mapped products:', mapped);
      }
    });
    return () => ws.close();
  }, []);

  useEffect(() => {
    // Show welcome message if user exists
    const user = sessionStorage.getItem('user');
    if (user) {
      setWelcomeMsg(`Hi ${user} welcome to Venda`);
      const timer = setTimeout(() => setWelcomeMsg(''), 60000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }
    const results = filterAdsBySearch(ads, searchTerm.trim());
    setSearchResults(results);
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
      setShowLoader(true);
      sessionStorage.removeItem('Login_token');
      setShowLoader(false);
      window.location.href = '/';
    } else if (key === 'changePassword') {
      setShowChangePassword(true);
    } else if (key === 'postAd') {
      setShowPostAd(true);
    } else if (key === 'viewAds') {
      setShowUserAds(true);
    }
  };

  const handlePostAd = (ad) => {
    alert('Ad posted! (Demo)');
    setShowPostAd(false);
  };

  const HandleOutOdsessionPosts = () => {
    setShowLoader(true);
    setLoaderMessage("You Must Login First");
    setTimeout(() => {
      setShowLoader(false);
      setShowLogin(true);
    }, 2000);
  };

  const handleLogout = () => {
    setShowLoader(true);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('Login_token');
    sessionStorage.removeItem('user_email');
    setShowLoader(false);
    window.location.href = '/';
  };

  return (
    <div className={styles.main_div}>
      {welcomeMsg && (
        <div style={{
          background: '#D7263D',
          color: '#fff',
          padding: '1rem',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '0.5px',
          zIndex: 1000,
        }}>
          {welcomeMsg}
        </div>
      )}
      {showLoader && <Loader message={loaderMessage} onClose={() => setShowLoader(false)} />}
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
            {sessionStorage.getItem('Login_token') ? (
              <>
                <button className={styles.postAdBtn} onClick={() => setShowOptions(true)}>Options</button>
                <button className={styles.postAdBtn} onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className={styles.postAdBtn} onClick={() => setShowLogin(true)}>Log in</button>
                <button className={styles.postAdBtn} onClick={() => HandleOutOdsessionPosts()}>Options</button>
                <button className={styles.postAdBtn} onClick={() => HandleOutOdsessionPosts()}>Post ad</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input className={styles.searchInput} placeholder="What are you looking for?" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
      <ViewProducts category={selectedCategory} onProductClick={handleProductClick} products={searchResults !== null ? searchResults : ads} />

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

      {/* User Ads Modal */}
      <UserAds open={showUserAds} onClose={() => setShowUserAds(false)} ads={userAds} userEmail={sessionStorage.getItem('user_email')} />

      {/* Change Password Modal */}
      <ChangePassword open={showChangePassword} onClose={() => setShowChangePassword(false)} />

      {/* Footer  */}
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