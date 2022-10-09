import useDarkmode from "@/lib/hooks/DarkmodeHook";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const { darkmode } = useDarkmode();

  return (
    <div className={darkmode ? "dark" : ""}>
      <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}
