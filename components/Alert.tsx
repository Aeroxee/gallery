type AlertProps = {
  children: React.ReactNode;
  type: "success" | "error";
};

const Alert = ({ children, type }: AlertProps) => (
  <div
    className={`my-4 border ${
      type == "error"
        ? "border-rose-600 bg-rose-500/50 text-rose-800 dark:text-rose-200"
        : "border-sky-600 bg-sky-500/50 text-sky-800 dark:text-sky-200"
    } p-4 rounded-sm`}
  >
    {children}
  </div>
);

export { Alert };
