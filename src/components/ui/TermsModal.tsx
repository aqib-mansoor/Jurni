import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Terms & Conditions">
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex items-center gap-4 p-4 bg-pearl rounded-sm border border-midnight border-opacity-5">
        <ShieldCheck className="h-8 w-8 text-champagne" />
        <div>
          <h4 className="text-sm font-serif text-midnight">Secure Experience</h4>
          <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider">Your safety is our priority</p>
        </div>
      </div>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">1. Booking Agreement</h5>
        <p className="text-xs text-midnight opacity-70 leading-relaxed">
          By completing this booking, you enter into a direct contractual relationship with the experience provider. JURNİ acts as an intermediary to facilitate the transaction and ensure a luxury standard of service.
        </p>
      </section>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">2. Payment & Fees</h5>
        <p className="text-xs text-midnight opacity-70 leading-relaxed">
          All payments are processed securely. The total price includes the base rate, cleaning fees, and JURNİ service fees. Taxes are calculated based on the destination's local regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">3. Guest Conduct</h5>
        <p className="text-xs text-midnight opacity-70 leading-relaxed">
          Guests are expected to respect the property and follow the specific house rules provided by the host. Any damage to the property may result in additional charges.
        </p>
      </section>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">4. Privacy Policy</h5>
        <p className="text-xs text-midnight opacity-70 leading-relaxed">
          Your personal data is handled in accordance with our Privacy Policy. We only share necessary information with the provider to facilitate your booking.
        </p>
      </section>

      <div className="flex items-start gap-3 p-4 bg-champagne bg-opacity-5 rounded-sm border border-champagne border-opacity-10">
        <CheckCircle2 className="h-5 w-5 text-champagne mt-0.5" />
        <p className="text-[10px] text-midnight opacity-70 leading-relaxed font-medium">
          By proceeding with the booking, you acknowledge that you have read, understood, and agreed to these terms and conditions.
        </p>
      </div>
    </div>
    <div className="pt-6">
      <Button variant="primary" onClick={onClose} className="w-full">
        I Understand & Agree
      </Button>
    </div>
  </Modal>
);
