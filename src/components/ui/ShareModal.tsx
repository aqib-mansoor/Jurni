import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Share2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const ShareModal = ({ isOpen, onClose, url, title }: ShareModalProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500', href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600', href: '#' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Experience">
      <div className="space-y-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`p-3 rounded-full ${option.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <option.icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-midnight opacity-60">
                {option.name}
              </span>
            </a>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-midnight opacity-50">
            Copy Link
          </label>
          <div className="flex gap-2 p-2 bg-pearl border border-midnight border-opacity-10 rounded-sm">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent text-xs text-midnight opacity-70 outline-none px-2"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-champagne bg-opacity-5 rounded-sm border border-champagne border-opacity-10">
          <div className="flex items-center gap-3">
            <Share2 className="h-5 w-5 text-champagne" />
            <p className="text-xs text-midnight opacity-70 leading-relaxed italic">
              "Share the extraordinary. Let others discover the world through your eyes."
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
