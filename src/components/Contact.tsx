import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const savedMessages = localStorage.getItem('cservice_messages');
    const messages = savedMessages ? JSON.parse(savedMessages) : [];
    
    const newMessage = {
      id: Date.now().toString(),
      type: 'contact',
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('cservice_messages', JSON.stringify([newMessage, ...messages]));
    
    toast({
      title: "Message envoyé !",
      description: "Je vous répondrai dans les plus brefs délais.",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
            Contactez-Moi
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-secondary neon-border" style={{ boxShadow: '0 0 10px hsl(var(--secondary)/0.5)' }} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Info Column */}
          <div className="glass p-8 rounded-2xl flex flex-col justify-center space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">Informations</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-1">Téléphone</p>
                <a href="tel:+243848681325" className="text-white hover:text-primary transition-colors font-medium">
                  +243 848 681 325
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-1">Email</p>
                <a href="mailto:cianney029@gmail.com" className="text-white hover:text-primary transition-colors font-medium">
                  cianney029@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-1">Localisation</p>
                <p className="text-white font-medium">République Démocratique du Congo</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 glass p-8 rounded-2xl border-t-2 border-t-secondary/50">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Envoyer un Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nom</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all min-h-[150px] resize-y"
                  placeholder="Comment puis-je vous aider ?"
                />
              </div>
              
              <button 
                type="submit"
                className="bg-secondary text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-secondary/90 transition-colors w-full md:w-auto"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { Icon: Instagram, href: "https://instagram.com/cianney_officiel", label: "Instagram", color: "hover:text-pink-500" },
            { Icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
            { Icon: SiTiktok, href: "#", label: "TikTok", color: "hover:text-white" },
            { Icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
            { Icon: SiWhatsapp, href: "https://wa.me/243848681325", label: "WhatsApp", color: "hover:text-green-500" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass px-6 py-4 rounded-xl flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:-translate-y-2 ${social.color}`}
            >
              <social.Icon size={24} />
              <span className="font-bold uppercase text-sm tracking-wider hidden sm:block">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
