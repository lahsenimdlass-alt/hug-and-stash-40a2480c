import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCategoryImage = (slug: string, type: "equipment" | "consumable") => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase
          .from("category_images")
          .select("image_url")
          .eq("category_slug", slug)
          .eq("category_type", type)
          .maybeSingle();

        if (error) throw error;
        setImageUrl(data?.image_url || null);
      } catch (error) {
        console.error("Error fetching category image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [slug, type]);

  return { imageUrl, loading };
};

export const useCategoryImages = (type: "equipment" | "consumable") => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from("category_images")
          .select("category_slug, image_url")
          .eq("category_type", type);

        if (error) throw error;
        
        const imageMap: Record<string, string> = {};
        data?.forEach(item => {
          imageMap[item.category_slug] = item.image_url;
        });
        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching category images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [type]);

  return { images, loading };
};
