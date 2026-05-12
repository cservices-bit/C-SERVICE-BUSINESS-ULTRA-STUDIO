import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, LayoutDashboard, FileText, Video, MessageSquare, Trash2, Plus, Edit2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";

// Managers Components
function StatsOverview() {
  const visitors = localStorage.getItem('cservice_visitors') || '0';
  const messages = JSON.parse(localStorage.getItem('cservice_messages') || '[]').length;
  const portfolio = JSON.parse(localStorage.getItem('cservice_portfolio') || '[]').length;
  const news = JSON.parse(localStorage.getItem('cservice_news') || '[]').length;

  const stats = [
    { label: "Visiteurs Totaux", value: visitors },
    { label: "Formulaires Reçus", value: messages },
    { label: "Vidéos Portfolio", value: portfolio || 9 },
    { label: "Actualités", value: news || 4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-card p-6 rounded-xl border border-border">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{s.label}</p>
          <p className="text-4xl font-display font-bold text-primary">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function NewsManager() {
  const { toast } = useToast();
  const defaultNews = [
    { id: 1, title: "Nouvelle Caméra 4K", description: "Je viens d'acquérir le dernier équipement...", imageUrl: "" },
    { id: 2, title: "Formation Montage", description: "Inscriptions ouvertes...", imageUrl: "" }
  ];
  
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('cservice_news');
    return saved ? JSON.parse(saved) : defaultNews;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });

  const save = (newNews: any) => {
    setNews(newNews);
    localStorage.setItem('cservice_news', JSON.stringify(newNews));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item = { id: Date.now(), ...formData };
    save([item, ...news]);
    setFormData({ title: '', description: '', imageUrl: '' });
    setIsAdding(false);
    toast({ title: "Actualité ajoutée" });
  };

  const handleDelete = (id: number) => {
    save(news.filter((n: any) => n.id !== id));
    toast({ title: "Actualité supprimée", variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold uppercase tracking-wider">Gérer les Actualités</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
          <input required placeholder="Titre" className="w-full bg-background border border-border rounded p-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <textarea required placeholder="Description" className="w-full bg-background border border-border rounded p-2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <input placeholder="URL Image (Optionnel)" className="w-full bg-background border border-border rounded p-2" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Enregistrer</button>
            <button type="button" onClick={() => setIsAdding(false)} className="bg-muted px-4 py-2 rounded">Annuler</button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {news.map((item: any) => (
          <div key={item.id} className="bg-card p-4 rounded-xl border border-border flex justify-between items-center">
            <div>
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesManager() {
  const { toast } = useToast();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('cservice_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const handleDelete = (id: string) => {
    const filtered = messages.filter((m: any) => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('cservice_messages', JSON.stringify(filtered));
    toast({ title: "Message supprimé" });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold uppercase tracking-wider">Messages & Réservations</h3>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">Aucun message pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((m: any) => (
            <div key={m.id} className="bg-card p-6 rounded-xl border border-border relative">
              <span className={`absolute top-4 right-4 text-xs font-bold uppercase px-2 py-1 rounded ${m.type === 'reservation' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                {m.type === 'reservation' ? 'Réservation' : 'Contact'}
              </span>
              <p className="text-sm text-muted-foreground mb-2">{new Date(m.createdAt).toLocaleString('fr-FR')}</p>
              <p className="font-bold text-lg mb-1">{m.name}</p>
              <p className="text-sm mb-4">{m.email || m.phone}</p>
              {m.service && <p className="text-sm mb-2"><span className="text-primary font-bold">Service:</span> {m.service} | <span className="text-primary font-bold">Date:</span> {m.dateFormatted}</p>}
              <div className="bg-background p-4 rounded text-sm italic border border-border/50 mb-4">
                {m.message}
              </div>
              <button onClick={() => handleDelete(m.id)} className="text-red-500 flex items-center gap-2 text-sm font-bold hover:underline">
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PortfolioManager() {
  const { toast } = useToast();
  const defaultPortfolio = [
    { id: 1, title: "Clip Officiel - Artiste Local", category: "Tournage", videoId: "dQw4w9WgXcQ" }
  ];
  
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('cservice_portfolio');
    return saved ? JSON.parse(saved) : defaultPortfolio;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Tournage', videoId: '', thumbnailUrl: '' });

  const save = (items: any) => {
    setPortfolio(items);
    localStorage.setItem('cservice_portfolio', JSON.stringify(items));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item = { id: Date.now(), ...formData };
    save([item, ...portfolio]);
    setFormData({ title: '', category: 'Tournage', videoId: '', thumbnailUrl: '' });
    setIsAdding(false);
    toast({ title: "Projet ajouté" });
  };

  const handleDelete = (id: number) => {
    save(portfolio.filter((p: any) => p.id !== id));
    toast({ title: "Projet supprimé", variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold uppercase tracking-wider">Gérer le Portfolio</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-card p-6 rounded-xl border border-border space-y-4">
          <input required placeholder="Titre du projet" className="w-full bg-background border border-border rounded p-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <select className="w-full bg-background border border-border rounded p-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Tournage">Tournage</option>
            <option value="Montage">Montage</option>
            <option value="TikTok/Reels">TikTok/Reels</option>
            <option value="Live">Live</option>
            <option value="Église">Église</option>
            <option value="Motivation">Motivation</option>
          </select>
          <input required placeholder="ID Vidéo YouTube (ex: dQw4w9WgXcQ)" className="w-full bg-background border border-border rounded p-2" value={formData.videoId} onChange={e => setFormData({...formData, videoId: e.target.value})} />
          <input placeholder="URL Miniature (Optionnel)" className="w-full bg-background border border-border rounded p-2" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} />
          <div className="flex gap-2">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Enregistrer</button>
            <button type="button" onClick={() => setIsAdding(false)} className="bg-muted px-4 py-2 rounded">Annuler</button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {portfolio.map((item: any) => (
          <div key={item.id} className="bg-card p-4 rounded-xl border border-border flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-primary uppercase px-2 py-1 bg-primary/10 rounded">{item.category}</span>
              <h4 className="font-bold mt-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">ID YouTube: {item.videoId}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (sessionStorage.getItem('cservice_admin') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'cservice2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cservice_admin', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      toast({ title: "Mot de passe incorrect", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cservice_admin');
    setLocation('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card p-8 rounded-2xl border border-border shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-widest text-white">Zone Sécurisée</h1>
            <p className="text-sm text-muted-foreground mt-2">C-SERVICE BUSINESS ADMIN</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-background border rounded-lg px-4 py-3 text-center text-xl tracking-widest focus:outline-none transition-colors ${
                  error ? 'border-red-500 animate-shake' : 'border-border focus:border-primary'
                }`}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Connexion
            </button>
          </form>
          <button onClick={() => setLocation('/')} className="mt-6 text-sm text-muted-foreground hover:text-white block w-full text-center">
            Retour au site
          </button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
    { id: 'news', icon: FileText, label: 'Actualités' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <h2 className="font-display font-bold text-lg text-primary uppercase">C•Service Admin</h2>
        </div>
        <nav className="p-4 flex-grow space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-display font-bold uppercase tracking-wider">Tableau de bord</h1>
          <p className="text-muted-foreground mt-2">Gérez le contenu de votre site internet.</p>
        </header>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <StatsOverview />
            <div className="bg-card/50 border border-border p-6 rounded-xl">
              <h3 className="font-bold mb-4">Actions Rapides</h3>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setActiveTab('news')} className="px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors flex items-center gap-2">
                  <Plus size={18} /> Ajouter une actualité
                </button>
                <button onClick={() => setActiveTab('messages')} className="px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors flex items-center gap-2">
                  <MessageSquare size={18} /> Voir les messages
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NewsManager />
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MessagesManager />
          </motion.div>
        )}
      </div>
    </div>
  );
}
