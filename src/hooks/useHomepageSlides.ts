import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Slide {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
  display_order: number;
}

export const useHomepageSlides = (type: "equipment" | "consumables") => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("homepage_slides")
          .select("id, image_url, title, subtitle, link_url, display_order")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        setSlides(data || []);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [type]);

  return { slides, loading };
};
