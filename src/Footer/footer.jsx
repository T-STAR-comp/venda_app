import styles from './styles/footer.module.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  const handleSocialClick = (platform) => {
    // TODO: Navigate to social media profiles
    console.log('Social media clicked:', platform);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        {/* Newsletter Section */}
        <div className={styles.newsletter_section}>
          <h3 className={styles.newsletter_title}>Stay Updated</h3>
          <p className={styles.newsletter_description}>
            Get the latest deals and updates from vendors across Malawi delivered to your inbox.
          </p>
          <form className={styles.newsletter_form} onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className={styles.newsletter_input}
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className={styles.newsletter_button}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className={styles.footer_main}>
          {/* Brand Section */}
          <div className={styles.footer_brand}>
            <div className={styles.footer_logo}>Venda</div>
            <p className={styles.footer_description}>
              The leading marketplace in Malawi, connecting buyers and sellers across the country. 
              Find everything you need from trusted Vendas in your area.
            </p>
            <div className={styles.social_links}>
              <div 
                className={styles.social_link}
                onClick={() => handleSocialClick('facebook')}
              >
                📘
              </div>
              <div 
                className={styles.social_link}
                onClick={() => handleSocialClick('twitter')}
              >
                🐦
              </div>
              <div 
                className={styles.social_link}
                onClick={() => handleSocialClick('instagram')}
              >
                📷
              </div>
              <div 
                className={styles.social_link}
                onClick={() => handleSocialClick('linkedin')}
              >
                💼
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footer_section}>
            <h4 className={styles.footer_section_title}>Quick Links</h4>
            <ul className={styles.footer_links}>
              <li>
                <a href="/" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🏠</span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>ℹ️</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-it-works" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>⚙️</span>
                  How It Works
                </a>
              </li>
              <li>
                <a href="/success-stories" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>📈</span>
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/blog" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>📝</span>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.footer_section}>
            <h4 className={styles.footer_section_title}>Categories</h4>
            <ul className={styles.footer_links}>
              <li>
                <a href="/category/electronics" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>📱</span>
                  Electronics
                </a>
              </li>
              <li>
                <a href="/category/vehicles" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🚗</span>
                  Vehicles
                </a>
              </li>
              <li>
                <a href="/category/property" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🏠</span>
                  Property
                </a>
              </li>
              <li>
                <a href="/category/services" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🔧</span>
                  Services
                </a>
              </li>
              <li>
                <a href="/category/fashion" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>👕</span>
                  Fashion
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footer_section}>
            <h4 className={styles.footer_section_title}>Support</h4>
            <ul className={styles.footer_links}>
              <li>
                <a href="/help" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>❓</span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>📞</span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>❔</span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="/safety" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🛡️</span>
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="/report" className={styles.footer_link}>
                  <span className={styles.footer_link_icon}>🚨</span>
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footer_section}>
            <h4 className={styles.footer_section_title}>Contact Info</h4>
            <div className={styles.contact_info}>
              <div className={styles.contact_item}>
                <div className={styles.contact_icon}>📍</div>
                <span>Lilongwe, Malawi</span>
              </div>
              <div className={styles.contact_item}>
                <div className={styles.contact_icon}>📞</div>
                <span>+265 1 234 567</span>
              </div>
              <div className={styles.contact_item}>
                <div className={styles.contact_icon}>📧</div>
                <span>info@Venda.mw</span>
              </div>
              <div className={styles.contact_item}>
                <div className={styles.contact_icon}>🕒</div>
                <span>Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footer_bottom}>
          <div className={styles.footer_bottom_left}>
            <a href="/privacy" className={styles.footer_bottom_link}>
              Privacy Policy
            </a>
            <a href="/terms" className={styles.footer_bottom_link}>
              Terms of Service
            </a>
            <a href="/cookies" className={styles.footer_bottom_link}>
              Cookie Policy
            </a>
            <a href="/accessibility" className={styles.footer_bottom_link}>
              Accessibility
            </a>
          </div>
          <div className={styles.footer_bottom_right}>
            <span>© 2025 Venda Malawi. All rights reserved.</span>
            <span>🇲🇼</span>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;