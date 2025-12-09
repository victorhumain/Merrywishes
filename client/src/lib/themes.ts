import snowBg from '@assets/generated_images/deep_blue_night_sky_with_white_snowflakes_background.png';
import fireworksBg from '@assets/generated_images/dark_background_with_golden_fireworks_sparks.png';
import garlandBg from '@assets/generated_images/red_background_with_glowing_christmas_lights.png';

export interface Theme {
  id: string;
  name: string;
  asset: string;
  textColor: string;
  description: string;
}

export const themes: Theme[] = [
  {
    id: 'snow',
    name: 'Flocons Blancs',
    asset: snowBg,
    textColor: '#ffffff',
    description: 'Nuit bleue et neige douce'
  },
  {
    id: 'fireworks',
    name: 'Feux d’artifice',
    asset: fireworksBg,
    textColor: '#FFD700', // Gold
    description: 'Éclats festifs et dorés'
  },
  {
    id: 'garland',
    name: 'Guirlande Scintillante',
    asset: garlandBg,
    textColor: '#ffffff',
    description: 'Ambiance rouge chaleureuse'
  }
];