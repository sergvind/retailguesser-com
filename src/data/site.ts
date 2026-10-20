export const business = {
  name: 'Retail Guesser',
  legalName: 'RetailGuesser Data L.L.C.',
  url: 'https://retailguesser.com',
  address: { street: '317 E Capitol St Ste 200', city: 'Jackson, MS 39201' },
  phone: '(470) 286-4081',
  phoneHref: 'tel:+14702864081',
  emails: {
    sales: 'sales@retailguesser.com',
    general: 'welsome@retailguesser.com',
    support: 'support@retailguesser.com',
  },
  officeHours: 'Monday – Friday: 8:00 AM – 6:00 PM CST',
  weekendHours: 'Saturday – Sunday: Closed',
} as const;

export const pages = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about.html' },
  { title: 'Case Studies', href: '/case-studies.html' },
  { title: 'Contact', href: '/contact.html' },
  { title: 'Privacy Policy', href: '/privacy.html' },
  { title: 'Terms of Use', href: '/terms.html' },
] as const;

// Astro's file build format exposes the homepage as /index.html at build time.
// Keep public links and metadata consistent with the existing root URL.
export function pagePath(pathname: string): string {
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return path === '' || path === '/index' ? '/' : `${path}.html`;
}

export const services = [
  {
    id: 'forecasting', icon: 'trend', number: '01', short: 'Trend Forecasting',
    title: 'Consumer trend forecasting',
    description: 'See what your customers will want next. We turn purchasing patterns, seasonal shifts, and market signals into a clearer picture of future demand.',
    benefit: 'Stay a step ahead',
  },
  {
    id: 'campaigns', icon: 'channels', number: '02', short: 'Campaign Strategy',
    title: 'Omnichannel campaign strategy',
    description: 'Reach shoppers wherever they are. Build connected campaigns across digital, in-store, and direct channels, grounded in real purchase data.',
    benefit: 'Make every channel count',
  },
  {
    id: 'segmentation', icon: 'audience', number: '03', short: 'Customer Segmentation',
    title: 'Customer segmentation & targeting',
    description: 'Find the people who matter most to your business. Understand your highest-value audiences and deliver messaging that gives them a reason to act.',
    benefit: 'Connect with the right people',
  },
  {
    id: 'analytics', icon: 'analytics', number: '04', short: 'Analytics & Reporting',
    title: 'Marketing analytics & reporting',
    description: 'Know what’s working and what comes next. Get clear dashboards and reporting that connect your marketing investment to measurable outcomes.',
    benefit: 'Turn insight into action',
  },
] as const;

export const caseStudies = [
  {
    id: 'sycamore', category: 'Trend forecasting', company: 'Sycamore Home Goods',
    headline: 'A smarter forecast. A stronger holiday season.',
    challenge: 'Sycamore Home Goods had relied on the same holiday marketing playbook for five years, overlooking a shift in who was shopping with them.',
    approach: 'Our trend forecasting model identified younger buyers driving growth in underinvested home decor categories. We helped reallocate their Q4 budget toward those emerging segments with targeted digital campaigns.',
    result: 'A more focused holiday strategy translated into higher revenue, stronger returns, and less wasted ad spend.',
    metrics: [{ value: '+34%', label: 'Holiday revenue' }, { value: '2.1×', label: 'ROAS improvement' }, { value: '−22%', label: 'Ad waste reduction' }],
    icon: 'home', theme: 'sage',
  },
  {
    id: 'gulf-coast', category: 'Customer segmentation', company: 'Gulf Coast Outdoor Supply',
    headline: 'Finding the customers hiding in plain sight.',
    challenge: 'For years, Gulf Coast Outdoor Supply marketed to a broad “outdoor enthusiast” audience without a clear picture of its most valuable customers.',
    approach: 'Our analysis revealed a high-value niche: weekend fishing families who spent 3× more per visit than the average customer. We built a targeted loyalty program and email campaign around that segment.',
    result: 'A deeper understanding of their customers helped drive repeat purchases, larger orders, and stronger email returns.',
    metrics: [{ value: '+47%', label: 'Repeat purchases' }, { value: '$82', label: 'Avg. order increase' }, { value: '3.2×', label: 'Email ROI' }],
    icon: 'compass', theme: 'sand',
  },
  {
    id: 'brightpath', category: 'Campaign strategy', company: 'Brightpath Retail Group',
    headline: 'Twelve locations. One connected strategy.',
    challenge: 'Brightpath’s 12 locations ran siloed marketing, with each store managing local ads independently and no shared data or consistent messaging.',
    approach: 'We unified their campaign infrastructure, built a centralized analytics dashboard, and launched coordinated campaigns across digital, in-store, and direct mail channels.',
    result: 'A coordinated approach brought acquisition costs down, foot traffic up, and campaign launches into a single week.',
    metrics: [{ value: '−28%', label: 'Cost per acquisition' }, { value: '+19%', label: 'Foot traffic' }, { value: '1 week', label: 'Campaign launch time' }],
    icon: 'store', theme: 'lavender',
  },
  {
    id: 'magnolia', category: 'Analytics & reporting', company: 'Magnolia Market Co.',
    headline: 'From gut feeling to a clear way forward.',
    challenge: 'Magnolia Market Co. spent $15K a month on digital ads with no visibility into which channels or campaigns actually drove in-store sales.',
    approach: 'We implemented cross-channel attribution, built custom dashboards, and established weekly reporting. Within 90 days, the team could see which campaigns to scale and which to cut.',
    result: 'Clear attribution gave the team the confidence to direct its budget toward the channels that worked.',
    metrics: [{ value: '$4,200', label: 'Monthly savings' }, { value: '+41%', label: 'Marketing efficiency' }, { value: '90 days', label: 'To full visibility' }],
    icon: 'flower', theme: 'peach',
  },
] as const;

export const testimonials = [
  {
    quote: 'Retail Guesser completely transformed how we approach seasonal promotions. Their forecasting model predicted a shift in our customer demographics that we would have missed entirely.',
    name: 'Lauren Mitchell', role: 'VP of Marketing', company: 'Sycamore Home Goods', initials: 'LM',
  },
  {
    quote: 'Their customer segmentation work helped us identify a high-value segment we’d been completely ignoring. Game changer.',
    name: 'Marcus Tran', role: 'Owner', company: 'Gulf Coast Outdoor Supply', initials: 'MT',
  },
  {
    quote: 'What I appreciate most about Retail Guesser is that they don’t just hand you data — they tell you what to do with it. Their team was hands-on through the entire campaign launch.',
    name: 'Denise Caldwell', role: 'CMO', company: 'Brightpath Retail Group', initials: 'DC',
  },
] as const;
