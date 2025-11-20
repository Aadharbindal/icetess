import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import visitorsImage from './visitors.png';
import jecrcLogo from './jecrclogo.png';
import jmchLogo from './jmchlogo.png';
import matecLogo from './matec.png';
import locationIcon from './i.png';
import calendarIcon from './calender.png';
import heroBackground1 from './background.jpg';
import heroBackground2 from './background2.jpg';
import heroBackground3 from './background3.jpg';
import icetessLogo from './logo.png';

function App() {
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAuthorsDropdownOpen, setIsAuthorsDropdownOpen] = useState(false);
  const [showAboutJECRC, setShowAboutJECRC] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showCallForPapers, setShowCallForPapers] = useState(false);
  const [showImportantDates, setShowImportantDates] = useState(false);
  const [showSubmissionGuidelines, setShowSubmissionGuidelines] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const heroSectionRef = useRef(null);
  const [logoRowVisible, setLogoRowVisible] = useState(false);

  const backgrounds = [heroBackground1, heroBackground2, heroBackground3];
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setLogoRowVisible(true), 60); // fade/slide in shortly after mount
  }, []);

  useEffect(() => {
    const existingFavicon = document.querySelector("link[rel='icon']");
    if (existingFavicon) {
      existingFavicon.href = icetessLogo;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = icetessLogo;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex(prev => (prev + 1) % backgrounds.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const resetSections = () => {
    setShowAboutJECRC(false);
    setShowRegistration(false);
    setShowCallForPapers(false);
    setShowImportantDates(false);
    setShowSubmissionGuidelines(false);
    setShowContact(false);
  };

  const handleAboutJECRCClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowAboutJECRC(true);
    setIsHomeDropdownOpen(false); // Close dropdown after click
    setIsAuthorsDropdownOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    resetSections();
    setIsHomeDropdownOpen(false);
    setIsAuthorsDropdownOpen(false);
    window.history.replaceState(null, '', '#home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowRegistration(true);
    setIsHomeDropdownOpen(false);
    setIsAuthorsDropdownOpen(false);
  };

  const handleCallForPapersClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowCallForPapers(true);
    setIsAuthorsDropdownOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const handleImportantDatesClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowImportantDates(true);
    setIsAuthorsDropdownOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const handleSubmissionGuidelinesClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowSubmissionGuidelines(true);
    setIsAuthorsDropdownOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    resetSections();
    setShowContact(true);
    setIsAuthorsDropdownOpen(false);
    setIsHomeDropdownOpen(false);
    window.history.replaceState(null, '', '#contact-us');
  };

  useEffect(() => {
    // Animate New Content section as before
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new window.IntersectionObserver(revealOnScroll, { threshold: 0.1 });
    const targets = document.querySelectorAll(
      '.main-heading, .main-content-text, .important-dates-section, .date-item, .secretariat-section, .registration-section, .registration-table-wrapper, .registration-note-item, .bank-details, .call-for-papers-section, .cfp-table, .submission-guidelines-section, .contact-section, .contact-card'
    );
    targets.forEach(element => {
      element.classList.remove('visible'); // remove initial
      observer.observe(element);
    });
    // Animate hero-section (background image)
    if (heroSectionRef.current) {
      heroSectionRef.current.classList.remove('visible');
      // If hero-section already in viewport, add visible immediately
      if (heroSectionRef.current.getBoundingClientRect().top < window.innerHeight) {
        heroSectionRef.current.classList.add('visible');
      } else {
        const heroObserver = new window.IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            heroObserver.disconnect();
          }
        }, { threshold: 0.1 });
        heroObserver.observe(heroSectionRef.current);
        return () => {
          observer.disconnect();
          heroObserver.disconnect();
        };
      }
    }
    return () => {
      observer.disconnect();
    };
  }, [showAboutJECRC, showRegistration, showCallForPapers, showImportantDates, showSubmissionGuidelines, showContact]);

  return (
    <div className="App">
      {/* Top Bar */}
      <div className="top-bar"> 
        <a href="#" className="top-bar-link">Click Here for Information about other Conferences at JECRC</a>
      </div>

      {/* Logo & Conference Titles Section */}
      <div className={`top-logo-title-row${logoRowVisible ? ' visible' : ''}`}>
        <div className="hero-background-animated">
          <div className="animated-blob blob-1"></div>
          <div className="animated-blob blob-2"></div>
          <div className="animated-blob blob-3"></div>
        </div>
        <div className="hero-grid-overlay"></div>
        <div className="hero-content-wrapper">
          <div className="hero-inner-container">
            {/* Logo Section */}
            <div className="logo-card-wrapper">
              <div className="logo-glow-effect">
                <div className="logo-card">
                  <img src={icetessLogo} alt="ICETESS 2026 Logo" className="icetess-main-logo" />
                </div>
              </div>
            </div>
            {/* Content Section */}
            <div className="icetess-title-info">
              <div className="title-content-section">
                <span className="conference-badge">International Conference</span>
                <h1 className="conference-title">
                  Engineering Trends in <span className="highlight-text">Education Systems</span> & Sustainability
                </h1>
                <div className="title-divider"></div>
                <h2 className="conference-name">ICETESS 2026</h2>
              </div>
              {/* Date and Location */}
              <div className="info-boxes-row">
                <div className="info-box">
                  <div className="info-icon-wrapper">
                    <img src={calendarIcon} alt="Calendar" className="info-icon-img" />
                  </div>
                  <div className="info-content">
                    <div className="info-label">Date</div>
                    <div className="info-value">April 18-19, 2026</div>
                  </div>
                </div>
                <div className="info-box">
                  <div className="info-icon-wrapper">
                    <img src={locationIcon} alt="Location" className="info-icon-img" />
                  </div>
                  <div className="info-content">
                    <div className="info-label">Location</div>
                    <div className="info-value">Jaipur Engineering College and Research Centre, Jaipur (India)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand" onClick={handleHomeClick}>
            <span className="brand-abbrev">ICETESS</span>
            <span className="brand-year">2026</span>
          </div>
          <ul>
            <li className="dropdown" onMouseEnter={() => setIsHomeDropdownOpen(true)} onMouseLeave={() => setIsHomeDropdownOpen(false)}>
              <a href="#home" onClick={handleHomeClick}>Home <span className="arrow"></span></a>
              {isHomeDropdownOpen && (
                <div className={`dropdown-content${isHomeDropdownOpen ? ' show' : ''}`}>
                  <a href="#about-jecrc" onClick={handleAboutJECRCClick}>About JECRC</a>
                  <a href="#about-jaipur">About Jaipur</a>
                  <a href="#about-conference">About Conference</a>
                  <a href="#objective-of-conference">Objective of Conference</a>
                  <a href="#event-schedule">Event Schedule</a>
                  <a href="#sustainable-development-goals">Sustainable Development Goals</a>
                </div>
              )}
            </li>
            <li className="dropdown" onMouseEnter={() => setIsAuthorsDropdownOpen(true)} onMouseLeave={() => setIsAuthorsDropdownOpen(false)}>
              <a href="#authors">Authors<span className="arrow"></span></a>
              {isAuthorsDropdownOpen && (
                <div className={`dropdown-content${isAuthorsDropdownOpen ? ' show' : ''}`}>
                  <a href="#call-for-paper" onClick={handleCallForPapersClick}>Call for Paper</a>
                  <a href="#important-dates" onClick={handleImportantDatesClick}>Important Dates</a>
                  <a href="#submission-guidelines" onClick={handleSubmissionGuidelinesClick}>Submission Guidelines</a>
                  <a href="#conference-tracks">Conference Tracks</a>
                  <a href="#publication">Publication</a>
                </div>
              )}
            </li>
            <li><a href="#committees">Committees<span className="arrow"></span></a></li>
            <li><a href="#EminentGuests">Eminent Guests<span className="arrow"></span></a></li>
            <li><a href="#registration" onClick={handleRegistrationClick}>Registration</a></li>
            <li><a href="#contact-us" onClick={handleContactClick}>Contact Us</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section / Main Content */}
      <div className="hero-section" ref={heroSectionRef}>
        {backgrounds.map((bg, index) => (
          <div
            key={bg}
            className="hero-background-layer"
            style={{
              backgroundImage: `url(${bg})`,
              opacity: currentBackgroundIndex === index ? 1 : 0
            }}
          ></div>
        ))}
        <div className="hero-overlay"></div>
      </div>

      {showAboutJECRC ? (
        <div className="about-jecrc-section" id="about-jecrc">
          <h1 className="about-jecrc-heading">JAIPUR ENGINEERING COLLEGE AND RESEARCH CENTRE</h1>
          <p className="about-jecrc-text">
            JECRC, Jaipur (INDIA) is among the pioneers in Rajasthan in imparting high quality engineering education in different streams. A journey of 25 years for JECRC, having more than 5000
            students on campus under 8 UG programs, has earned laurels to their students, faculty members and for the institute in many ways. More than 15000 alumni's spread over the globe have climbed the ladder to leadership positions and provide mentorship to their juniors by way of skill development, incubation, startup, research and angel funding. Grants from government agencies for setting up centres of excellence, state of art facilities for startups, providing a platform to the students to develop their technical and managerial skills to get placement in reputed organizations. Also JECRC University was established in the year 2012 and at present more than 25000 students enrolled.
          </p>
          <p className="about-jecrc-text">
            Socially rich atmosphere at the campus enabling fourfold grooming of students that is recognized at National and International level and enabling students to work as interns with
            personalities recognized in their field of expertise. JECRC has become synonymous to placements and JECRCians have made their presence felt at every reputed company /
            government organization. To improve the quality of teaching learning, the institute on regular basis is getting the appreciations from Government and Non Government
            Organizations viz., NITTTR Chandigarh, National Board of Accreditation, Rajasthan Technical University, AICTE, ASSOCHAM, Computer Society of India, The Week, Outlook, India
            Today etc. and two programs Mechanical Engineering and Electronics & Communication Engineering are accredited by the National Board of Accreditation for providing outcome
            based education.
          </p>
          <a href="#jecrc-foundation" className="jecrc-foundation-link">JECRC Foundation</a>
        </div>
      ) : showRegistration ? (
        <div className="registration-section" id="registration">
          <h1 className="registration-heading">REGISTRATION FOR (ICE-TESS 2025)</h1>
          <div className="registration-table-wrapper">
            <table className="registration-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Fee (Indian Authors)</th>
                  <th>Fee (International Authors)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="category-title">Academician / Industry</span>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - ₹ 8000</li>
                      <li>Publication Fee as per final agreement with the publisher</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - $98</li>
                      <li>Publication Fee as per final agreement with the publisher</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="category-title">Students / Research Scholar</span>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - ₹ 7000</li>
                      <li>Publication Fee as per final agreement with the publisher</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - $82</li>
                      <li>Publication Fee as per final agreement with the publisher</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="category-title">Attendee / Co-author</span>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - ₹ 3000</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Conference Registration Fee - $35</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="registration-notes">
            <li className="registration-note-item">Publication charges will be updated as per the information received from publishers.</li>
            <li className="registration-note-item">Research Student Author - those currently pursuing Ph.D., Masters or Bachelor's degree in a research organization/university fall under this category.</li>
            <li className="registration-note-item">At least one author per submission must register for conference. If a co-author wants to attend, they must register as a participant.</li>
          </ul>
          <div className="bank-details">
            <a className="bank-details-link" href="#bank-details">→ Bank Details</a>
            <p className="bank-detail-line">Jaipur Engineering College and Research Centre</p>
            <p className="bank-detail-line">Account No.: 729901000879</p>
            <p className="bank-detail-line">IFSC: ICIC0007299</p>
            <p className="bank-detail-line">ICICI Bank Limited, Mahal Road, Jaipur</p>
          </div>
        </div>
      ) : showCallForPapers ? (
        <div className="call-for-papers-section" id="call-for-papers">
          <h1 className="cfp-heading">CALL FOR PAPERS</h1>
          <p className="cfp-main-desc">International Conference on Engineering Trends in Education Systems & Sustainability (ICETESS 2025) is the premier conference for the presentation of new advances and research results in the fields of Engineering Trends in Education Systems & Sustainability, to be held in the lovely and highly vibrant city of Jaipur in Rajasthan, India...</p>
          <p className="cfp-body-text">ICE-TESS 2025 aims to provide an opportunistic forum ... for future collaboration on emerging issues.</p>
          <p className="cfp-body-text">This conference aims to explore the recent trends in the ... providing innovative results.</p>
          <p className="cfp-body-text"><b>Original unpublished manuscripts, and not currently under review in another journal or conference, are solicited ...</b></p>
          <p className="cfp-body-text"><b>Venue:</b> Jaipur Engineering College & Research Centre, Jaipur, India</p>
          <p className="cfp-body-text"><b>Dates of Conference:</b> April 18-19,2025</p>
          <h2 className="cfp-heading">Submission Guidelines:</h2>
          <p className="cfp-body-text">It is planned to publish the peer reviewed and selected papers of conference as proceedings with Springer... For detailed instructions for author and editors of conference proceedings, kindly visit the following link <a href="https://www.springer.com/in/authors-editors/conference-proceedings/conference-proceedings-guidelines" target="_blank" rel="noopener noreferrer">Springer Conference Proceedings Guidelines</a></p>
          <p className="cfp-body-text">Select papers from the conference will be published by Springer... Abstracts/extended abstracts and short papers (less than 4 pages) are not considered for publication."</p>
          <p className="cfp-body-text">We are pleased to invite ... <a href="https://cmt3.research.microsoft.com/ICETESS2025" target="_blank" rel="noopener noreferrer">Submit here</a></p>
          <table className="cfp-table">
            <tbody>
              <tr><th>Track 1:</th><td>Trends in Education System</td></tr>
              <tr><th>Track 2:</th><td>Recent Advances in Engineering</td></tr>
              <tr><th>Track 3:</th><td>Trends in Sustainability</td></tr>
              <tr><th>Track 4:</th><td>Trends in Applied Science</td></tr>
            </tbody>
          </table>
          <p className="cfp-body-text">Sample <a href="#">Click Here!</a></p>
          <p className="cfp-body-text">Word Template Download <a href="#">Click Here!</a></p>
        </div>
      ) : showImportantDates ? (
        <div className="important-dates-section left-align-important-dates visible">
          <h2 className="important-dates-heading">IMPORTANT DATES</h2>
          <hr className="important-dates-underline" />
          <div className="dates-container">
            <div className="date-item visible">
              <p className="date-title">Last date for paper submission - :</p>
              <p className="date-value">Feb 20, 2025</p>
            </div>
            <div className="date-item visible">
              <p className="date-title">Review Results (Notification of Acceptance) - :</p>
              <p className="date-value">March 07, 2025</p>
            </div>
            <div className="date-item visible">
              <p className="date-title">Submission Deadline for Revised Papers - :</p>
              <p className="date-value">March 15, 2025</p>
            </div>
          </div>
        </div>
      ) : showSubmissionGuidelines ? (
        <div className="submission-guidelines-section" id="submission-guidelines">
          <h1 className="submission-heading">AUTHOR GUIDELINES</h1>
          <p className="submission-text">
            Prospective authors are invited to submit manuscripts reporting original unpublished research and recent developments in the topics related to the conference. It is required that the manuscript follows the standard Springer camera-ready format. Submissions must include title, abstract, keywords, author and affiliation with email address. Please double-check the paper size in your page setup to make sure you are using the A4 size paper. The paper should not contain page numbers or any special headers or footers.
          </p>
          <p className="submission-text">
            Regular papers should present novel perspectives within the general scope of the conference. The conference only accepts full manuscripts with maximum 6 pages.
          </p>
          <p className="submission-text">
            Authors should submit their papers online. We use Microsoft CMT system for submission of papers and review process. Unregistered authors should first create an account on Microsoft CMT to log on. To avoid last minutes network problems, authors are strongly encouraged to create their Microsoft CMT submission system user accounts (if you do not already have one) and register their submission well in advance of the deadline.
          </p>
          <p className="submission-text">
            Authors are invited to submit full papers for consideration with a maximum length limit of maximum 6 printed pages including all the figures, references, and appendices. Submission of paper must be original and should not have been previously published or under consideration for publication. All papers will be sent for peer review and the corresponding author will be notified of the outcome of the review process.
          </p>

          <h2 className="submission-heading secondary">PAPER SUBMISSION</h2>
          <p className="submission-text">
            Submissions of high quality papers in all areas of Engineering Trends, Education Systems & Sustainability are invited. All accepted papers will be published in Scopus indexed journal. The submissions are handled only through the Microsoft CMT at:&nbsp;
            <a href="https://cmt3.research.microsoft.com/ILIPS2025" target="_blank" rel="noopener noreferrer">https://cmt3.research.microsoft.com/ILIPS2025</a>
          </p>
        </div>
      ) : showContact ? (
        <div className="contact-section" id="contact-us">
          <div className="contact-heading-block">
            <p className="contact-eyebrow">Let’s Connect</p>
            <h1 className="contact-heading">Contact & Visit ICETESS 2026</h1>
            <p className="contact-subheading">
              Reach out to the organizing committee for any query. We’d love to help with registrations, submissions, travel plans, or partnership opportunities.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card form-card">
              <h2>Contact Form</h2>
              <form className="contact-form">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email address" required />
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
              </form>
              <div className="contact-meta">
                <p><strong>Mail us:</strong> icetess@jecrc.ac.in</p>
                <p><strong>Call us:</strong> +91-141-2771347 / 48</p>
              </div>
            </div>
            <div className="contact-card address-card">
              <h2>Address</h2>
              <p className="contact-campus">JECRC Campus</p>
              <p>Shri Ram ki Nangal, via Sitapura RIICO Tonk Road, Jaipur - 302022 (India)</p>
              <div className="contact-map">
                <iframe
                  title="JECRC Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.627172051021!2d75.81826467547582!3d26.883251976662584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db659f80c0485%3A0xa12fae593b0401bb!2sJECRC%20Foundation!5e0!3m2!1sen!2sin!4v1731289960000!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="contact-meta">
                <p><strong>Working hours:</strong> Mon–Sat, 9:00 AM – 5:00 PM IST</p>
              </div>
            </div>
          </div>
          <div className="contact-cards-row">
            <div className="contact-card compact">
              <h3>Conference Chair</h3>
              <p>Dr. Manoj Gupta</p>
              <p><a href="mailto:drmanoj.gupta@jecrc.ac.in">drmanoj.gupta@jecrc.ac.in</a></p>
            </div>
            <div className="contact-card compact">
              <h3>Publication Queries</h3>
              <p>Dr. Sakshi Sharma</p>
              <p><a href="mailto:publications.icetess@jecrc.ac.in">publications.icetess@jecrc.ac.in</a></p>
            </div>
            <div className="contact-card compact">
              <h3>Hospitality & Travel</h3>
              <p>Mr. Gaurav Jain</p>
              <p><a href="mailto:hospitality.icetess@jecrc.ac.in">hospitality.icetess@jecrc.ac.in</a></p>
            </div>
          </div>

          <div className="contact-info-row">
            <div className="info-card">
              <div className="info-icon">
                <span>📞</span>
              </div>
              <div>
                <h4>Talk To Us</h4>
                <p>Dr. M.P. Singh – 8209832552</p>
                <p>Dr. Fauzia Sidqui – 9819695582</p>
                <p>Dr. Vijeta Kumawat – 9829176557</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon green">
                <span>✉️</span>
              </div>
              <div>
                <h4>Mail Us</h4>
                <a href="mailto:icetess@jecrc.ac.in" className="info-link">icetess@jecrc.ac.in</a>
              </div>
            </div>
          </div>

          <div className="travel-section">
            <div className="travel-text-block">
              <p className="contact-eyebrow left">Travel & Visa</p>
              <h2 className="travel-heading">Visa Support & Travel Assistance</h2>
              <p>
                Participants who require a visa letter can fill out the VISA support form. The Organizing Committee will issue official letters upon verification of registration details.
              </p>
              <ul>
                <li>Complete the VISA request form with passport details.</li>
                <li>Submit the request at least 45 days before travel.</li>
                <li>For personalized help, write to hospitality.icetess@jecrc.ac.in</li>
              </ul>
              <button className="contact-form-btn secondary">Download VISA Form</button>
            </div>
            <div className="travel-card">
              <h3>Assist Desk</h3>
              <p><strong>Phone:</strong> +91-141-2771347 / 48</p>
              <p><strong>Email:</strong> traveldesk.icetess@jecrc.ac.in</p>
            </div>
          </div>

          <section className="visa-info-section">
            <p className="contact-eyebrow left">Visa Information</p>
            <h2>VISA INFORMATION</h2>
            <p>
              Please contact the Indian High Commission/Embassy nearest to your current location and complete necessary formalities to obtain an entry visa to India. If you require a formal letter of invitation from the organizers of ICETESS-2026, please contact us at <a href="mailto:icetess@jecrc.ac.in">icetess@jecrc.ac.in</a>. However, delegates of following countries can obtain VISA ON ARRIVAL facility.
            </p>
            <p className="visa-emphasis">
              e-Tourist Visa Facility is available for nationals of the following countries/territories: Albania, Andorra, Anguilla, Antigua & Barbuda, Argentina, Armenia, Aruba, Australia, Austria, Bahamas, Barbados, Belgium, Belize, Bolivia, Bosnia & Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Cambodia, Canada, Cape Verde, Cayman Island, Chile, China, China-SAR Hongkong, China-SAR Macau, Colombia, Comoros, Cook Islands, Costa Rica, Cote d'Ivoire, Croatia, Cuba, Czech Republic, Denmark, Djibouti, Dominica, Dominican Republic, East Timor, Ecuador, El Salvador, Eritrea, Estonia, Fiji, Finland, France, Gabon, Gambia, Georgia, Germany, Ghana, Greece, Grenada, Guatemala, Guinea, Guyana, Haiti, Honduras, Hungary, Iceland, Indonesia, Ireland, Israel, Jamaica, Japan, Jordan, Kenya, Kiribati, Laos, Latvia, Lesotho, Liberia, Liechtenstein, Lithuania, Luxembourg, Madagascar, Malawi, Malaysia, Malta, Marshall Islands, Mauritius, Mexico, Micronesia, Moldova, Monaco, Mongolia, Montenegro, Montserrat, Mozambique, Myanmar, Namibia, Nauru, Netherlands, New Zealand, Nicaragua, Niue Island, Norway, Oman, Palau, Palestine, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Poland, Portugal, Republic of Korea, Republic of Macedonia, Romania, Russia, Saint Christopher and Nevis, Saint Lucia, Saint Vincent & the Grenadines, Samoa, San Marino, Senegal, Serbia, Seychelles, Singapore, Slovakia, Slovenia, Solomon Islands, South Africa, Spain, Sri Lanka, Suriname, Swaziland, Sweden, Switzerland, Taiwan, Tajikistan, Tanzania, Thailand, Tonga, Trinidad & Tobago, Turks & Caicos Island, Tuvalu, UAE, Ukraine, United Kingdom, Uruguay, USA, Vanuatu, Vatican City-Holy See, Venezuela, Vietnam, Zambia and Zimbabwe.
            </p>
            <p>
              Passport holders or residents of countries: (1) Afghanistan, (2) China, (3) Iran, (4) Iraq, (5) Pakistan, (6) Sudan, (7) Foreigners of Pakistani origin, and (8) Stateless persons are required to complete their documentation in consultation with MHA and conference organizers. In case authors of accepted papers are refused the VISA, a SKYPE presentation can be organized during the conference period.
            </p>
          </section>

          <section className="hotels-section">
            <p className="contact-eyebrow left">Stay Nearby</p>
            <h2>List of the Hotels Nearby JECRC</h2>
            <div className="hotels-table-wrapper">
              <table className="hotels-table">
                <thead>
                  <tr>
                    <th>Hotel Name</th>
                    <th>From JECRC</th>
                    <th>Distance from City Palace</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Royal Orchid</td><td>7.5 KM</td><td>9.4 KM</td></tr>
                  <tr><td>The Fern</td><td>7.5 KM</td><td>9.5 KM</td></tr>
                  <tr><td>Hotel Marigold</td><td>2.7 KM</td><td>16 KM</td></tr>
                  <tr><td>Radisson Blu</td><td>7.5 KM</td><td>9.4 KM</td></tr>
                  <tr><td>Hotel Amrapali</td><td>1 KM</td><td>16 KM</td></tr>
                  <tr><td>Hotel Pink Haveli</td><td>2 KM</td><td>15 KM</td></tr>
                  <tr><td>Hotel Paradise</td><td>2 KM</td><td>15 KM</td></tr>
                  <tr><td>Fab Hotel Sag</td><td>2 KM</td><td>15 KM</td></tr>
                  <tr><td>Hotel Aksh Inn</td><td>2 KM</td><td>15 KM</td></tr>
                  <tr><td>Grande Azure A Boutique Hotel</td><td>2 KM</td><td>15 KM</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        <>
          {/* New Content Section */}
          <div className="content-section">
            <div className="buttons-container">
              <button className="content-button">Proceedings-2018 Published by Springer Nature</button>
              <button className="content-button">Proceedings-2023 Published by Springer Nature</button>
              <button className="content-button">Gallery-2018-2019 I ICE-TEAS by Springer Nature</button>
            </div>
            <h1 className="main-heading">INTERNATIONAL CONFERENCE ON ENGINEERING TRENDS IN EDUCATION SYSTEMS & SUSTAINABILITY</h1>
            <hr className="heading-underline" />
            <p className="main-content-text">
              International Conference on Engineering Trends in Education Systems & Sustainability (ICETESS 2025) to be held in Jaipur Engineering College & Research Centre (JECRC), Jaipur on April 18-19, 2025 in hybrid mode. The conference addresses innovative advancements in Engineering Trends in Education Systems & Sustainabilityissues with specific reference to the area of Education Systems & Sustainability. International Conference on Engineering Trends in Education Systems & Sustainability (ICETESS 2025) pursues toenable meaningful collaborations on recent trends in education systems, accelerate the building up of infrastructure for communication, promote the openness and sharing of MOOC and online education resources, as well as showcase innovative research and practices, inspire new ideas and trends to contribute the advancement of education globally. ICETESS 2025 aims to provide an opportunistic forum and vibrant platform for researchers and industry practitioners to exchange of state-of-the-art knowledge gained from their original research work and practical developments on specific new challenges, applications and experiences, to establish business or research relations, and to find global partners for future collaboration on emerging issues. The Engineering Trends in Education Systems & Sustainability concept of the conference will focus on current advances in the research and use of Engineering with particular focus on the role in maintaining academic level while sharing novel research and cutting-edge developments in the fields of Education Systems & Sustainability in the area of Computer Science, Artificial Intelligence, Mechanical, Electronics, Electrical, Civil and Applied Sciences. The outcome of the conference significantly contributes to the society by serving the expert community seeking to stimulate the development to improve lives throughout the world by providing innovative results.
            </p>
          </div>
          

          {/* Important Dates Section */}
          <div className="important-dates-section">
            <h2 className="important-dates-heading">IMPORTANT DATES</h2>
            <hr className="important-dates-underline" />
            <div className="dates-container">
              <div className="date-item">
                <p className="date-title">Last date for paper submission - :</p>
                <p className="date-value">Feb 20, 2025</p>
              </div>
              <div className="date-item">
                <p className="date-title">Review Results (Notification of Acceptance) - :</p>
                <p className="date-value">March 07, 2025</p>
              </div>
              <div className="date-item">
                <p className="date-title">Submission Deadline for Revised Papers - :</p>
                <p className="date-value">March 15, 2025</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Conference Secretariat Section */}
      {showAboutJECRC || showRegistration || showCallForPapers || showImportantDates || showSubmissionGuidelines || showContact ? null : (
        <div className="secretariat-section">
          <h2 className="secretariat-heading">Conference Secretariat</h2>
          <div className="secretariat-details">
            <p>ICETESS 2025,</p>
            <p>Jaipur Engineering College & Research</p>
            <p>Centre</p>
            <p>Email: icetess@jecrc.ac.in</p>
          </div>
        </div>
      )}

      {/* Useful Links Section and Footer */}
      <div className="footer-container">
        <div className="useful-links-section">
          <h2 className="useful-links-heading">USEFUL LINKS</h2>
          <div className="links-and-counter-wrapper">
            <div className="links-column">
              <ul>
                <li><a href="#home" onClick={handleHomeClick}><span className="arrow-icon"></span> Home</a></li>
                <li><a href="#registration-details"><span className="arrow-icon"></span> Registation Details</a></li>
              </ul>
            </div>
            <div className="links-column">
              <ul>
                <li><a href="#venue"><span className="arrow-icon"></span> Venue</a></li>
                <li><a href="#contact-us"><span className="arrow-icon"></span> Contact us</a></li>
              </ul>
            </div>
            <div className="links-column">
              <ul>
                <li><a href="#committee"><span className="arrow-icon"></span> Committee</a></li>
              </ul>
            </div>
            <div className="links-column">
              <ul>
                <li><a href="#tracks"><span className="arrow-icon"></span> Tracks</a></li>
              </ul>
            </div>
            <div className="visitor-counter">
              <p className="visitors-heading">Visitors</p>
              <img src={visitorsImage} alt="Visitors Counter" className="flag-counter-image" /> {/* Using imported visitorsImage */}
            </div>
          </div>
        </div>

        <footer className="main-footer">
          <p className="footer-text">Copyright © 2025 ICETESS 2025. All Rights Reserved.</p>
          <p className="footer-text">Design and Developed by: Department of IT, JECRC, Jaipur</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
