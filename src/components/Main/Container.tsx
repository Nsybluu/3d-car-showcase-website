interface Props {
  children: React.ReactNode;
  wide?: boolean;
}

export default function Container({ children, wide }: Props) {
  return (
    <div className={`mx-auto px-6 ${wide ? "max-w-screen-2xl" : "max-w-7xl"}`}>
      {children}
    </div>
  );
}
