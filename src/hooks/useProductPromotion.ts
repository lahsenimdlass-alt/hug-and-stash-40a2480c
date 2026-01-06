import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProductPromotion {
  discountPercentage: number;
  discountedPrice: number;
  originalPrice: number;
  promotionTitle: string;
}

export const useProductPromotion = (productId: string, originalPrice: number) => {
  const [promotion, setPromotion] = useState<ProductPromotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotion = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const today = new Date().toISOString().split("T")[0];

        // Get active promotions for this product
        const { data, error } = await supabase
          .from("promotion_products")
          .select(`
            promotion_id,
            promotions (
              id,
              title,
              discount_percentage,
              start_date,
              end_date,
              is_active
            )
          `)
          .eq("product_id", productId);

        if (error) {
          console.error("Error fetching promotion:", error);
          setLoading(false);
          return;
        }

        // Find active promotion
        const activePromo = data?.find((pp: any) => {
          const promo = pp.promotions;
          return (
            promo &&
            promo.is_active &&
            promo.start_date <= today &&
            promo.end_date >= today
          );
        });

        if (activePromo?.promotions) {
          const promo = activePromo.promotions as any;
          const discountedPrice = originalPrice * (1 - promo.discount_percentage / 100);
          setPromotion({
            discountPercentage: promo.discount_percentage,
            discountedPrice,
            originalPrice,
            promotionTitle: promo.title,
          });
        } else {
          setPromotion(null);
        }
      } catch (error) {
        console.error("Error fetching promotion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [productId, originalPrice]);

  return { promotion, loading };
};

export const useProductsPromotions = (productIds: string[]) => {
  const [promotions, setPromotions] = useState<Record<string, { discountPercentage: number; promotionTitle: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      if (productIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
          .from("promotion_products")
          .select(`
            product_id,
            promotions (
              id,
              title,
              discount_percentage,
              start_date,
              end_date,
              is_active
            )
          `)
          .in("product_id", productIds);

        if (error) {
          console.error("Error fetching promotions:", error);
          setLoading(false);
          return;
        }

        const promoMap: Record<string, { discountPercentage: number; promotionTitle: string }> = {};

        data?.forEach((pp: any) => {
          const promo = pp.promotions;
          if (
            promo &&
            promo.is_active &&
            promo.start_date <= today &&
            promo.end_date >= today
          ) {
            // Only keep the best discount if multiple promos exist
            if (!promoMap[pp.product_id] || promoMap[pp.product_id].discountPercentage < promo.discount_percentage) {
              promoMap[pp.product_id] = {
                discountPercentage: promo.discount_percentage,
                promotionTitle: promo.title,
              };
            }
          }
        });

        setPromotions(promoMap);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [productIds.join(",")]);

  return { promotions, loading };
};
