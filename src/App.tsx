import { type ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Menu, Phone, Search, Send, X } from "lucide-react";

type Page =
  | "home"
  | "services"
  | "contact"
  | "records"
  | "example"
  | "update";

const navItems: Array<{ id: Page; label: string }> = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
  { id: "records", label: "Records" },
  { id: "update", label: "Update Profile" },
];

const horses = [
  "Dio- bay 17.2 hand 8 year old German warmblood gelding",
  "Dio- grey 16.1 hand 5 year old Hanoverian gelding",
  "Dio- bay 16.2 hand 13 year old thoroughbred mare",
  "Dio- 14.2 hand 20 year old welsh pony mare",
];

const defaultHorse = "Dio- 17.2 hand 8 year old German warmblood gelding";

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentMotion = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function PageFrame({
  bg,
  children,
}: {
  bg: "#2C5F66" | "#1B3D1F";
  children: ReactNode;
}) {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: bg, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 0.8px, transparent 0.8px)", backgroundSize: "4px 4px" }}
    >
      <motion.div
        className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-cyan-200/10 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald-200/10 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 lg:px-8"
        variants={contentMotion}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedHorse, setSelectedHorse] = useState<string>(defaultHorse);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const filteredHorses = useMemo(
    () =>
      horses.filter((horse) =>
        horse.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  const goto = (page: Page) => {
    setCurrentPage(page);
    setOpenMenu(false);
  };

  const readMore = (horse: string) => {
    setSelectedHorse(horse);
    setCurrentPage("example");
    setOpenMenu(false);
  };

  const submitProfile = () => {
    window.alert("Profile updated");
    setCurrentPage("home");
    setOpenMenu(false);
  };

  return (
    <div className="min-h-screen font-jakarta text-[#10222b] antialiased [text-rendering:optimizeLegibility]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-[1px]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-sm font-semibold tracking-[0.01em]"
            onClick={() => goto("home")}
          >
            EquiTrack
          </button>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goto(item.id)}
                className={`text-[13px] font-medium leading-none tracking-[0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
                  currentPage === item.id
                    ? "border-b border-black pb-0.5 text-black"
                    : "border-b border-transparent pb-0.5 text-black/75 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            {openMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {openMenu && (
          <div className="border-t border-black/10 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goto(item.id)}
                  className={`w-fit text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
                    currentPage === item.id
                      ? "border-b border-black text-black"
                      : "border-b border-transparent text-black/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageMotion}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {currentPage === "home" && (
            <PageFrame bg="#2C5F66">
              <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
                <motion.div
                  className="grid gap-8 py-16"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                >
                  <p className="max-w-[360px] text-[22px] font-semibold leading-[1.45] text-[#f4fbfd] sm:text-[25px]">
                    EquiTrack is a record keeping horse injection website. These records are focused on joint injections.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a"
                    alt="Horse head portrait"
                    className="h-[350px] w-full max-w-[450px] rounded-sm object-cover object-center shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
                  />
                  <h1 className="font-fraunces text-6xl font-bold leading-[0.95] tracking-[-0.015em] text-[#f6fcff] sm:text-7xl">
                    EquiTrack
                  </h1>
                </motion.div>

                <motion.div
                  className="py-20 lg:pl-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.div
                    className="w-full max-w-[360px] rounded-xl border border-white/70 bg-white/95 p-5 shadow-[0_14px_34px_rgba(6,28,38,0.28)] backdrop-blur"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="mb-4 text-[22px] font-semibold leading-tight text-[#0f232d]">
                      Please enter DEA number here to continue
                    </h2>
                    <label className="mb-1 block text-[15px] font-semibold text-[#0f232d]">Message</label>
                    <div className="mb-2 flex items-center gap-1 border border-black/20 bg-[#f7f7f7] px-2 py-1 text-xs">
                      <button type="button" className="px-2 font-semibold">B</button>
                      <button type="button" className="px-2 italic">I</button>
                      <button type="button" className="px-2 underline">U</button>
                      <button
                        type="button"
                        className="ml-auto border border-black/20 bg-white px-2 py-0.5 text-[11px]"
                      >
                        Normal Text
                      </button>
                    </div>
                    <textarea className="h-24 w-full resize-none border border-black/25 p-2 text-[15px] leading-relaxed outline-none focus:border-black/50" />
                    <motion.button
                      type="button"
                      onClick={() => goto("services")}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      <Send size={14} />
                      Send
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => goto("records")}
                      className="ml-3 mt-4 inline-flex items-center gap-2 rounded-full border border-black/35 bg-white px-5 py-2 text-sm font-semibold text-[#10222b] transition-colors hover:bg-[#f4f7f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      Open Records
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </PageFrame>
          )}

          {currentPage === "services" && (
            <PageFrame bg="#2C5F66">
              <h1 className="py-4 text-center font-fraunces text-5xl font-bold tracking-[-0.01em] text-[#f4fbfd]">
                Services
              </h1>
              <div className="grid items-center gap-10 py-20 md:grid-cols-2">
                <div className="grid justify-center text-center text-[#d6edf3]">
                  <div className="text-4xl font-bold tracking-[0.16em]">
                    EQUITRACK
                  </div>
                  <svg
                    viewBox="0 0 120 120"
                    className="mx-auto my-4 h-28 w-28"
                    aria-label="Horse head silhouette"
                  >
                    <path
                      d="M25 92 C24 74, 31 58, 42 50 C52 42, 58 32, 57 22 C72 29, 84 40, 89 56 C91 64, 90 79, 82 90 C74 101, 58 106, 44 103 C35 101, 28 98, 25 92 Z"
                      fill="#d6edf3"
                    />
                    <circle cx="61" cy="53" r="2.8" fill="#2C5F66" />
                  </svg>
                  <div className="text-2xl font-semibold tracking-[0.24em]">
                    SERVICES
                  </div>
                </div>
                <div className="max-w-xl py-6">
                  <p className="text-[31px] font-medium leading-[1.45] text-[#f4fbfd]">
                    Our services include tracking and updating horse joint injections, and keeping joint injection records. Veterinarians can update records, but a notification will be sent to the horse's owner for conformation of procedures..
                  </p>
                  <div className="mt-8 grid gap-3 text-[#ecf8fb] sm:grid-cols-3">
                    <div className="rounded border border-white/25 bg-white/10 p-3 text-sm font-semibold">1. Record Procedure</div>
                    <div className="rounded border border-white/25 bg-white/10 p-3 text-sm font-semibold">2. Notify Owner</div>
                    <div className="rounded border border-white/25 bg-white/10 p-3 text-sm font-semibold">3. Confirm Update</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => goto("contact")}
                    className="mt-8 rounded-full bg-black px-8 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </PageFrame>
          )}

          {currentPage === "contact" && (
            <PageFrame bg="#2C5F66">
              <h1 className="py-4 text-center font-fraunces text-5xl font-bold tracking-[-0.01em] text-[#f4fbfd]">
                Contact Us
              </h1>
              <div className="grid gap-8 py-20 md:grid-cols-3">
                <div className="grid content-center justify-items-start gap-3 text-[#f4fbfd]">
                  <p className="text-5xl font-bold leading-none">CONTACT US</p>
                  <Phone size={34} />
                  <p className="text-4xl font-bold">EQUITRACK</p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3"
                    alt="Brown horse"
                    className="h-[320px] w-[260px] rounded-sm object-cover shadow-[0_8px_22px_rgba(0,0,0,0.2)]"
                  />
                </div>
                <div className="grid content-center gap-6 text-[30px] font-semibold leading-[1.35] text-[#f4fbfd]">
                  <p>Office number: 470-472-8706</p>
                  <p>Office Email: Equi.track@gmail.com</p>
                </div>
              </div>
              <div className="grid gap-4 pb-10 md:grid-cols-2">
                <motion.article className="rounded-xl border border-white/25 bg-white/10 p-4 text-[#f4fbfd] backdrop-blur-sm" whileHover={{ y: -2 }}>
                  <h3 className="font-fraunces text-2xl font-semibold">For Veterinarians</h3>
                  <p className="mt-2 text-base leading-relaxed">Track and update horse joint injections in one place with a clean procedure timeline.</p>
                </motion.article>
                <motion.article className="rounded-xl border border-white/25 bg-white/10 p-4 text-[#f4fbfd] backdrop-blur-sm" whileHover={{ y: -2 }}>
                  <h3 className="font-fraunces text-2xl font-semibold">For Owners</h3>
                  <p className="mt-2 text-base leading-relaxed">Receive notifications and stay informed about procedures and medication details.</p>
                </motion.article>
              </div>
              <div className="pb-8 text-center">
                <button
                  type="button"
                  onClick={() => goto("records")}
                  className="rounded-full bg-black px-8 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
                >
                  View Records
                </button>
              </div>
            </PageFrame>
          )}

          {currentPage === "records" && (
            <PageFrame bg="#1B3D1F">
              <h1 className="py-4 text-center font-fraunces text-5xl font-bold tracking-[-0.01em] text-[#f1faef]">
                Injection Records
              </h1>
              <div className="py-8">
                <label className="relative mx-auto block w-full max-w-[340px]">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/65"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-black/25 bg-white px-9 py-2.5 text-[15px] font-medium"
                    placeholder="Search horse name (Dio)"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2">
                {filteredHorses.map((horse, idx) => (
                  <motion.article
                    key={horse}
                    className="flex items-center justify-between gap-4 rounded-xl border border-black/15 bg-[#F5F1E8] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-[15px] font-semibold leading-[1.4] text-[#10222b]">{horse}</p>
                    <button
                      type="button"
                      onClick={() => readMore(horse)}
                      className="inline-flex shrink-0 items-center gap-1 border border-black/20 bg-white px-3 py-1.5 text-xs transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                    >
                      Read More
                      <ArrowUpRight size={12} />
                    </button>
                  </motion.article>
                ))}
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-[#f1faef] backdrop-blur-sm">
                <h3 className="font-fraunces text-2xl font-semibold">Why Customers Like EquiTrack</h3>
                <div className="mt-3 grid gap-2 text-base font-medium md:grid-cols-3">
                  <p className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Faster record lookup</p>
                  <p className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Cleaner procedure history</p>
                  <p className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Better owner communication</p>
                </div>
              </div>
            </PageFrame>
          )}

          {currentPage === "example" && (
            <PageFrame bg="#1B3D1F">
              <h1 className="py-3 text-center font-fraunces text-5xl font-bold tracking-[-0.01em] text-[#f1faef]">
                {selectedHorse || defaultHorse}
              </h1>
              <p className="text-center text-3xl font-semibold leading-[1.4] text-[#f0f9ee]">
                Number of Injection Procedures- 1
              </p>
              <div className="grid items-center gap-10 py-24 md:grid-cols-2">
                <p className="max-w-xl text-[36px] font-semibold leading-[1.35] text-[#f3fbf1]">
                  Procedure- Front Fetlock Injections. Date- September 23rd 2025. Medicine used- Hyaluronic Acid and Cortisone
                </p>
                <div className="flex justify-center md:justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1452796958310-a2b3f2752eaf"
                    alt="Bay horse"
                    className="h-[230px] w-[330px] rounded-sm object-cover shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>
              <div className="pb-10 text-center">
                <button
                  type="button"
                  onClick={() => goto("update")}
                  className="rounded-full bg-black px-8 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
                >
                  Update This Profile
                </button>
              </div>
            </PageFrame>
          )}

          {currentPage === "update" && (
            <PageFrame bg="#1B3D1F">
              <h1 className="py-6 text-center font-fraunces text-5xl font-bold tracking-[-0.01em] text-[#f1faef]">
                Horse Profile Update
              </h1>
              <div className="grid place-items-center py-20">
                <textarea
                  className="h-[200px] w-full max-w-[400px] border border-dotted border-black/35 bg-white p-3"
                  aria-label="Horse profile update text"
                />
                <button
                  type="button"
                  onClick={submitProfile}
                  className="mt-10 rounded-full bg-black px-10 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
                >
                  submit
                </button>
              </div>
            </PageFrame>
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
