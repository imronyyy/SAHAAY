import { Phone, ShieldAlert, HeartPulse, Baby, Flame, AlertTriangle } from 'lucide-react';

export default function Emergency() {
  const helplines = [
    { name: 'Police Helpline', number: '112', icon: ShieldAlert, color: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'Ambulance', number: '108', icon: HeartPulse, color: 'bg-red-500', text: 'text-red-500' },
    { name: 'Women Helpline', number: '1091', icon: AlertTriangle, color: 'bg-pink-500', text: 'text-pink-500' },
    { name: 'Child Helpline', number: '1098', icon: Baby, color: 'bg-emerald-500', text: 'text-emerald-500' },
    { name: 'Fire Brigade', number: '101', icon: Flame, color: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'Cyber Crime', number: '1930', icon: Phone, color: 'bg-purple-500', text: 'text-purple-500' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Aapatkalin Madad (Emergency Help)</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kisi bhi emergency mein turant in numbers par call karein. Ye sabhi numbers 24x7 free hain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helplines.map((help, index) => {
            const Icon = help.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center group">
                <div className={`${help.color} text-white p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{help.name}</h2>
                <a 
                  href={`tel:${help.number}`}
                  className={`text-4xl font-black ${help.text} tracking-wider mb-6 hover:underline`}
                >
                  {help.number}
                </a>
                <a 
                  href={`tel:${help.number}`}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl transition-colors"
                >
                  Call Now
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-orange-50 border border-orange-200 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Kya aapko local help chahiye?</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Apne aas-paas ke police station, hospital ya sarkari daftar ki jaankari ke liye humara Local Help feature use karein.
          </p>
          <a href="/local-help" className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
            Local Help Khojein
          </a>
        </div>
      </div>
    </div>
  );
}
