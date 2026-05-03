const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-[#92400e]/18 bg-[#1a1512]/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]/30"></span>
            </div>
            <span className="text-sm text-[#5a554d]">Transformer Decoder And Object Detection 2026</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[#4a4540]">
            <span>Deep Learning Project</span>
            <span className="w-1 h-1 rounded-full bg-[#4a4540]"></span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#3a3530]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
