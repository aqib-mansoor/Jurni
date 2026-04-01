import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface InAppFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  experienceTitle?: string;
}

export const InAppFeedback = ({ isOpen, onClose, experienceTitle }: InAppFeedbackProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Experience Feedback">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 py-4"
          >
            <div className="text-center space-y-2">
              <h4 className="text-lg font-serif text-midnight">How was your journey?</h4>
              <p className="text-xs text-midnight opacity-50 uppercase tracking-widest">
                {experienceTitle || "Tell us about your recent experience"}
              </p>
            </div>

            <div className="flex justify-center gap-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "fill-champagne text-champagne"
                        : "text-midnight opacity-10"
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-midnight opacity-50 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Additional Comments
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts with us..."
                className="w-full h-32 p-4 bg-pearl border border-midnight border-opacity-10 rounded-sm text-sm text-midnight focus:outline-none focus:border-champagne transition-all resize-none"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full h-12 flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Feedback
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center space-y-4"
          >
            <div className="p-6 rounded-full bg-green-500 bg-opacity-10 mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h4 className="text-2xl font-serif text-midnight">Thank You!</h4>
            <p className="text-sm text-midnight opacity-60 max-w-xs">
              Your feedback helps us maintain the JURNİ standard of excellence.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
