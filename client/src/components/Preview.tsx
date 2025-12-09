import { Theme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PreviewProps {
  theme: Theme;
  text: string;
  className?: string;
  isGenerating?: boolean;
  fontClassName?: string; // Nouvelle Prop pour la police
}

export function Preview({ theme, text, className, isGenerating, fontClassName }: PreviewProps) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-2xl border-4 border-white/20", className)}>
      {/* Background Image (Simulating Video) */}
      <img 
        src={theme.asset} 
        alt={theme.name} 
        className="w-full h-full object-cover"
      />
      
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Animated Elements Simulation (Assuming this CSS is defined elsewhere) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.p 
          key={theme.id + text + fontClassName} // Key pour forcer la ré-animation
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          // Applique la classe de police ici
          className={cn(
            "text-center text-3xl md:text-4xl leading-relaxed drop-shadow-lg",
            fontClassName 
          )}
          style={{ color: theme.textColor, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          {text || "Votre message ici..."}
        </motion.p>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 right-3 text-[10px] text-white/60 font-sans tracking-widest uppercase">
        Made with MerryWishes.io
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4"></div>
          <p className="font-display text-xl animate-pulse">Création de la magie...</p>
        </div>
      )}
    </div>
  );
}