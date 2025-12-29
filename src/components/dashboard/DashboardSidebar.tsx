const DashboardSidebar = () => {
  return (
    <div className="flex">
      {/* ICON SIDEBAR */}
      <div className="flex h-screen w-16 flex-col justify-between border-e border-gray-100 bg-white">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span>
          </div>

          <div className="border-t border-gray-100 px-2 py-4">
            <a className="group relative flex justify-center rounded-sm bg-green-50 px-2 py-1.5 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0"
                />
              </svg>

              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:visible">
                General
              </span>
            </a>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 p-2">
          <button className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-gray-500 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:visible">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* MAIN SIDEBAR */}
      <div className="flex h-screen flex-1 flex-col border-e border-gray-100 bg-white px-4 py-6">
        <ul className="mt-14 space-y-1">
          <li>
            <a className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium">
              General
            </a>
          </li>

          <li>
            <a className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
              Billing
            </a>
          </li>

          <li>
            <a className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
              Invoices
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
