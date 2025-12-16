import QuickLinks from "./QuickLinks";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "/elogo.png";
import Container from "../Container";
const Footer = () => {
  return (
    <div className="bg-base-200">
      <Container>
      <footer className="px-4 divide-y  text-gray-800 relative bottom-0 left-0">
      <footer className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4 text-base-content p-16">
        <aside>
          <img src={logo} alt="eTutor BD logo" className="w-[100px]" />
          <h2 className="text-primary font-bold text-2xl">eTutor BD</h2>
          <p>
            eTutorBD is a platform where parents, students and tutors can easily
            connect with each other. We provide qualified Home/Online tutors to
            help your child with studies and helping them perform better in
            exams.
          </p>
        </aside>
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title">Quick Links</h6>

          <QuickLinks></QuickLinks>
        </nav>
        <nav>
          <div>
            <h6 className="footer-title">Contact</h6>
            <p>📍 Dhaka, Bangladesh</p>
            <p>📧 support@etutorbd.com</p>
            <p>📞 +880 1XXX-XXXXXX</p>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <a
              href="https://facebook.com/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white  shadow-md hover:bg-primary hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://instagram.com/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white  shadow-md hover:bg-primary hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://linkedin.com/company/etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white  shadow-md hover:bg-primary hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://youtube.com/@etutorbd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white  shadow-md hover:bg-primary hover:text-white transition"
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </nav>
      </footer>
      
    </footer>
    <div className="py-6 text-sm text-center text-gray-400">
        © 2025-2026 eTutor BD. All rights reserved.
      </div>
    </Container>
    </div>
  );
};

export default Footer;
