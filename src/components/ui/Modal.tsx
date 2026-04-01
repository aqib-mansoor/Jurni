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
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-midnight bg-opacity-75 backdrop-blur-sm" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0 sm:p-6 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 sm:translate-y-0 translate-y-full"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 sm:translate-y-0 translate-y-full"
          >
            <Dialog.Panel className={cn('w-full h-full sm:h-auto min-h-screen sm:min-h-0 transform overflow-hidden rounded-none sm:rounded-2xl bg-pearl text-left align-middle shadow-2xl transition-all', maxWidth, className)}>
              {title && (
                <div className="flex items-center justify-between p-6 sm:p-10 pb-0">
                  <Dialog.Title as="h3" className="text-2xl sm:text-4xl font-serif text-midnight leading-tight">{title}</Dialog.Title>
                  <button onClick={onClose} className="group p-2 -mr-2 text-midnight opacity-30 hover:opacity-100 transition-all duration-300">
                    <XMarkIcon className="h-8 w-8 transition-transform duration-500 group-hover:rotate-90" />
                  </button>
                </div>
              )}
              {!title && (
                <button onClick={onClose} className="group absolute top-8 right-8 z-50 p-3 text-midnight opacity-30 hover:opacity-100 transition-all duration-300 bg-white/40 backdrop-blur-xl rounded-full shadow-sm border border-white/20">
                  <XMarkIcon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-90" />
                </button>
              )}
              <div className="p-6 sm:p-8">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
