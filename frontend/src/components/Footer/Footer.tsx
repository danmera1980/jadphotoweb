import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                className="w-8"
                alt="logo"
              />
              <span className="text-xl font-bold">JAD Photos</span>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="text-lg font-medium">
                Cada jugada, un recuerdo eterno.
              </p>
            </div>
          </div>
          <Separator className="my-14" />
          <p className="text-sm text-muted-foreground">
            © 2024 Danmera. Derechos Reservados.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
