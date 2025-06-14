import {
  Users,
  Package,
  Briefcase,
} from "lucide-react";

export default function InfoStats() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#D9A5B3]" />, // blush accent
      value: "50+",
      label: "Happy Clients",
    },
    {
      icon: <Package className="w-8 h-8 text-[#D9A5B3]" />,
      value: "80+",
      label: "Events",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#D9A5B3]" />,
      value: "5",
      label: "Years of Experience",
    },
  ];

  return (
    <section className="bg-[#FFFAF8] py-14 px-6 sm:px-12 text-[#6B6B6B]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            {item.icon}
            <p className="text-3xl font-semibold text-[#2B2B2B]">{item.value}</p>
            <p className="text-base">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
