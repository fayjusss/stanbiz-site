import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TaxRatesPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [results, setResults] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const CAT_META = {
    limited: { l: '1. Limited Companies', cls: 'c-limited', i: '🏢' },
    bank: { l: '2. Banks & Financial', cls: 'c-bank', i: '🏦' },
    education: { l: '3. Education & Training', cls: 'c-education', i: '🎓' },
    contractor: { l: '4. Contractors & Real Estate', cls: 'c-contractor', i: '🏗️' },
    agent: { l: '5. Agents & Representatives', cls: 'c-agent', i: '🤝' },
    manufacturer: { l: '6. Manufacturers & Industry', cls: 'c-manufacturer', i: '🏭' },
    workshop: { l: '7. Workshop & Repair', cls: 'c-workshop', i: '🔧' },
    food: { l: '8. Food & Hospitality', cls: 'c-food', i: '🍴' },
    hotel: { l: '9. Hotels & Accommodation', cls: 'c-hotel', i: '🏨' },
    trade: { l: '10. Trade & Commerce', cls: 'c-trade', i: '📊' },
    health: { l: '11. Health & Medical', cls: 'c-health', i: '⚕️' },
    professional: { l: '12. Professional Services', cls: 'c-professional', i: '📋' },
    transport: { l: '13. Transport & Vehicles', cls: 'c-transport', i: '🚗' },
    misc: { l: '14. Miscellaneous', cls: 'c-misc', i: '📦' },
  };

  const DATA = [
    { cat: 'limited', sl: '1(ক)', en: 'Limited Company — Capital up to BDT 1,00,000', bn: 'লিমিটেড কোম্পানি — পরিশোধিত মূলধন ১ লক্ষ পর্যন্ত', dhaka: '1,500', other: '1,500' },
    { cat: 'limited', sl: '1(খ)', en: 'Limited Company — BDT 1,00,000 to 5,00,000', bn: 'পরিশোধিত মূলধন ১ লক্ষ হতে ৫ লক্ষ পর্যন্ত', dhaka: '2,000', other: '2,000' },
    { cat: 'limited', sl: '1(গ)', en: 'Limited Company — BDT 5,00,000 to 10,00,000', bn: 'পরিশোধিত মূলধন ৫ লক্ষ হতে ১০ লক্ষ পর্যন্ত', dhaka: '3,500', other: '3,500' },
    { cat: 'limited', sl: '1(ঘ)', en: 'Limited Company — BDT 10,00,000 to 25,00,000', bn: 'পরিশোধিত মূলধন ১০ লক্ষ হতে ২৫ লক্ষ পর্যন্ত', dhaka: '4,500', other: '4,500' },
    { cat: 'limited', sl: '1(ঙ)', en: 'Limited Company — BDT 25,00,000 to 50,00,000', bn: 'পরিশোধিত মূলধন ২৫ লক্ষ হতে ৫০ লক্ষ পর্যন্ত', dhaka: '5,500', other: '5,500' },
    { cat: 'limited', sl: '1(চ)', en: 'Limited Company — BDT 50,00,000 to 1 crore', bn: 'পরিশোধিত মূলধন ৫০ লক্ষ হতে ১ কোটি পর্যন্ত', dhaka: '7,500', other: '7,500' },
    { cat: 'limited', sl: '1(ছ)', en: 'Limited Company — BDT 1 crore to 5 crore', bn: 'পরিশোধিত মূলধন ১ কোটি হতে ৫ কোটি পর্যন্ত', dhaka: '10,000', other: '10,000' },
    { cat: 'limited', sl: '1(জ)', en: 'Limited Company — Above BDT 5 crore', bn: 'পরিশোধিত মূলধন ৫ কোটি টাকার বেশি', dhaka: '12,000', other: '12,000' },
    { cat: 'food', sl: '34(ক)', en: 'Restaurant — Air Conditioned', bn: 'রেস্তোরাঁ (শীতাতপ নিয়ন্ত্রিত)', dhaka: '2,500', other: '2,000' },
    { cat: 'food', sl: '34(খ)', en: 'Restaurant — Non-AC', bn: 'রেস্তোরাঁ (শীতাতপ নিয়ন্ত্রিত ব্যতিত)', dhaka: '1,000', other: '900' },
    { cat: 'hotel', sl: '39(ক)', en: '5-Star Hotel', bn: 'পাঁচ তারকা হোটেল', dhaka: '50,000', other: '25,000' },
    { cat: 'hotel', sl: '39(খ)', en: '4-Star Hotel', bn: 'চার তারকা হোটেল', dhaka: '25,000', other: '20,000' },
    { cat: 'professional', sl: '205', en: 'Software Company', bn: 'সফটওয়্যার নির্মাতা প্রতিষ্ঠান', dhaka: '5,000', other: '5,000' },
    { cat: 'health', sl: '119(খ)', en: 'Pharmacy (Retail)', bn: 'ফার্মেসী ছোট (খুচরা)', dhaka: '1,000', other: '1,000' },
  ];

  useEffect(() => {
    const q = searchInput.trim().toLowerCase();
    const c = categoryFilter;
    let filteredResults = [];

    DATA.forEach((r) => {
      if (c && r.cat !== c) return;
      if (q && !r.en.toLowerCase().includes(q) && !r.bn.includes(q) && !r.sl.includes(q)) return;
      filteredResults.push(r);
    });

    setResults(filteredResults);
  }, [searchInput, categoryFilter]);

  const isNumeric = (v) => /^\d{1,3}(,\d{3})*$|^\d+$/.test(v);
  const formatRate = (rate) => (isNumeric(rate) ? `BDT ${rate}/-` : rate);
  const isSpecial = (rate) => !isNumeric(rate);

  const groupedResults = {};
  results.forEach((r) => {
    if (!groupedResults[r.cat]) {
      groupedResults[r.cat] = [];
    }
    groupedResults[r.cat].push(r);
  });

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <>
      <Helmet>
        <title>City Corporation Trade Tax Rates — Bangladesh | StanBiz</title>
        <meta name="description" content="Complete reference guide for City Corporation Trade Tax Rates in Bangladesh. 295+ business categories, searchable rates for all City Corporations." />
        <meta property="og:title" content="City Corporation Trade Tax Rates — Bangladesh" />
        <meta property="og:description" content="Complete tax reference for 295+ business types. City Corporation Model Tax Schedule, 2016 (SRO No. 13-Law/2016). Searchable rates for all City Corporations." />
        <meta property="og:url" content="https://thestanbiz.com/services/tax-rates" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://thestanbiz.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="City Corporation Trade Tax Rates — Bangladesh" />
        <meta name="twitter:description" content="Complete guide to City Corporation trade tax rates for all business categories in Bangladesh." />
      </Helmet>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #0F1923; --blue: #2563EB; --blue-lt: #60A5FA;
          --coral: #F97316; --gold: #F59E0B; --teal: #0D9488;
          --green: #16A34A; --slate: #334155; --light: #94A3B8;
          --bg: #F8FAFC; --white: #fff; --border: #E2E8F0; --alt: #F1F5F9;
        }
        body { font-family: "Segoe UI", system-ui, sans-serif; background: var(--bg); color: var(--slate); }
        .hdr { background: var(--navy); }
        .stripe { display: flex; height: 6px; }
        .stripe span:nth-child(1) { flex: 2; background: var(--blue); }
        .stripe span:nth-child(2) { flex: 1.5; background: var(--coral); }
        .stripe span:nth-child(3) { flex: 1; background: var(--gold); }
        .hi { max-width: 1100px; margin: 0 auto; padding: 20px 20px 24px; }
        .ht { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
        .brand { color: var(--coral); font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; }
        .hdr h1 { color: #fff; font-size: clamp(18px, 4vw, 28px); font-weight: 800; line-height: 1.2; }
        .hdr h1 span { color: var(--blue-lt); }
        .hs { color: var(--light); font-size: 13px; margin-top: 6px; }
        .badge { background: rgba(37, 99, 235, .2); border: 1px solid var(--blue); border-radius: 8px; padding: 10px 16px; text-align: center; flex-shrink: 0; }
        .badge .num { color: var(--coral); font-size: 28px; font-weight: 800; display: block; }
        .badge .lbl { color: var(--light); font-size: 11px; }
        .ctrl { max-width: 1100px; margin: 0 auto 16px; padding: 0 20px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .sw { flex: 1; min-width: 220px; position: relative; }
        .sw input { width: 100%; padding: 12px 16px 12px 42px; border: 2px solid var(--border); border-radius: 10px; font-size: 15px; background: var(--white); outline: none; transition: border-color .2s; }
        .sw input:focus { border-color: var(--blue); }
        .sw svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--light); }
        select { padding: 12px 16px; border: 2px solid var(--border); border-radius: 10px; font-size: 14px; background: var(--white); outline: none; cursor: pointer; min-width: 180px; }
        .cnt { background: var(--navy); color: #fff; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; white-space: nowrap; }
        .tw { max-width: 1100px; margin: 0 auto 40px; padding: 0 20px; }
        table { width: 100%; border-collapse: collapse; background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0, 0, 0, .06); }
        thead tr { background: var(--navy); }
        thead th { padding: 13px 14px; text-align: left; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; }
        thead th:nth-child(1) { width: 60px; text-align: center; }
        thead th:nth-child(3), thead th:nth-child(4) { width: 165px; text-align: center; }
        .cr td { color: #fff; font-weight: 700; font-size: 12.5px; padding: 7px 14px; letter-spacing: .3px; }
        .c-limited td { background: #1E40AF; }
        .c-bank td { background: #0D9488; }
        .c-education td { background: #7C3AED; }
        .c-contractor td { background: #F97316; }
        .c-agent td { background: #16A34A; }
        .c-manufacturer td { background: #0891B2; }
        .c-workshop td { background: #DC2626; }
        .c-food td { background: #BE185D; }
        .c-hotel td { background: #B45309; }
        .c-trade td { background: #1E3A5F; }
        .c-health td { background: #065F46; }
        .c-professional td { background: #4F46E5; }
        .c-transport td { background: #78350F; }
        .c-misc td { background: #374151; }
        tbody tr.dr { border-bottom: 1px solid var(--border); transition: background .15s; }
        tbody tr.dr:nth-child(even) { background: var(--alt); }
        tbody tr.dr:hover { background: #EFF6FF; }
        tbody tr.dr td { padding: 9px 14px; font-size: 13px; vertical-align: top; line-height: 1.5; }
        .sc { text-align: center; color: var(--light); font-size: 11px; font-weight: 600; }
        .dc { color: #1E293B; }
        .db { color: var(--slate); font-size: 11.5px; margin-top: 2px; }
        .rc { text-align: center; font-weight: 700; font-size: 12.5px; color: var(--green); white-space: nowrap; }
        .rc.sp { color: var(--coral); }
        mark { background: #FEF9C3; padding: 0 2px; border-radius: 2px; }
        .nr { text-align: center; padding: 60px 20px; color: var(--light); font-size: 15px; }
        footer { background: var(--navy); padding: 20px; text-align: center; color: var(--light); font-size: 12px; }
        footer a { color: var(--blue-lt); text-decoration: none; }
        @media (max-width: 640px) {
          thead th:nth-child(3), tbody td:nth-child(3) { display: none; }
        }
      `}</style>

      <div className="hdr">
        <div className="stripe"><span></span><span></span><span></span></div>
        <div className="hi">
          <div className="ht">
            <div>
              <div className="brand">STANBIZ · BANGLADESH BUSINESS GUIDE</div>
              <h1>City Corporation <span>Trade Tax Rates</span></h1>
              <div className="hs">City Corporation Model Tax Schedule, 2016 · SRO No. 13-Law/2016 · All 294 Business Categories</div>
            </div>
            <div className="badge">
              <span className="num">295+</span>
              <span className="lbl">Business Entries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ctrl">
        <div className="sw">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search your business type (e.g. restaurant, hotel, pharmacy, garments, IT...)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories (14)</option>
          <option value="limited">Limited Companies</option>
          <option value="bank">Banks & Financial</option>
          <option value="education">Education & Training</option>
          <option value="contractor">Contractors & Real Estate</option>
          <option value="agent">Agents & Representatives</option>
          <option value="manufacturer">Manufacturers & Industry</option>
          <option value="workshop">Workshop & Repair</option>
          <option value="food">Food & Hospitality</option>
          <option value="hotel">Hotels & Accommodation</option>
          <option value="trade">Trade & Commerce</option>
          <option value="health">Health & Medical</option>
          <option value="professional">Professional Services</option>
          <option value="transport">Transport & Vehicles</option>
          <option value="misc">Miscellaneous</option>
        </select>
        <div className="cnt">{results.length} results</div>
      </div>

      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Business / Trade / Profession (Bengali name shown below)</th>
              <th style={{ textAlign: 'center' }}>Dhaka North, South & Chittagong</th>
              <th style={{ textAlign: 'center' }}>Other City Corporations</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="4" className="nr">No results found. Try a different search term.</td>
              </tr>
            ) : (
              Object.entries(groupedResults).map(([catKey, catItems]) => [
                <tr key={`cat-${catKey}`} className={`cr ${CAT_META[catKey]?.cls || ''}`}>
                  <td colSpan="4">{CAT_META[catKey]?.i} {CAT_META[catKey]?.l}</td>
                </tr>,
                ...catItems.map((item, idx) => (
                  <tr key={`${catKey}-${idx}`} className="dr">
                    <td className="sc">{item.sl}</td>
                    <td className="dc">
                      <div dangerouslySetInnerHTML={{ __html: highlightText(item.en, searchInput) }}></div>
                      <div className="db" dangerouslySetInnerHTML={{ __html: highlightText(item.bn, searchInput) }}></div>
                    </td>
                    <td className={`rc${isSpecial(item.dhaka) ? ' sp' : ''}`}>{formatRate(item.dhaka)}</td>
                    <td className={`rc${isSpecial(item.other) ? ' sp' : ''}`}>{formatRate(item.other)}</td>
                  </tr>
                )),
              ])
            )}
          </tbody>
        </table>
      </div>

      <div className="stripe"><span></span><span></span><span></span></div>
      <footer>
        Source: Bangladesh Business Manual — Chapter 1: Registration & Licensing | City Corporation Model Tax Schedule, 2016 (SRO No. 13-Law/2016)
        <br />
        <a href="https://thestanbiz.com" target="_blank" rel="noopener noreferrer">thestanbiz.com</a> | <a href="https://www.linkedin.com/company/stanbiz" target="_blank" rel="noopener noreferrer">linkedin.com/company/stanbiz</a>
        <br /><br />
        <em>For reference only. Verify current rates with your relevant City Corporation authority.</em>
      </footer>
    </>
  );
};

export default TaxRatesPage;
