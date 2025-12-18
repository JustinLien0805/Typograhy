import { motion } from "motion/react";
import type { MarqueeItem } from "../types";

export default function InfiniteMarquee({ items }: { items: MarqueeItem[] }) {
  return (
    <div className="w-full overflow-hidden py-6 absolute bottom-0 left-0 z-0 pointer-events-none opacity-80">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className={`text-2xl md:text-3xl ${item.className}`}
            style={{ fontFamily: item.fontFamily }}
          >
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
