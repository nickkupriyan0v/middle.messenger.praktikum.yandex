export interface LinkProps {
  text: string;
  events: Record<string, (e: Event) => void>;
  href: string;
}
