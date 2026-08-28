"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/reveal";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section
      id="testimonios"
      className="bg-gradient-section px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonios
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-4 text-muted-foreground">
            La confianza de quienes ya nos visitaron es nuestro mejor
            respaldo.
          </p>
        </Reveal>

        <div className="mt-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {TESTIMONIALS.map((t) => (
                <CarouselItem
                  key={t.name}
                  className="sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="hover-lift h-full border-none bg-white shadow-sm">
                    <CardContent className="flex h-full flex-col gap-4">
                      <Quote className="size-8 text-primary/30" />
                      <div className="flex gap-0.5 text-accent">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="size-4 fill-accent" />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        “{t.text}”
                      </p>
                      <p className="font-heading text-sm font-bold text-foreground">
                        {t.name}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
