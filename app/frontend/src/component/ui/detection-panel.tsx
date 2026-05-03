import { useRef } from "react";

interface DetectionPanelProps {
  detectionResult: any;
  isLoading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DetectionPanel = ({ detectionResult, isLoading, onImageUpload }: DetectionPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(event);
  };

  return (
    <div className="bg-[#161210]/80 backdrop-blur-xl rounded-2xl border border-[#92400e]/20 overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#92400e]/15">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#92400e]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#f5f0eb]">Blood Cancer Detection</h2>
            <p className="text-xs text-[#a39e96]">Upload Your Blood Cancer Image</p>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-5">
        <div 
          className="w-full border-2 border-dashed border-[#92400e]/25 rounded-xl bg-[#0f0d0a]/60 flex flex-col items-center justify-center gap-3 hover:border-[#d97706]/50 hover:bg-[#92400e]/5 transition-all duration-300 cursor-pointer group"
          onClick={handleUploadClick}
        >
          {!detectionResult?.image ? (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#92400e]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[#c4bfb8] font-medium">Click to Upload Image</p>
              <p className="text-xs text-[#8a8580]">Support: JPG, PNG, WEBP</p>
            </div>
          ) : (
            <img 
              src={`data:image/jpeg;base64,${detectionResult.image}`} 
              alt="Hasil Deteksi" 
              className="w-full h-auto rounded-xl"
            />
          )}
        </div>
        
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {isLoading && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[#d97706] bg-[#92400e]/15 px-4 py-2 rounded-lg">
              <div className="w-4 h-4 border-2 border-[#d97706] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Processing Detection...</span>
            </div>
          </div>
        )}

        {detectionResult?.classes && (
          <div className="bg-[#0f0d0a]/80 rounded-xl p-4 border border-[#92400e]/15">
            <h3 className="text-[#f5f0eb] font-semibold mb-3 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Classification Report
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
              {Object.entries(
                detectionResult.classes.reduce((acc: any, cls: string) => {
                  acc[cls] = (acc[cls] || 0) + 1;
                  return acc;
                }, {})
              ).map(([label, count]: [string, any], idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs py-2 px-3 rounded-lg bg-[#161210]/60">
                  <span className="text-[#c4bfb8] capitalize">{label.replace('_', ' ')}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#f5f0eb] font-mono">{count} Cell</span>
                    <div className="w-20 h-1.5 bg-[#161210] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#d97706] to-[#b45309] rounded-full transition-all duration-500"
                        style={{ width: `${(count / detectionResult.classes.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center text-xs pt-2 mt-2 border-t border-[#92400e]/15 px-3">
                <span className="text-[#d97706] font-semibold">Total</span>
                <span className="text-[#f5f0eb] font-mono font-semibold">{detectionResult.classes.length} Cell</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
