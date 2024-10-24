import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";


const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Vive la emoción del torneo en cada imagen
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Capturamos los momentos más emocionantes de cada partido para que
              puedas revivirlos cuando quieras. Encuentra las fotos de tus
              mejores jugadas, celebra cada gol y comparte con amigos y
              familiares.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto" onClick={() => { window.location.href = "/gallery"}}>
                <ArrowRight className="mr-2 size-4" />
                Ver Galería
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contactar al Fotógrafo
              </Button>
            </div>
          </div>
          <div className="relative aspect-[3/4]">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="size-full text-muted-foreground opacity-20"
              >
                {Array.from(Array(720).keys()).map((dot, index, array) => {
                  const angle = 0.2 * index;
                  const scalar = 40 + index * (360 / array.length);
                  const x = Math.round(Math.cos(angle) * scalar);
                  const y = Math.round(Math.sin(angle) * scalar);
                  console.log(dot);

                  return (
                    <circle
                      key={index}
                      r={(3 * index) / array.length}
                      cx={400 + x}
                      cy={400 + y}
                      opacity={1 - Math.sin(angle)}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="absolute left-[8%] top-[10%] flex aspect-[8/5] w-[50%] justify-center rounded-lg border border-border bg-accent">
              <img
                src={hero1}
                className="object-cover rounded-lg h-full w-full"
              />
            </div>
            <div className="absolute right-[12%] top-[20%] flex aspect-square w-1/5 justify-center rounded-lg border border-border bg-accent">
              <img
                src={hero2}
                className="object-cover rounded-lg h-full w-full"
              />
            </div>
            <div className="absolute bottom-[24%] right-[24%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent">
              <img
                src={hero3}
                className="object-cover rounded-lg h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
