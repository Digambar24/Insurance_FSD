import React from 'react';
import InsuranceCards from '../components/InsuranceCards';
import '../styles/main.css';
import InsurancePartners from '../components/InsurancePartners/InsurancePartners';


const HomePage = () => {
  return (
    <div>
      <InsuranceCards />

      {/* Achievements Section */}
      <div id="idAchieve" className="achievements">
        <div className="achievement">
          <div className="achIcon">
            <img src="https://static.insurancedekho.com/pwa/img/v2_icon_happysmiles.svg" alt="ID Happy Smiles" />
          </div>
          <div className="achContain">80 Lacs+<span>Happy Smiles</span></div>
        </div>
        <div className="achievement">
          <div className="achIcon">
            <img src="https://static.insurancedekho.com/pwa/img/v2_icon_Grating.svg" alt="ID Rated on Google" />
          </div>
          <div className="achContain">4.8<span>Rated on Google</span></div>
        </div>
        <div className="achievement">
          <div className="achIcon">
            <img src="https://static.insurancedekho.com/pwa/img/v2_icon_claimsetteled_3.svg" alt="ID Claims Served" />
          </div>
          <div className="achContain">35k+<span>Claims Served</span></div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Benefits of InsuranceDekho</h2>
          <div className="subtitle">
            Understand your insurance policy options. Identify the best value. Enjoy peace of mind.
          </div>
          <div className="benefit-cards">
            <div className="benefit-card">
              <img src="https://static.insurancedekho.com/pwa/img/benifitimg1.svg" alt="5 Minutes Policy Issuance" />
              <div className="title">5 Minutes Policy Issuance*</div>
              <p>Say no to spending hours and days in queues doing the paperwork for your insurance policy. Get your insurance issued instantly with InsuranceDekho. The entire process from selecting the best insurance policy to getting it issued takes just 5 minutes on InsuranceDekho.</p>
            </div>
            <div className="benefit-card">
              <img src="https://static.insurancedekho.com/pwa/img/benifitimg2.svg" alt="80 Lac Happy Customers" />
              <div className="title">Over 80 Lac Happy Customers</div>
              <p>InsuranceDekho is becoming a household name in India. Till now we have been successful in providing a delightful experience to more than 50 lac customers with the help of our transparent and quick process, a dedicated support team along with the availability of numerous insurers.</p>
            </div>
            <div className="benefit-card">
              <img src="https://static.insurancedekho.com/pwa/img/benifitimg3.svg" alt="Dedicated Support Team" />
              <div className="title">Dedicated Support Team</div>
              <p>Our dedicated support team is available for your assistance all the 7 days. Feel free to reach out to us in case of any confusion - be it related to the purchase of an insurance policy or assistance during the settlement of a claim, our team of experts is at your service all days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>How InsuranceDekho Works?</h2>
        <div className="steps-container">
          <div className="step">
            <img className="step-icon" src="https://static.insurancedekho.com/pwa/img/HowIDwork_img1.svg" alt="Fill in Your Details" />
            <img className="step-arrow" src="https://static.insurancedekho.com/pwa/img/fancy-arrow.svg" alt="arrow" />
            <div className="title">Fill in Your Details</div>
            <p>Get insurance quotes from top-rated insurers instantly.</p>
          </div>
          <div className="step">
            <img className="step-icon" src="https://static.insurancedekho.com/pwa/img/HowIDwork_img2.svg" alt="Select a Plan" />
            <img className="step-arrow" src="https://static.insurancedekho.com/pwa/img/fancy-arrow.svg" alt="arrow" />
            <div className="title">Select a Plan</div>
            <p>Choose the quote that best suits your needs and budget.</p>
          </div>
          <div className="step">
            <img className="step-icon" src="https://static.insurancedekho.com/pwa/img/HowIDwork_img3.svg" alt="Make Payment and Sit Back" />
            <div className="title">Make Payment and Sit Back</div>
            <p>Pay online and receive your policy in your inbox instantly.</p>
          </div>

        </div>
      </div>
      <InsurancePartners/>

    </div>
    
  );
};

export default HomePage;
