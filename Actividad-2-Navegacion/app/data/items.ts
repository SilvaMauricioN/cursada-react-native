export type Item = {
  id: number;
  name: string;
  description: string;
};

export const ITEMS: Item[] = [
  {
    id: 1,
    name: 'Pino Silvestre',
    description: 'Conífera resistente que crece en climas fríos y montañosos.',
  },
  {
    id: 2,
    name: 'Abeto Blanco',
    description: 'Árbol de ramas simétricas, muy usado en reforestación.',
  },
  {
    id: 3,
    name: 'Cedro del Atlántico',
    description: 'De madera aromática y larga vida, ideal para jardines amplios.',
  },
  { id: 4, name: 'Ciprés', description: 'Esbelto y perenne, aporta privacidad y sombra.' },
  { id: 5, name: 'Secuoya', description: 'Uno de los seres vivos más altos del planeta.' },
  {
    id: 6,
    name: 'Araucaria',
    description: 'Árbol milenario de la Patagonia con hojas en forma de escama.',
  },
];
