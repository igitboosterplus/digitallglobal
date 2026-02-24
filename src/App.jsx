import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Mission from './components/Mission';
import Pricing from './components/Pricing';
import Modal from './components/Modal';
import Contact from './components/Contact';
import AgenciesSection from './components/AgenciesSection';
import ProvidersSection from './components/ProvidersSection';
import MemberArea from './components/MemberArea';
import VIPSupport from './components/VIPSupport';
import FAQ from './components/FAQ';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/Checkout';
import WhatsAppButton from './components/WhatsAppButton';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Success from './components/Success';
import Login from './components/Login';
import MemberDashboard from './components/MemberDashboard';
import { useAuth } from './context/AuthContext';
import SEO from './components/SEO';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};

// Layout Manager to hide header/footer on specific routes
const AppLayout = ({
  isContactOpen,
  closeContact,
  openContact,
  handleHeaderNav,
  isCheckoutOpen,
  selectedPlan,
  openCheckout,
  closeCheckout
}) => {
  const location = useLocation();
  const hideChrome = ['/login', '/member-area'].includes(location.pathname);

  return (
    <div className="App">
      {!hideChrome && <Header onReserveClick={openContact} onNavigate={handleHeaderNav} />}
      <main>
        <Routes>
          <Route path="/" element={
            isCheckoutOpen && selectedPlan ? (
              <div className="container" style={{ padding: '40px 0' }}>
                <SEO
                  title="Paiement Sécurisé"
                  description="Finalisez votre commande sur Digitall Global."
                  path="/checkout"
                />
                <Checkout plan={selectedPlan} onClose={closeCheckout} />
              </div>
            ) : (
              <>
                <SEO
                  title="Votre agence digitale clé en main"
                  description="Digitall Global vous offre une infrastructure complète pour vendre vos services digitaux et scaler votre agence de 0 à 10k/mois."
                  path="/"
                />
                <Hero />
                <Mission />
                <Services />
                <Pricing onOrder={openCheckout} />
                <AgenciesSection />
                <ProvidersSection />
                <MemberArea />
                <VIPSupport />
                <FAQ />
                <Testimonials />
                <Modal isOpen={isContactOpen} onClose={closeContact}>
                  <Contact />
                </Modal>
                <Footer />
              </>
            )
          } />
          <Route path="/success" element={
            <>
              <SEO title="Paiement Réussi" description="Merci pour votre commande sur Digitall Global." path="/success" />
              <Success />
            </>
          } />
          <Route path="/cancel" element={<div style={{ padding: '100px', textAlign: 'center' }}><h1>Paiement annulé</h1><button onClick={() => window.location.href = '/'}>Retour</button></div>} />
          <Route path="/login" element={
            <>
              <SEO title="Connexion" description="Accédez à votre espace membre Digitall Global." path="/login" />
              <Login />
            </>
          } />
          <Route path="/member-area" element={
            <ProtectedRoute>
              <SEO title="Espace Membre" description="Gérez votre agence et vos prestations." path="/member-area" />
              <MemberDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center' }}><h1>Page non trouvée</h1><button onClick={() => window.location.href = '/'}>Retour à l'accueil</button></div>} />
        </Routes>
      </main>
      {!hideChrome && <WhatsAppButton />}
    </div>
  );
};

function App() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const openCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    // window.history.pushState({ checkout: true }, ''); // Removed to avoid conflict with React Router
    window.scrollTo(0, 0);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedPlan(null);
  };

  const handleHeaderNav = () => {
    if (isCheckoutOpen) {
      setIsCheckoutOpen(false);
      setSelectedPlan(null);
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout
          isContactOpen={isContactOpen}
          closeContact={closeContact}
          openContact={openContact}
          handleHeaderNav={handleHeaderNav}
          isCheckoutOpen={isCheckoutOpen}
          selectedPlan={selectedPlan}
          openCheckout={openCheckout}
          closeCheckout={closeCheckout}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
