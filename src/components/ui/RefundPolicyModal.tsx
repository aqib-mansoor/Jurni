import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Info, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export const RefundPolicyModal = ({ isOpen, onClose, onConfirm, isLoading }: RefundPolicyModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Refund Policy">
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-4 p-4 bg-pearl rounded-sm border border-midnight border-opacity-5">
        <Clock className="h-8 w-8 text-champagne" />
        <div>
          <h4 className="text-sm font-serif text-midnight">Cancellation Window</h4>
          <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider">Free cancellation for 48 hours</p>
        </div>
      </div>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">1. Full Refund</h5>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
          <p className="text-xs text-midnight opacity-70 leading-relaxed">
            Cancel within 48 hours of booking and at least 14 days before check-in to receive a full refund of the base price and cleaning fee.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">2. Partial Refund</h5>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-champagne mt-0.5" />
          <p className="text-xs text-midnight opacity-70 leading-relaxed">
            Cancel at least 7 days before check-in to receive a 50% refund of the base price. Service fees are non-refundable after 48 hours.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-widest text-midnight">3. No Refund</h5>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5" />
          <p className="text-xs text-midnight opacity-70 leading-relaxed">
            Cancellations made within 7 days of check-in are non-refundable.
          </p>
        </div>
      </section>

      <div className="flex items-start gap-3 p-4 bg-pearl rounded-sm border border-midnight border-opacity-5">
        <Info className="h-5 w-5 text-midnight opacity-40 mt-0.5" />
        <p className="text-[10px] text-midnight opacity-70 leading-relaxed font-medium">
          All refunds are processed within 5-10 business days to the original payment method.
        </p>
      </div>

      {onConfirm && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
            Keep Booking
          </Button>
          <Button variant="primary" onClick={onConfirm} className="flex-1" isLoading={isLoading}>
            Confirm Cancellation
          </Button>
        </div>
      )}
    </div>
  </Modal>
);
