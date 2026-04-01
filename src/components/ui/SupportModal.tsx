import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { MessageSquare, Phone, Mail, Clock } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="24/7 Concierge Support" className="max-w-xl">
      <div className="space-y-6 sm:space-y-10 p-6 sm:p-10">
        <p className="text-base sm:text-lg text-midnight/60 leading-relaxed font-light italic">
          Our dedicated luxury travel experts are available around the clock to assist you with any requests, modifications, or emergencies.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-8 bg-midnight rounded-none border border-midnight/10 hover:border-champagne/30 transition-all duration-500 shadow-xl">
            <div className="flex items-center gap-4 sm:gap-6 flex-1">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-champagne/10 text-champagne flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-500 shrink-0">
                <MessageSquare size={24} strokeWidth={1.5} className="sm:w-[32px] sm:h-[32px]" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-pearl text-xl sm:text-2xl mb-0.5 sm:mb-1">Live Chat</h4>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-pearl/40 font-bold">Average response: 2 mins</p>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto bg-champagne text-midnight hover:bg-pearl rounded-none px-8 py-4 uppercase tracking-widest text-[10px] sm:text-xs font-bold">Chat Now</Button>
          </div>

          <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-8 bg-midnight rounded-none border border-midnight/10 hover:border-champagne/30 transition-all duration-500 shadow-xl">
            <div className="flex items-center gap-4 sm:gap-6 flex-1">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-champagne/10 text-champagne flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-500 shrink-0">
                <Phone size={24} strokeWidth={1.5} className="sm:w-[32px] sm:h-[32px]" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-pearl text-xl sm:text-2xl mb-0.5 sm:mb-1">Priority Phone</h4>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-pearl/40 font-bold">+1 (800) JURNI-LUX</p>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto bg-champagne text-midnight hover:bg-pearl rounded-none px-8 py-4 uppercase tracking-widest text-[10px] sm:text-xs font-bold">Call</Button>
          </div>

          <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-8 bg-midnight rounded-none border border-midnight/10 hover:border-champagne/30 transition-all duration-500 shadow-xl">
            <div className="flex items-center gap-4 sm:gap-6 flex-1">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-champagne/10 text-champagne flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-500 shrink-0">
                <Mail size={24} strokeWidth={1.5} className="sm:w-[32px] sm:h-[32px]" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-pearl text-xl sm:text-2xl mb-0.5 sm:mb-1">Email Support</h4>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-pearl/40 font-bold">concierge@jurni.travel</p>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto bg-champagne text-midnight hover:bg-pearl rounded-none px-8 py-4 uppercase tracking-widest text-[10px] sm:text-xs font-bold">Email</Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs text-midnight/40 uppercase font-bold tracking-[0.4em] pt-6 sm:pt-10 border-t border-midnight/5">
          <Clock size={16} className="text-champagne sm:w-[20px] sm:h-[20px]" />
          Always at your service
        </div>
      </div>
    </Modal>
  );
};
