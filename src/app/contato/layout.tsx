import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - VitrineLux',
  description: 'Entre em contato com a VitrineLux. Estamos prontos para ajudá-lo a encontrar o veículo premium perfeito.',
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}