import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Armchair, Syringe } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Dental equipment images: chairs, units, x-ray machines
const equipmentImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800",
  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800",
];

// Dental consumables images: instruments, materials
const consumableImages = [
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800",
  "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800",
  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=800",
];

interface HeroCategoryProps {
  type: "equipment" | "consumables";
}

const HeroCategory = ({ type }: HeroCategoryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isEquipment = type === "equipment";
  const images = isEquipment ? equipmentImages : consumableImages;
  const title = isEquipment ? "Équipements Dentaires" : "Consommables Dentaires";
  const link = isEquipment ? "/catalogue?category=equipements_dentaires" : "/catalogue?category=consommables";
  const Icon = isEquipment ? Armchair : Syringe;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Embla carousel for mobile with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Sync embla index with currentIndex
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Desktop hover carousel
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMobile) return;
    
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length, isMobile]);

  return (
    <Link
      to={link}
      className="relative flex-1 min-h-[300px] md:min-h-[500px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {isMobile ? (
          // Mobile: Embla Carousel with swipe
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 h-full relative"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop: Fade transition on hover
          images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60 group-hover:bg-foreground/50 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-10 w-10 md:h-16 md:w-16 text-primary-foreground" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground tracking-tight mb-3 md:mb-4">
          {title}
        </h2>

        {/* CTA */}
        <span className="inline-flex items-center text-primary-foreground/80 text-sm md:text-base font-medium group-hover:text-primary-foreground transition-colors">
          Découvrir la collection
          <svg
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 md:bottom-6 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                if (isMobile && emblaApi) {
                  emblaApi.scrollTo(index);
                } else {
                  setCurrentIndex(index);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary-foreground w-6" 
                  : "bg-primary-foreground/40 w-2 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default HeroCategory;