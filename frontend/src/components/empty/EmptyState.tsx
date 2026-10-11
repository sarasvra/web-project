import { PackageOpen } from "lucide-react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <>
    <div dir="rtl" className="flex min-h-[350px] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
          <PackageOpen size={38} strokeWidth={1.7} />
        </div>

        <h2 className="mt-6 text-xl font-black text-[#292332]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#77717F]">
          {description}
        </p>
      </div>
    </div>
  </>
  );
}