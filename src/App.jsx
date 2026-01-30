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

function App() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const openCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    window.history.pushState({ checkout: true }, '');
    window.scrollTo(0, 0);
  };

  const closeCheckout = () => {
    if (isCheckoutOpen) {
      setIsCheckoutOpen(false);
      setSelectedPlan(null);
      // Only go back if we are in the checkout state (checked via logic or assumption)
      // Better: just reset state, and if history was pushed, let popstate handle it or manual back.
      // Ideally, we just reset state here. If this was triggered by "Back" button, popstate handles it.
      // If triggered by "Close" button, we might want to history.back() if we pushed state.
      if (window.history.state && window.history.state.checkout) {
        window.history.back();
      }
    }
  };

  React.useEffect(() => {
    const handlePopState = (event) => {
      // If we go back and state is null (or not checkout), close checkout
      if (!event.state || !event.state.checkout) {
        setIsCheckoutOpen(false);
        setSelectedPlan(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handler for header navigation to ensure checkout closes
  const handleHeaderNav = () => {
    if (isCheckoutOpen) {
      // If we are in checkout, navigating via header should close it.
      // We can assume user wants to leave checkout.
      if (window.history.state && window.history.state.checkout) {
        window.history.back(); // This will trigger popstate which closes checkout
      } else {
        setIsCheckoutOpen(false);
        setSelectedPlan(null);
      }
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Header onReserveClick={openContact} onNavigate={handleHeaderNav} />
        <main>
          {isCheckoutOpen ? (
            <div className="container" style={{ padding: '40px 0' }}>
              <Checkout plan={selectedPlan} onClose={closeCheckout} />
            </div>
          ) : (
            <>
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
          )}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
