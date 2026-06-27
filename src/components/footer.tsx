import React from "react";

function FooterClient() {
  return (
    <footer className="bg-[#DAE2FD] w-full px-6 py-10 md:py-12">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:gap-8">
        <p className="text-xl font-bold">Event Sphere</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="text-gray-600 max-w-2xl md:max-w-lg">
            Donner aux communautés les moyens d&apos;agir grâce à des
            expériences de découverte et de gestion d&apos;événements fluides.
          </p>
          <div className="flex flex-wrap gap-4 text-gray-600 md:gap-6">
            <p className="cursor-pointer hover:text-slate-900">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-slate-900">Contact Us</p>
            <p className="cursor-pointer hover:text-slate-900">
              Terms of Service
            </p>
            <p className="cursor-pointer hover:text-slate-900">
              Cookie Settings
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-300/60 pt-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Event Sphere inc. All rights reserved.</p>
          <p className="md:text-right">Built for seamless event experiences.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;
