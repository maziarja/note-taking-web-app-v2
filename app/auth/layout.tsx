function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-secondary flex min-h-dvh items-center justify-center">
      <div className="mx-auto max-w-135 flex-1 px-4 md:px-0">{children}</div>
    </div>
  );
}

export default AuthLayout;
