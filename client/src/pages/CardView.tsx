import { useLocation } from "wouter";
import { themes } from "@/lib/themes";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, ArrowLeft, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas-pro"; // Utilisation de html2canvas-pro pour la compatibilité

// --- Définition des Polices (Doit être la même que dans Home.tsx) ---
const FONT_OPTIONS = [
  { id: "default", name: "Par défaut", className: "font-sans" },
  { id: "display", name: "Festive", className: "font-display" },
  { id: "serif", name: "Classique", className: "font-serif" },
  { id: "handwriting", name: "Manuscrite", className: "font-[cursive]" }, 
];

export default function CardView() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // Parse query params manually
  const searchParams = new URLSearchParams(window.location.search);
  const text = searchParams.get("text") || "";
  const themeId = searchParams.get("theme") || "snow";
  const fontId = searchParams.get("font") || "display"; // Récupération de l'ID de la police
  
  const theme = themes.find((t) => t.id === themeId) || themes[0];
  const font = FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0]; // Récupération de l'objet police

  // ----------------------------- //
  // REAL IMAGE DOWNLOAD FUNCTION  //
  // ----------------------------- //
  const handleDownload = async () => {
    if (!previewRef.current) return;

    // 🎯 Cibler l'élément <Preview /> (le premier enfant)
    const targetElement = previewRef.current.firstChild as HTMLElement; 

    if (!targetElement) return;

    // Ajouter la classe temporaire pour retirer la bordure et le ring (CORRECTIF POUR L'ESPACE BLANC)
    targetElement.classList.add("capture-safe");

    toast({
      title: "Génération de l'image...",
      description: "Veuillez patienter quelques secondes...",
    });

    try {
        // Convert the component into a canvas
        const canvas = await html2canvas(targetElement, { // On capture targetElement (la Preview)
            scale: 2, 
            backgroundColor: null, // Arrière-plan transparent
            useCORS: true,
            allowTaint: true,
        });

        // Retirer la classe DE SUITE après la capture
        targetElement.classList.remove("capture-safe");

        // Convert canvas to PNG
        const dataUrl = canvas.toDataURL("image/png");

        // Trigger download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `carte-voeux-${themeId}.png`;
        link.click();

        toast({
          title: "Téléchargement terminé 🎉",
          description: "Votre carte a été enregistrée sur votre appareil.",
        });

    } catch (error) {
        // En cas d'erreur, assurez-vous de retirer la classe de sécurité
        targetElement.classList.remove("capture-safe");
        toast({
            title: "Erreur de téléchargement",
            description: "Une erreur est survenue lors de la conversion de la carte en image.",
            variant: "destructive"
        });
        console.error("HTML2Canvas Error:", error);
    }
  };

  // ----------------------------- //
  // COPY SHARE LINK               //
  // ----------------------------- //
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Lien copié !",
      description: "Partagez ce lien avec vos proches 💌",
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

        {/* Capture area */}
        <div ref={previewRef}>
          <Preview
            theme={theme}
            text={text}
            className="shadow-2xl ring-8 ring-white/40"
            fontClassName={font.className} // PASSAGE DE LA CLASSE DE POLICE
          />
        </div>

        <Card className="p-6 space-y-4 glass-panel bg-white/80">
          <Button
            onClick={handleDownload}
            className="w-full text-lg h-12 font-bold bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-5 w-5" /> Télécharger l’image
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="w-full border-primary/20 text-primary hover:bg-primary/5"
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Share2 className="mr-2 h-4 w-4" />
              )}
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
      </div>
    </div>
  );
}