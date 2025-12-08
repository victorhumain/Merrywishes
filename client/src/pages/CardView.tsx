import { useLocation } from "wouter";
import { themes } from "@/lib/themes";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CardView() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Parse query params manually since wouter doesn't have a hook for it built-in easily
  const searchParams = new URLSearchParams(window.location.search);
  const text = searchParams.get("text") || "";
  const themeId = searchParams.get("theme") || "snow";
  
  const theme = themes.find(t => t.id === themeId) || themes[0];

  const handleDownload = () => {
    // Simulated download
    toast({
      title: "Téléchargement lancé !",
      description: "Votre GIF magique arrive sur votre appareil.",
    });
    
    // Create a fake download link
    const link = document.createElement("a");
    link.href = theme.asset; // In real app, this would be the GIF URL
    link.download = `carte-voeux-${themeId}.png`; // Fake extension for now
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Lien copié !",
      description: "Partagez ce lien avec vos proches sur WhatsApp ou Instagram.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Redirect if no data
  useEffect(() => {
    if (!text && !themeId) {
       setLocation("/");
    }
  }, [text, themeId, setLocation]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary/10 to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        
        <div className="text-center space-y-2">
          <h1 className="font-display text-4xl text-primary">Voici votre Carte ! 🎁</h1>
          <p className="text-muted-foreground">Prête à être partagée</p>
        </div>

        <Preview theme={theme} text={text} className="shadow-2xl ring-8 ring-white/40" />

        <Card className="p-6 space-y-4 glass-panel bg-white/80">
          <Button 
            onClick={handleDownload} 
            className="w-full text-lg h-12 font-bold bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-5 w-5" /> Télécharger le GIF
          </Button>

          <div className="grid grid-cols-2 gap-3">
             <Button 
                variant="outline" 
                onClick={handleShare}
                className="w-full border-primary/20 text-primary hover:bg-primary/5"
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                {copied ? "Copié !" : "Copier le lien"}
              </Button>
             
             <Button 
                variant="ghost" 
                onClick={() => setLocation("/")}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Créer une autre
              </Button>
          </div>
        </Card>

        {/* Ad Placeholder */}
        <div className="w-full h-24 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground text-sm">
          Espace Publicitaire (Sponsorisé par le Pôle Nord)
        </div>

      </div>
    </div>
  );
}
