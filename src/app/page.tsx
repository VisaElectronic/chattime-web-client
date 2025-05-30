import Sidebar from "@/app/components/sidebar";
import Header from "@/components/layouts/header";

export default function Home() {
  return (
    <div className="">
      <Header />
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-85 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
          <Sidebar />
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        
      </div>
    </div>
  );
}
