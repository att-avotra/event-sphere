"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
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
import {
  Calendar1,
  ChevronLeft,
  ChevronRight,
  HeartIcon,
  MapPin,
  Search,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import FoulPartyImage from "@/assets/tommorow-land.png";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FooterClient from "@/components/footer";

interface mockdata {
  categorie: string;
  title: string;
  date: Date;
  price?: number;
  lieu: string;
}
function Page() {
  const [api, setApi] = useState<CarouselApi>();
  const [value, setValue] = useState([75]);
  const maxPrice = 1000;
  const categorie: string[] = [
    "Tous les évenements",
    "Concerts",
    "Workshop",
    "Businness",
  ];
  useEffect(() => {
    if (!api) return;

    const update = () => {
      // tu peux ajouter des states si tu veux désactiver les boutons
    };
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);
  const mockDataEvent: mockdata[] = [
    {
      categorie: "Concerts",
      title: "Sonic Horizon: Global Tour 2024",
      date: new Date(),
      lieu: "Paris",
      price: 150,
    },
    //continuer le mockdata
    {
      categorie: "Workshop",
      title: "Masterclass Design UI/UX",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      lieu: "Lyon",
      price: 45,
    },
    {
      categorie: "Business",
      title: "Tech Summit 2024",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      lieu: "Bordeaux",
      price: 120,
    },
    {
      categorie: "Concerts",
      title: "Jazz Under The Stars",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      lieu: "Marseille",
      price: 25,
    },
    {
      categorie: "Workshop",
      title: "Atelier Cuisine Italienne",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      lieu: "Nice",
      price: 60,
    },
    //continue again,also add free price
    {
      categorie: "Business",
      title: "Networking Startup Night",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      lieu: "Toulouse",
      price: 0,
    },
    {
      categorie: "Concerts",
      title: "Electro Garden Party",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      lieu: "Montpellier",
      price: 35,
    },
    {
      categorie: "Workshop",
      title: "Introduction à la Poterie",
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      lieu: "Nantes",
      price: 0,
    },
    {
      categorie: "Business",
      title: "Conférence IA & Futur",
      date: new Date(new Date().setDate(new Date().getDate() + 15)),
      lieu: "Lille",
      price: 85,
    },
  ];
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
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5 " />
              </Button>
            </div>
          </header>

          <div className="overflow-hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-1">
                {" "}
                {/* ← Ajustement courant pour éviter le débordement */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full md:basis-1/2 lg:basis-1/3 pl-1"
                  >
                    <div className="relative aspect-5/4 rounded-xl overflow-hidden bg-slate-200">
                      <Image
                        src={FoulPartyImage}
                        alt="Event"
                        fill
                        className="object-cover"
                      />

                      {/* Overlay blanc avec dégradé */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/90 to-transparent" />

                      {/* Contenu texte */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-black">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full">
                            Music
                          </span>
                          <span className="text-sm">Dec 15 • 8:00 PM</span>
                        </div>
                        <h3 className="text-xl font-semibold mt-2">
                          Sonic Horizon: Global Tour 2024
                        </h3>
                        <p className="text-sm mt-1 line-clamp-2">
                          Experience the worlds leading EDM artists in a
                          multi-sensory journey.
                        </p>
                      </div>
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

      <section className="bg-[#FAF8FF] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-start gap-8">
            {/*LEFT SECTION*/}
            <aside className="flex flex-col gap-4 w-56">
              <header className="flex justify-between items-center h-10">
                <h2 className="font-bold">Filtrer</h2>
                <Button
                  size="sm"
                  className="me-2 bg-transparent! text-primary cursor-pointer"
                >
                  Reset
                </Button>
              </header>
              <p className="text-gray-600">CATEGORIE</p>
              <div className="flex flex-col gap-2">
                <FieldGroup className="max-w-sm">
                  {categorie.map((item, index) => (
                    <Field orientation="horizontal" key={index}>
                      <Checkbox
                        id={item}
                        name={item}
                        className="cursor-pointer"
                      />
                      <Label htmlFor={item} className="cursor-pointer">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Label>
                    </Field>
                  ))}
                </FieldGroup>
              </div>
              <p className="text-gray-600">RANGEMENT DE PRIX</p>
              <div className="relative pt-6">
                <div
                  className="absolute top-0 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded shadow-sm transition-all"
                  style={{ left: `${(value[0] / maxPrice) * 100}%` }}
                >
                  {value[0]}€
                </div>
                <Slider
                  defaultValue={[75]}
                  onValueChange={setValue}
                  value={value}
                  max={maxPrice}
                  step={1}
                  className="relative smx-auto w-full max-w-xs cursor-pointer"
                />
                <div className="w-full flex justify-between items-center mt-2 text-sm text-gray-500">
                  <p>0€</p>
                  <p>{maxPrice}€</p>
                </div>
              </div>
              <p className="text-gray-600">DATE</p>
              <div className="flex flex-col gap-2">
                <RadioGroup defaultValue="today">
                  <FieldGroup className="max-w-sm">
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        value="today"
                        id="today"
                        className="cursor-pointer"
                      />
                      <Label htmlFor="today" className="cursor-pointer">
                        Aujourd&apos;hui
                      </Label>
                    </Field>
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        value="tomorrow"
                        id="tomorrow"
                        className="cursor-pointer"
                      />
                      <Label htmlFor="tomorrow" className="cursor-pointer">
                        Demain
                      </Label>
                    </Field>
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        value="this-weekend"
                        id="this-weekend"
                        className="cursor-pointer"
                      />
                      <Label htmlFor="this-weekend" className="cursor-pointer">
                        Ce week-end
                      </Label>
                    </Field>
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        value="this-week"
                        id="this-week"
                        className="cursor-pointer"
                      />
                      <Label htmlFor="this-week" className="cursor-pointer">
                        Cette semaine
                      </Label>
                    </Field>
                  </FieldGroup>
                </RadioGroup>
              </div>
            </aside>
            {/*RIGHT SECTION*/}
            <div className="flex-1">
              <header className="flex justify-between items-center w-full h-10">
                <p className="text-gray-600 text-sm">
                  Affichage de <span>{mockDataEvent.length}</span> évenements
                </p>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Trier par:</span>
                    <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer outline-none">
                      <option value="newest">Plus récents</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="popular">Plus populaires</option>
                    </select>
                  </div>
                </div>
              </header>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {mockDataEvent.map((item, index) => (
                  <Card
                    key={`${item.title}-${index}`}
                    className="relative w-full pt-0"
                  >
                    <div className=" absolute z-30 top-2.5 left-1.5 right-1  flex justify-between items-center">
                      <p className="p-1 bg-white uppercase text-xs rounded text-primary">
                        {item.categorie}
                      </p>
                      <HeartIcon className="h-6 w-6 bg-white rounded-full p-1 cursor-pointer" />
                    </div>
                    {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
                    <Image
                      src="https://avatar.vercel.sh/shadcn1"
                      alt="Event cover"
                      width={640}
                      height={560}
                      className="relative z-20 h-40  w-full aspect-video object-cover brightness-60 grayscale dark:brightness-40"
                    />

                    <CardHeader>
                      {/* <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                      </CardAction> */}
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Calendar1></Calendar1>
                        <p className="text-sm">
                          {item.date.toLocaleDateString("fr-FR")}
                        </p>
                      </CardTitle>
                      <CardDescription>
                        <h3 className="text-lg font-semibold text-black">
                          {item.title}
                        </h3>
                      </CardDescription>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          <span className="text-sm">{item.lieu}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <p className="text-primary">{item.price}€</p>
                      <Button className="">View Event</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*footer is here */}
      <FooterClient />
    </div>
  );
}

export default Page;
