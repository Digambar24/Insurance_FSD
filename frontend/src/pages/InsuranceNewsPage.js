import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Insurance/newsPage.css'; // create this file if needed


const newsData = {
  car: [
    {
      id: 1,
      title: 'New Car Insurance Rules 2025',
      date: '2025-05-15',
      content: 'Starting July 2025, the IRDAI has mandated that all new car insurance policies must offer engine protection and zero depreciation as standard add-ons. This move aims to reduce claim disputes and enhance policyholder benefits. Insurers are also required to disclose claim settlement ratios on every policy document.',
    },
    {
      id: 2,
      title: 'Top 5 Car Insurance Myths Debunked',
      date: '2025-04-10',
      content: 'A common misconception is that a third-party policy is sufficient. However, it only covers damage to others, not your own vehicle. Another myth is that car color affects premium, which is entirely false. Experts recommend comparing comprehensive plans online before buying.',
    },
    {
      id: 13,
      title: 'Car Insurance Claims Process Simplified',
      date: '2025-03-18',
      content: 'IRDAI has introduced new SLAs for claim settlements. Insurers must now process claims within 7 working days after submission of complete documents. Digitization has further streamlined the process, with e-inspection and instant settlement via mobile apps gaining popularity.',
    },
  ],
  bike: [
    {
      id: 3,
      title: 'Bike Insurance Guide for Beginners',
      date: '2025-03-20',
      content: 'If you’re buying your first two-wheeler, a comprehensive bike insurance plan is a must. It not only covers third-party liability but also protects your vehicle against theft, accidents, and natural disasters. Add-ons like zero depreciation and roadside assistance are recommended.',
    },
    {
      id: 7,
      title: 'Mandatory Helmet Rule Affects Bike Insurance Premiums',
      date: '2025-02-15',
      content: 'With strict helmet laws enforced nationwide, insurers are offering discounts on premiums to riders who submit proof of helmet usage. Telematics-based plans tracking rider behavior are also influencing how premiums are calculated.',
    },
  ],
  health: [
    {
      id: 4,
      title: 'Health Insurance Premiums Reduced',
      date: '2025-04-25',
      content: 'Driven by increased market competition and government incentives, leading health insurers have slashed premiums by up to 12%. Policyholders renewing in 2025 can avail these reduced rates along with enhanced OPD and telemedicine coverage.',
    },
    {
      id: 8,
      title: 'Pre-Existing Diseases Now Covered Sooner',
      date: '2025-03-22',
      content: 'IRDAI’s revised guidelines now require insurers to reduce the waiting period for pre-existing disease coverage from 4 years to 2 years. This is a major win for individuals with chronic illnesses who previously had to wait long to claim treatments.',
    },
  ],
  term: [
    {
      id: 5,
      title: 'Term Insurance Benefits You Didn’t Know',
      date: '2025-04-15',
      content: 'Modern term plans now offer features like return of premium, critical illness riders, and accidental death benefits. Some even include wellness programs and free annual checkups, making them more than just life coverage.',
    },
    {
      id: 9,
      title: 'Why Term Plans Are Cheaper at Younger Age',
      date: '2025-03-01',
      content: 'Premiums for term insurance are based on age and health. Buying a plan in your 20s can cost 60% less compared to someone in their 40s. Financial advisors recommend locking in a low premium early to save thousands over the policy term.',
    },
  ],
  investment: [
    {
      id: 6,
      title: 'Best Investment-Linked Insurance Plans 2025',
      date: '2025-05-05',
      content: 'ULIPs and endowment plans have evolved with flexible premium options, loyalty bonuses, and higher fund performance. HDFC Life, ICICI Prudential, and Max Life are leading with double-digit fund returns in equity-linked plans this year.',
    },
    {
      id: 10,
      title: 'Tax Benefits on Investment-Linked Policies',
      date: '2025-04-01',
      content: 'Under Section 80C and 10(10D), premiums paid and maturity proceeds from investment-linked policies remain tax-exempt. Experts suggest reviewing annual premiums and holding periods to maximize deductions while avoiding policy lapses.',
    },
  ],
};


const InsuranceNewsPage = () => {
  const { category } = useParams();
  const articles = newsData[category] || [];

  return (
    <div className="news-page container">
      <h2 className="news-title">
        {category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase()} Insurance News
      </h2>

      {articles.length === 0 ? (
        <p>No news articles found for this category.</p>
      ) : (
        <div className="news-grid">
          {articles.map((article) => (
            <div key={article.id} className="news-card">
              <h3>{article.title}</h3>
              <p className="news-date">{article.date}</p>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsuranceNewsPage;
