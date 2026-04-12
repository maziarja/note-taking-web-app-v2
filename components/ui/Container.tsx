function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} bg-background flex-1 rounded-t-lg px-4 py-5 md:px-8 md:py-6 lg:hidden`}
    >
      {children}
    </div>
  );
}

export default Container;
