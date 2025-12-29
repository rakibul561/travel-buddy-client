import Logo from "../../assets/Logo"


const Footer = () => {
  return (
    <div>
      <footer className="bg-white pt-20 pb-10 px-4 md:px-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 space-y-4 md:col-span-1">
                <span className="py-4"><Logo ></Logo></span>
               <span className="text-4xl font-bold text-[#00DC33]">Travel</span>
              <p className="text-gray-500 font-medium">
                Making the world feel a little smaller and a lot friendlier.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-coral transition-colors">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-6">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-50 px-4 py-3 rounded-xl w-full font-medium focus:outline-none focus:ring-2 focus:ring-sunny"
                />
                <button className="bg-[#00DC33] text-yellow-900 font-bold px-4 py-3 rounded-xl hover:bg-yellow-400 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10 text-center text-gray-400 font-medium text-sm">
            © 2024 HelloTravel Inc. Made with ❤️ for travelers everywhere.
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
