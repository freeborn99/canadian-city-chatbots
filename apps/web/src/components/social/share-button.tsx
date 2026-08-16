'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  className?: string;
  iconClassName?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  text = '',
  className = '',
  iconClassName = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className={`flex items-center justify-center p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-lg ${className}`}
      title="Share"
    >
      {copied ? (
        <Check className={`w-4 h-4 text-emerald-400 ${iconClassName}`} />
      ) : (
        <Share2 className={`w-4 h-4 text-cyan-400 ${iconClassName}`} />
      )}
    </motion.button>
  );
};
