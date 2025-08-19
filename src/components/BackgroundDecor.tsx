import { motion } from "framer-motion";

export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* layered radial auroras */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_10%_10%,rgba(56,189,248,.28),transparent_60%),radial-gradient(40%_30%_at_90%_10%,rgba(217,70,239,.22),transparent_60%),radial-gradient(40%_40%_at_50%_100%,rgba(34,197,94,.18),transparent_60%)]" />
      
      {/* soft grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
      </svg>

      {/* blob left */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute -top-24 -left-24 h-[44rem] w-[44rem] opacity-40 blur-3xl"
        initial={{ y: -10 }}
        animate={{ y: [ -10, 10, -10 ] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path
          d="M317 80c68 9 142 33 175 90 33 58 16 151-34 214-49 62-128 94-201 96-72 1-138-27-170-80-32-52-29-129 6-184 36-55 104-89 170-114 67-26 123-31 154-22Z"
          fill="url(#g1)"
        />
      </motion.svg>

      {/* blob right */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute -bottom-40 right-[-8%] h-[40rem] w-[40rem] opacity-30 blur-3xl"
        initial={{ y: 0 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M460 120c48 44 79 116 64 173-15 57-77 99-144 126-67 28-139 42-192 21-52-21-85-76-87-131-2-55 28-110 78-154 49-45 117-79 169-78 52 2 88 39 112 43Z"
          fill="url(#g2)"
        />
      </motion.svg>
    </div>
  );
}
