import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className, maxWidth = 'max-w-md' }: ModalProps) => (
  <Transition show={isOpen} as={React.Fragment}>
    <Dialog as="div" className="relative z-[100]" onClose={onClose}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-md" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0 sm:p-6 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-full sm:translate-y-0"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-full sm:translate-y-0"
          >
            <Dialog.Panel className={cn('w-full h-full sm:h-auto min-h-screen sm:min-h-0 transform overflow-hidden rounded-none sm:rounded-[24px] bg-white text-left align-middle shadow-modal transition-all', maxWidth, className)}>
              {title && (
                <div className="flex items-center justify-between p-8 sm:p-10 pb-0">
                  <Dialog.Title as="h3" className="text-3xl sm:text-4xl font-serif text-charcoal leading-tight tracking-tight">{title}</Dialog.Title>
                  <button onClick={onClose} className="group p-2 -mr-2 text-charcoal opacity-30 hover:opacity-100 transition-all duration-300">
                    <XMarkIcon className="h-8 w-8 transition-transform duration-500 group-hover:rotate-90" />
                  </button>
                </div>
              )}
              {!title && (
                <button onClick={onClose} className="group absolute top-6 right-6 sm:top-8 sm:right-8 z-50 p-2 sm:p-3 text-charcoal opacity-30 hover:opacity-100 transition-all duration-300 bg-ivory/80 backdrop-blur-xl rounded-full shadow-sm border border-white/20">
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-500 group-hover:rotate-90" />
                </button>
              )}
              <div className="p-8 sm:p-12">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
