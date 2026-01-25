import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export default function SectionHeader({ title, subtitle, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-white">
            {title}
          </span>
        </h2>
        <div className={`h-1 w-20 bg-primary/50 rounded-full mb-4 ${align === "center" ? "mx-auto" : ""}`}></div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
