"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ==================== HERO SECTION (Full Height) ==================== */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-white to-[#F8F5FF] px-6 py-12">
        <div className="flex flex-col gap-8 items-center text-center max-w-2xl">
          <Badge className="bg-[#E8F0FC] text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-4 py-2">
            Vivez vos meilleurs moments
          </Badge>

          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Trouvez votre prochaine{" "}
            <span className="text-primary italic">expérience</span> inoubliable
          </h1>

          <p className="text-secondary-foreground text-lg max-w-md">
            Découvrez des concerts, des ateliers, des conférences et des
            événements locaux adaptés à vos centres d&apos;intérêt.
          </p>

          <div className="w-full max-w-sm md:max-w-md lg:max-w-xl">
            <InputGroup className="w-full h-12">
              <InputGroupInput
                placeholder="Rechercher des événements, des lieux ou des catégories"
                className="outline-0 placeholder:text-xs sm:placeholder:text-md min-w-0"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <Button size="sm" className="me-2 cursor-pointer">
                Rechercher
              </Button>
            </InputGroup>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8FF] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="flex  items-center justify-between mb-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">Événements populaires</h2>
              <p className="text-gray-600">
                Selection exclusive d&apos;experiences immanquables
              </p>
            </div>
            {/* next && prev carousel here */}
            <p>a</p>
          </header>

          <div className="overflow-hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {" "}
                {/* ← Ajustement courant pour éviter le débordement */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-1"
                  >
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
