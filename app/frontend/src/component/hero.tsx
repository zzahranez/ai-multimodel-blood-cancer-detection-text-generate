const Hero = () => {
  return (
    <header className="relative pt-10 pb-12 px-6 text-center overflow-hidden ">
      <div className="absolute inset-0 bg-grid opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#d97706]/60 font-medium">Neural Network Powered</span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
            <span className="w-2 h-2 rounded-full bg-[#d97706] neural-dot"></span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          <span className="gradient-text">Blood Cancer</span>
          <br />
          <span className="text-[#f5f0eb]">Object Detection</span>
        </h1>
        
        <p className="text-[#c4bfb8] text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Input your blood cancer image and let our 
          <span className="text-[#d97706]"> AI </span> to diagnose result type of blood cancer cell
        </p>
        
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-linear-to-b from-transparent via-[#d97706]/15 to-transparent"></div>
    </header>
  )
}

export default Hero;
