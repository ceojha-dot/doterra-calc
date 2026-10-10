import React from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface VideoPlayerModalProps {
  isOpen: boolean;
  title: string;
  youtubeId?: string;
  fallbackUrl: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  title,
  youtubeId,
  fallbackUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundManager.playClick('func');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/20 w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-600 flex items-center justify-center shadow-md shrink-0">
            <Play size={15} className="fill-white text-white ml-0.5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white block truncate max-w-[220px] sm:max-w-md">
              {title}
            </h3>
            <span className="text-[10px] sm:text-xs text-purple-200">
              도테라 공식 비즈니스 추천 영상
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="calc-btn-base p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-all hover:scale-105"
          title="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* Video Screen Area - Fills the screen immersively */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-auto py-2 sm:py-4">
        <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl flex items-center justify-center">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Play size={36} className="text-rose-400 mb-2" />
              <p className="text-xs sm:text-sm text-purple-200">
                유튜브 앱 또는 브라우저에서 전체 영상을 시청하세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-2 sm:pt-3 border-t border-white/20 w-full max-w-5xl mx-auto flex items-center justify-between">
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm text-purple-300 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
        >
          <span>YouTube 앱에서 전체화면으로 열기</span>
          <ExternalLink size={13} />
        </a>

        <button
          type="button"
          onClick={handleClose}
          className="calc-btn-base px-4 py-2 rounded-xl bg-[#7f42c2] hover:bg-[#6e35ad] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-lg transition-colors"
        >
          계산기로 복귀
        </button>
      </div>
    </div>
  );
};
