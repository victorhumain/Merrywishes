import { useState } from "react";
import { useLocation } from "wouter";
import { themes } from "@/lib/themes";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, ArrowDown, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
// Importez ces composants si vous utilisez Shadcn/UI
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

// --- Définition des Polices ---
const FONT_OPTIONS = [
  { id: "default", name: "Par défaut", className: "font-sans" },
  { id: "display", name: "Festive", className: "font-display" },
  { id: "serif", name: "Classique", className: "font-serif" },
  { id: "handwriting", name: "Manuscrite", className: "font-[cursive]" }, 
];

const SUGGESTIONS = [
  "Joyeux Noël 🎄",
  "Bonne année ✨",
  "Tous mes meilleurs vœux !",
  "Que la magie de Noël vous illumine 🌟"
];

export default function Home() {
  const [text, setText] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0].id);
  const [selectedFontId, setSelectedFontId] = useState(FONT_OPTIONS[1].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const selectedTheme = themes.find(t => t.id === selectedThemeId) || themes[0];
  const selectedFont = FONT_OPTIONS.find(f => f.id === selectedFontId) || FONT_OPTIONS[0];

  const handleGenerate = () => {
    if (!text.trim()) {
      toast({
        title: "Message vide",
        description: "Veuillez écrire un petit mot doux avant de générer !",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call/processing time
    setTimeout(() => {
      setIsGenerating(false);
      const params = new URLSearchParams({
        text: text,
        theme: selectedThemeId,
        font: selectedFontId, // AJOUT DE LA POLICE
      });
      setLocation(`/card/share?${params.toString()}`);
    }, 2500);
  };
  
  // Fonction pour ajouter un emoji au texte
  const onEmojiClick = (emojiData: EmojiClickData) => {
    // Vérifie la limite de 120 caractères avant d'ajouter
    if ((text + emojiData.emoji).length <= 120) {
      setText(prev => prev + emojiData.emoji);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary/5 to-background flex flex-col items-center py-8 px-4 md:py-12">
      <header className="text-center mb-10 space-y-2">
        <div className="flex flex-row">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg m-4 animate-bounce">
            <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-primary drop-shadow-sm">
            MerryWishes.io
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Créez une carte de vœux animée unique en quelques secondes.
        </p>
      </header>

      <main className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="space-y-6 animate-in slide-in-from-left duration-700">
          <Card className="p-6 md:p-8 space-y-8 glass-panel border-white/50 shadow-xl">
            
            {/* Step 1: Text */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="message" className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
                  Votre Message
                </Label>
                <span className={`text-xs ${text.length > 100 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                  {text.length}/120
                </span>
              </div>
              
              <Textarea
                id="message"
                placeholder="Écrivez vos vœux ici..."
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 120))}
                className="resize-none text-lg bg-white/50 border-primary/20 focus:border-primary focus:ring-primary min-h-[100px]"
              />

              <div className="flex flex-wrap items-center gap-3">
                {/* Sélecteur d'Emojis (Utilisation de Popover) */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 px-3 text-sm">
                      <Sparkles className="mr-2 h-4 w-4" /> Ajouter un Émoji
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 z-50">
                    <EmojiPicker 
                      onEmojiClick={onEmojiClick} 
                      width="100%" 
                      height={400}
                    />
                  </PopoverContent>
                </Popover>

                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setText(s)}
                    className="text-xs bg-white border border-primary/10 hover:border-primary/40 hover:bg-primary/5 text-foreground/80 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
                Choisissez une Ambiance
              </Label>
              
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={cn(
                      "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                      selectedThemeId === theme.id 
                        ? "border-primary ring-2 ring-primary/20 shadow-lg scale-105" 
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img 
                      src={theme.asset} 
                      alt={theme.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-medium leading-tight">
                        {theme.name}
                      </span>
                    </div>
                    {selectedThemeId === theme.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center italic">
                {selectedTheme.description}
              </p>
            </div>

            {/* Step 3: Font */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">3</span>
                Choisissez votre Police
              </Label>
              
              <div className="grid grid-cols-2 gap-3">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFontId(font.id)}
                    className={cn(
                      "p-3 rounded-lg text-lg transition-all border",
                      font.className, 
                      selectedFontId === font.id
                        ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                        : "bg-white/50 border-gray-200 hover:bg-gray-100/70 text-foreground"
                    )}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <Button 
              size="lg" 
              className="w-full text-lg h-14 font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                "Création en cours..."
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" /> Générer le GIF
                </>
              )}
            </Button>

          </Card>
        </div>

        {/* Right Column: Preview */}
        <div className="sticky top-8 animate-in slide-in-from-right duration-700 delay-100">
           <div className="flex flex-col items-center space-y-4">
             <h2 className="font-display text-2xl text-primary/80">Aperçu en direct</h2>
             <Preview 
               theme={selectedTheme} 
               text={text} 
               isGenerating={isGenerating} 
               fontClassName={selectedFont.className} // PASSAGE DE LA CLASSE DE POLICE
             />
             <div className="bg-white/60 backdrop-blur px-4 py-2 rounded-full text-sm text-muted-foreground border border-white/40 shadow-sm">
                GIF 720x720 • 4 secondes
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}