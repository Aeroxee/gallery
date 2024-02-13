type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <main className={`w-[96%] md:w-[80%] mx-auto ${className} pb-[40px]`}>
      {children}
    </main>
  );
}
