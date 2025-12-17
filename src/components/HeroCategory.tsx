import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeroCategoryProps {
  type: "equipment" | "consumables";
}

const HeroCategory = ({ type }: HeroCategoryProps) => {
  const content = {
    equipment: {
      title: "Équipements Médicaux",
      subtitle: "Matériel professionnel certifié CE",
      description: "Découvrez notre gamme complète d'équipements médicaux de haute qualité",
      link: "/equipements",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200",
    },
    consumables: {
      title: "Consommables",
      subtitle: "Fournitures médicales essentielles",
      description: "Large sélection de consommables pour tous vos besoins quotidiens",
      link: "/catalogue?category=consommables",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1200",
    },
  };

  const data = content[type];

  return (
    <Link
      to={data.link}
      className="relative flex-1 min-h-[50vh] md:min-h-[70vh] overflow-hidden group"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
        <span className="text-sm uppercase tracking-widest text-white/70 mb-3">
          {data.subtitle}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          {data.title}
        </h2>
        <p className="text-white/80 max-w-md mb-6 text-sm md:text-base">
          {data.description}
        </p>
        <div className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
          Explorer
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
};

export default HeroCategory;
