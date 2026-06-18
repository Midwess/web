import { motion } from "motion/react";
import { Users, Mail } from "lucide-react";
import { GithubIcon } from "./_icons/GithubIcon";

type Item = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
  href?: string;
};

const items: Item[] = [
  { icon: Users, value: "James Dang & KhoiNguyen", label: "Founders" },
  {
    icon: Mail,
    value: "team@midwess.com",
    label: "Email",
    href: "mailto:team@midwess.com",
  },
  {
    icon: GithubIcon,
    value: "github.com/midwess",
    label: "GitHub",
    href: "https://github.com/midwess",
  },
];

const cardClass =
  "group flex h-20 items-center justify-center gap-3 px-4 transition-colors hover:bg-white/[0.03] md:h-24";

const Inner = ({ item }: { item: Item }) => (
  <>
    <div className="relative flex-shrink-0">
      <item.icon className="h-5 w-5 text-olive-300 transition-colors duration-300 group-hover:text-olive-50" />
      <div className="absolute inset-0 bg-olive-50/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
    </div>
    <div className="flex flex-col items-start leading-tight">
      <span className="text-sm font-bold whitespace-nowrap text-olive-50 md:text-base">
        {item.value}
      </span>
      <span className="text-[11px] font-bold tracking-[0.1em] text-olive-400 uppercase transition-colors group-hover:text-olive-200">
        {item.label}
      </span>
    </div>
  </>
);

export const HeroHighlights = () => (
  <div className="w-full border-t border-olive-50/10 bg-black/30 backdrop-blur-md">
    <div className="grid grid-cols-1 divide-x divide-olive-50/10 sm:grid-cols-3">
      {items.map((item, index) => {
        const motionProps = {
          initial: { opacity: 0, y: 5 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: index * 0.05 },
        };
        return item.href ? (
          <motion.a
            key={item.label}
            href={item.href}
            className={cardClass}
            {...motionProps}
          >
            <Inner item={item} />
          </motion.a>
        ) : (
          <motion.div key={item.label} className={cardClass} {...motionProps}>
            <Inner item={item} />
          </motion.div>
        );
      })}
    </div>
  </div>
);
