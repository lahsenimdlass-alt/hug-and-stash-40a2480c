import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingCart, TrendingUp, Percent } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activePromotions: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activePromotions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products count
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // Fetch orders count and total revenue
        const { data: orders } = await supabase
          .from("orders")
          .select("total_amount");

        const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

        // Fetch active promotions count
        const today = new Date().toISOString().split('T')[0];
        const { count: promotionsCount } = await supabase
          .from("promotions")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true)
          .lte("start_date", today)
          .gte("end_date", today);

        setStats({
          totalProducts: productsCount || 0,
          totalOrders: orders?.length || 0,
          totalRevenue,
          activePromotions: promotionsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Produits",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Commandes",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Chiffre d'affaires",
      value: `${stats.totalRevenue.toFixed(2)} MAD`,
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Promotions actives",
      value: stats.activePromotions,
      icon: Percent,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dernières commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Aucune commande pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Aucun produit pour le moment
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;