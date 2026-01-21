"use client"
import { usePathname } from "next/navigation";
import Logo from "../../assets/Logo";


const Footer = () => {

  const pathName = usePathname();

  if (pathName.includes("/dashboard")) {
    return <div></div>
  }




  return (
    <div>
      <footer className="bg-card pt-20 pb-10 px-4 md:px-8 rounded-t-[3rem] border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 space-y-4 md:col-span-1">
              <span className="py-4"><Logo ></Logo></span>
              <span className="text-4xl font-bold text-primary font-display">Travel</span>
              <p className="text-muted-foreground font-medium">
                Making the world feel a little smaller and a lot friendlier.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6">Company</h4>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6">Support</h4>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-6">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input flex-1"
                />
                <button className="bg-primary text-primary-foreground font-bold px-4 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-10 text-center text-muted-foreground font-medium text-sm">
            © 2024 HelloTravel Inc. Made with ❤️ for travelers everywhere.
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
