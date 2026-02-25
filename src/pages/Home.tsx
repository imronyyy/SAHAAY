import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Shield, Stethoscope, GraduationCap, Building2, CreditCard, ArrowRight, CheckCircle2, MessageCircleHeart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/solution?q=${encodeURIComponent(query)}`);
    }
  };

  const categories = [
    { name: 'Bijli Bill (Electricity)', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'Police Complaint', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Hospital / Medical', icon: Stethoscope, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'School / College', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Govt Schemes', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Online Fraud', icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Patna, Bihar',
      problem: 'Bijli ka bill 50,000 aa gaya tha. Samajh nahi aa raha tha kahan jau.',
      solution: 'SAHAAY ne step-by-step bataya ki application kaise likhni hai aur kis officer ko deni hai. Mera bill theek ho gaya!',
    },
    {
      name: 'Sunita Devi',
      location: 'Jaipur, Rajasthan',
      problem: 'Beti ke liye Sukanya Samriddhi Yojana khulwani thi par agent paise maang raha tha.',
      solution: 'Yahan se pata chala ki post office mein free mein account khulta hai. Saare documents ki list pehle hi mil gayi.',
    },
    {
      name: 'Amit Sharma',
      location: 'Delhi',
      problem: 'Online 10,000 ka fraud ho gaya tha.',
      solution: 'SAHAAY ke cyber crime section se turant 1930 par call kiya aur online complaint register ki. Paise wapas mil gaye.',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080?blur=10')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              <MessageCircleHeart className="h-4 w-4" />
              Har Samasya ka Digital Sahaara
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Aapki problem kya hai?<br/>
              <span className="text-orange-600">Hum batayenge solution.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Bina kisi agent ke, bina kisi confusion ke. Apni pareshani likhiye aur step-by-step sahi raasta janiye.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-orange-900/5 border border-orange-100 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                <div className="pl-6 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jaise: 'Bijli bill zyada aa raha hai' ya 'Aadhaar update kaise kare'"
                  className="w-full py-5 pl-4 pr-32 text-lg text-slate-900 bg-transparent border-none focus:ring-0 placeholder:text-slate-400"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Khojein
                  <ArrowRight className="h-4 w-4 hidden sm:block" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Aam Samasyayein (Common Problems)</h2>
            <p className="text-slate-600">In categories mein se chunein ya upar search karein</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => navigate(`/solution?q=${encodeURIComponent(cat.name)}`)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group text-center"
                >
                  <div className={`p-4 rounded-full ${cat.bg} ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SAHAAY */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">SAHAAY hi kyun?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Sahi aur Verified Jaankari', desc: 'YouTube ya Google ki tarah confusing nahi. Sirf official aur sahi process.' },
                  { title: 'Aasan Bhasha (Simple Language)', desc: 'Technical words nahi. Aam bolchaal ki bhasha mein step-by-step guide.' },
                  { title: 'Agent se bachein', desc: 'Jo kaam free mein ho sakta hai, uske liye agent ko paise kyun dena?' },
                  { title: 'Time aur Paisa bachayein', desc: 'Pehle se pata hoga ki kya documents chahiye aur kahan jaana hai.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/help/800/800" 
                  alt="People helping people" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" />
                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/seed/user2/100/100" alt="User" referrerPolicy="no-referrer" />
                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/seed/user3/100/100" alt="User" referrerPolicy="no-referrer" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">10,000+</div>
                </div>
                <div className="text-sm text-slate-600 font-medium">Logon ki madad ki gayi hai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Real People, Real Solutions</h2>
            <p className="text-slate-600">Dekhiye SAHAAY ne logon ki kaise madad ki</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative"
              >
                <div className="absolute top-8 right-8 text-orange-200">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14.592C16.645 13.992 16.763 13.354 16.763 12.716V3H24V12.716C24 15.688 23.109 18.423 21.5 20.654C20.081 22.624 18.11 24 15.825 24H14.017V21ZM0 21L2.393 14.592C2.628 13.992 2.746 13.354 2.746 12.716V3H10.017V12.716C10.017 15.688 9.126 18.423 7.517 20.654C6.098 22.624 4.127 24 1.842 24H0.034V21H0Z" />
                  </svg>
                </div>
                <div className="mb-6 relative z-10">
                  <p className="text-slate-600 font-medium mb-4">
                    <span className="text-red-500 font-semibold">Problem:</span> {t.problem}
                  </p>
                  <p className="text-slate-900 font-medium">
                    <span className="text-emerald-500 font-semibold">Solution:</span> {t.solution}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
