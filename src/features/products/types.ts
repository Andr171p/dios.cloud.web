
type HexColor = `#${string}`

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  href: string;
  accentColor: HexColor;
  features: readonly string[];
}
