import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  category_type: "equipment" | "consumable";
  icon_url: string | null;
  display_order: number;
  is_active: boolean;
}

export const useCategories = (categoryType?: "equipment" | "consumable") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (categoryType) {
        query = query.eq("category_type", categoryType);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
        return;
      }

      setCategories((data || []) as Category[]);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryType]);

  return { categories, loading, error, refetch: fetchCategories };
};

export const useAllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
        return;
      }

      setCategories((data || []) as Category[]);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};
