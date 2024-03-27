import React from 'react';
import '../style//footer.css';
import '../style//general.css';
import '../style//queries.css';
import logo from '../img/logo.png';

const Footer = () => {
  return (
    <div className="wrapper">
      <footer className="footer">
      <div className="grid grid--footer" style={{flexDirection: 'row' }}>
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <img className="logo" alt="Journals Hub logo" src={logo} />
          </a>

        

          <p className="copyright">
            Made with ❤️ by AKASH DAVE & GOVIND DANGI
          </p>
        </div>

        <div className="address-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">
              Tanjore Main Road, NH67, near BHEL, Tiruchirappalli, Tamil Nadu 620015
            </p>
            <p>
              <a className="footer-link" href="tel:415-201-6370">0431-250-4135</a
              ><br />
              <a className="footer-link" href="mailto:hello@omnifood.com"
                >xyz@gmail.com</a
              >
            </p>
          </address>
        </div>

      </div>
    </footer>
    </div>
  );
}

export default Footer;

