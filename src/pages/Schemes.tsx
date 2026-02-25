import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Users, GraduationCap, Briefcase, Heart, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Schemes() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Users },
    { name: 'Kisan (Farmers)', icon: Leaf },
    { name: 'Students', icon: GraduationCap },
    { name: 'Women', icon: Heart },
    { name: 'Business', icon: Briefcase },
    { name: 'Senior Citizens', icon: Users },
  ];

  const schemes = [
    {
      id: 1,
      title: 'PM Kisan Samman Nidhi',
      category: 'Kisan (Farmers)',
      shortDesc: 'Kisanon ko har saal ₹6,000 ki aarthik madad.',
      whoCanApply: 'Chhote aur seemant kisan jinke paas kheti ki zameen hai.',
      howToApply: 'PM Kisan portal par online apply karein ya CSC center jayein. Aadhaar aur bank account zaroori hai.',
      link: 'https://pmkisan.gov.in/',
      benefits: [
        'Har saal ₹6,000',
        'Teen kishton mein ₹2,000 milenge',
        'Direct bank account mein transfer'
      ]
    },
    {
      id: 2,
      title: 'Sukanya Samriddhi Yojana',
      category: 'Women',
      shortDesc: 'Betiyon ki padhai aur shadi ke liye bachat yojana.',
      whoCanApply: 'Mata-pita apni 10 saal se kam umar ki beti ke naam par account khol sakte hain.',
      howToApply: 'Kisi bhi post office ya authorized bank branch mein jaakar form bharein.',
      link: 'https://www.indiapost.gov.in/',
      benefits: [
        'High interest rate (approx 8%)',
        'Tax benefits under 80C',
        'Minimum deposit ₹250 per year'
      ]
    },
    {
      id: 3,
      title: 'Ayushman Bharat Yojana',
      category: 'All',
      shortDesc: 'Har parivar ko saalana ₹5 lakh tak ka muft ilaaj.',
      whoCanApply: 'Garib aur kamzor aay wale parivar (SECC 2011 data ke anusar).',
      howToApply: 'Apne nazdiki CSC center ya Ayushman card banwane wale hospital jayein.',
      link: 'https://pmjay.gov.in/',
      benefits: [
        '₹5 lakh tak ka free treatment',
        'Private aur sarkari dono hospitals mein',
        'Cashless aur paperless process'
      ]
    },
    {
      id: 4,
      title: 'Mudra Yojana',
      category: 'Business',
      shortDesc: 'Chhota business shuru karne ke liye ₹10 lakh tak ka loan.',
      whoCanApply: 'Koi bhi bhartiya nagrik jo apna business (non-farm) shuru karna chahta hai.',
      howToApply: 'Apne bank branch mein jayein ya Udyamimitra portal par online apply karein.',
      link: 'https://www.mudra.org.in/',
      benefits: [
        'Shishu: ₹50,000 tak',
        'Kishore: ₹50,000 se ₹5 lakh tak',
        'Tarun: ₹5 lakh se ₹10 lakh tak'
      ]
    },
    {
      id: 5,
      title: 'Atal Pension Yojana',
      category: 'Senior Citizens',
      shortDesc: '60 saal ki umar ke baad har mahine pension.',
      whoCanApply: '18 se 40 saal ka koi bhi bhartiya nagrik jiska bank account ho.',
      howToApply: 'Apne bank branch mein jaakar APY form bharein.',
      link: 'https://www.npscra.nsdl.co.in/scheme-details.php',
      benefits: [
        '₹1,000 se ₹5,000 tak ki monthly pension',
        'Sarkari guarantee',
        'Jaldi shuru karne par kam premium'
      ]
    },
    {
      id: 6,
      title: 'National Scholarship Portal',
      category: 'Students',
      shortDesc: 'Students ke liye sabhi sarkari scholarships ek jagah.',
      whoCanApply: 'School aur college ke students jo criteria meet karte hain.',
      howToApply: 'NSP portal par online registration karein aur documents upload karein.',
      link: 'https://scholarships.gov.in/',
      benefits: [
        'Pre-matric aur Post-matric scholarships',
        'Direct bank transfer',
        'Ek hi portal se sabhi schemes mein apply'
      ]
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Sarkari Yojanyein (Govt Schemes)</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Jaaniye kaun si sarkari scheme aapke liye hai aur usme kaise apply karein. Aasan bhasha mein.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Scheme ka naam ya fayda search karein..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                    isActive 
                      ? 'bg-orange-600 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schemes List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-lg">Koi scheme nahi mili. Kripya dusra keyword try karein.</p>
            </div>
          ) : (
            filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="p-6 md:p-8 cursor-pointer flex justify-between items-start gap-4"
                  onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                      {scheme.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{scheme.title}</h2>
                    <p className="text-slate-600 text-lg">{scheme.shortDesc}</p>
                  </div>
                  <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors shrink-0">
                    {expandedScheme === scheme.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedScheme === scheme.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-slate-100 bg-slate-50/50">
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                          <div>
                            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                              <Users className="h-5 w-5 text-orange-500" /> Kaun Apply Kar Sakta Hai?
                            </h3>
                            <p className="text-slate-600">{scheme.whoCanApply}</p>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                              <GraduationCap className="h-5 w-5 text-emerald-500" /> Fayde (Benefits)
                            </h3>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                              {scheme.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200">
                          <h3 className="font-bold text-slate-900 mb-2">Apply Kaise Karein?</h3>
                          <p className="text-slate-600 mb-4">{scheme.howToApply}</p>
                          <a 
                            href={scheme.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
                          >
                            Official Website Par Jayein <ChevronDown className="h-4 w-4 -rotate-90" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
