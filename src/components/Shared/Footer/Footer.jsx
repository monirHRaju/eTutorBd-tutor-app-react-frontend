import QuickLinks from "./QuickLinks";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "/elogo.png";
import Container from "../Container";
const Footer = () => {
  return (
    <footer className="bg-secondary">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 text-base-content py-16">
        <aside className="flex flex-col items-center md:items-start gap-2">
          <img src={logo} alt="eTutor BD logo" className="w-[100px]" />
          <h2 className="font-bold text-2xl">eTutor BD</h2>
          <p className="pr-10">
            eTutorBD is a platform where parents, students and tutors can easily
            connect with each other. 
          </p>
        </aside>
        <nav className="flex flex-col items-center lg:items-start gap-2">
          <h6 className="footer-title">Quick Links</h6>

          <QuickLinks></QuickLinks>
        </nav>
        <nav>
          <div className="flex flex-col items-center md:items-start gap-2">
            <h6 className="footer-title">Contact</h6>
            <p>📍 Dhaka, Bangladesh</p>
            <p>📧 support@etutorbd.com</p>
            <p>📞 +880 1XXX-XXXXXX</p>
          </div>
          <div className="flex text-base-content items-center gap-4 mt-8">
            <a
              href="https://facebook.com/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-base-100 shadow-md hover:bg-primary hover:text-primary-content transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://instagram.com/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-base-100 shadow-md hover:bg-primary hover:text-primary-content transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://linkedin.com/company/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-base-100 shadow-md hover:bg-primary hover:text-primary-content transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://youtube.com/@etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-base-100 shadow-md hover:bg-primary hover:text-primary-content transition"
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </nav>
        </div>
        <div className="py-6 text-sm text-center text-base-content/60 border-t border-base-300">
          © 2025-2026 eTutor BD. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
