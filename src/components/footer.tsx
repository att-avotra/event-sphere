import React from "react";

function FooterClient() {
  return (
    <footer className="bg-[#DAE2FD] sticky bottom-0 w-full  px-6 py-12">
      <div className="container mx-auto flex flex-col gap-5  px-4">
        <p className="text-xl font-bold">Event Sphere</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 w-md">
            Donner aux communautés les moyens d&apos;agir grâce à des
            expériences de découverte et de gestion d&apos;événements fluides.
          </p>
          <div className="flex flex-row justify-between items-start w-1/2">
            {/* privacy,contact us,terms of service,coookie setting menu here */}
            <p className="text-gray-600">Privacy Policy</p>
            <p className="text-gray-600">Contact Us</p>
            <p className="text-gray-600">Terms of Service</p>
            <p className="text-gray-600">Cookie Settings</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <p className="text-gray-600">
            © 2024 Event Sphere inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;
