import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Slide {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
  display_order: number;
  category_type: string | null;
}

export const useHomepageSlides = (categoryType?: "equipment" | "consumable" | null) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        let query = supabase
          .from("homepage_slides")
          .select("id, image_url, title, subtitle, link_url, display_order, category_type")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        // Filter by category_type if provided
        if (categoryType === "equipment") {
          query = query.eq("category_type", "equipements");
        } else if (categoryType === "consumable") {
          query = query.eq("category_type", "consommables");
        }

        const { data, error } = await query;

        if (error) throw error;
        setSlides(data || []);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [categoryType]);

  return { slides, loading };
};
