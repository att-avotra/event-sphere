import React from "react";
import FoulPartyImage from "@/assets/tommorow-land.png";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar1 } from "lucide-react";

function CalendarPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#FAF8FF">
      <section
        className="flex flex-col  items-center px-6 py-12
      "
      >
        <div className="flex flex-col items-center text-center w-full max-w-7xl border-b-2 p-4">
          <div
            className="relative w-full h-full overflow-hidden pb-7"
            style={{ height: "38rem" }}
          >
            <Image
              src={FoulPartyImage}
              alt="Event"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            {/* Overlay blanc avec dégradé  */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/90 to-transparent" />

            {/* Contenu texte */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-black text-left">
              <div className="flex items-center gap-2">
                <span className="bg-[#778093] text-white text-xs px-2.5 py-1 rounded-full">
                  Music
                </span>
              </div>
              <h3 className="text-3xl font-semibold mt-2">
                Sonic Horizon: Global Tour 2024
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col  items-center px-6 h-screen">
        <div className="flex flex-row items-center text-center w-full max-w-7xl">
          {/* left section */}
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-between items-center w-full">
              <Card size="sm" className="mx-auto w-48 max-w-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <Calendar1 className="h-5 w-5 text-primary" />
                  <div className="flex items-start flex-col">
                    <CardTitle className="uppercase">Date</CardTitle>
                    <CardDescription>Octobre 24,2026</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CalendarPage;
