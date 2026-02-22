export default function NoHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-gray-100">{children}</main>;
}
