import Sidebar from "@/app/components/sidebar";

export default function Home() {
  return (
    <div className="h-full">
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-full lg:w-85 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
          <Sidebar />
        </div>
      </aside>

      <div className="md:ml-85">
        {/* <Header /> */}
        <div className="h-full flex justify-center items-center dark:text-white">
          Select a chat to start messsaging
        </div>
      </div>
    </div>
  );
}
