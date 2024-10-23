import MatchesGallery from "../MatchesGallery/MatchesGallery";

const Feature = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1 className="mb-6 text-pretty text-4xl font-semibold lg:text-5xl">
            Partidos Recientes
          </h1>

          <MatchesGallery />
        </div>
      </div>
    </section>
  );
};

export default Feature;
