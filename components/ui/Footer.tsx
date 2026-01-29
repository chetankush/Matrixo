"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-neutral-950 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg text-white">
              FirstVoid
            </span>
          </div>
          <p className="text-neutral-500 text-sm text-center sm:text-right">
            &copy; {currentYear} FirstVoid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
