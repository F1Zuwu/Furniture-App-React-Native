import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { getServices, resolveMediaUrl, type Service } from "@/lib/api";

const fallbackImages: Record<string, any> = {
    lamp: require("@/assets/content/template_products/Lamp.png"),
    chair: require("@/assets/content/template_products/stand.png"),
    table: require("@/assets/content/template_products/stand.png"),
    sofa: require("@/assets/content/template_products/stand.png"),
    bed: require("@/assets/content/template_products/stand.png"),
    other: require("@/assets/content/template_products/stand.png"),
};

const ProductsList = () => {
    const [items, setItems] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const reload = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getServices();
            setItems(data);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        reload();
    }, []);

    const rows = useMemo(() => items ?? [], [items]);

    return (
        <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 16 }}>
            {loading ? (
                <View style={{ width: "100%", paddingVertical: 24, alignItems: "center" }}>
                    <ActivityIndicator />
                    <Text style={{ marginTop: 10, color: "#606060" }}>Loading...</Text>
                </View>
            ) : error ? (
                <View style={{ width: "100%", paddingVertical: 24, alignItems: "center", gap: 12 }}>
                    <Text style={{ color: "#606060", textAlign: "center" }}>{error}</Text>
                    <Pressable
                        onPress={reload}
                        style={{ backgroundColor: "#4F63AC", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 }}
                    >
                        <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Retry</Text>
                    </Pressable>
                </View>
            ) : rows.length === 0 ? (
                <View style={{ width: "100%", paddingVertical: 24, alignItems: "center" }}>
                    <Text style={{ color: "#606060" }}>No products yet</Text>
                </View>
            ) : (
                rows.map((item) => {
                    const firstUrl = resolveMediaUrl(item.images?.[0]?.url);
                    const priceText = Number.isFinite(item.price) ? `$${Number(item.price).toFixed(2)}` : "$0.00";

                    return (
                        <Pressable
                            key={item.id}
                            onPress={() =>
                                router.push({
                                    pathname: "/product/[id]" as any,
                                    params: { id: String(item.id) },
                                })
                            }
                            style={{ gap: 10, width: "47%" }}
                        >
                            {firstUrl ? (
                                <Image
                                    style={{ width: "100%", aspectRatio: 1, borderRadius: 14, backgroundColor: "#F5F5F5" }}
                                    source={{ uri: firstUrl }}
                                />
                            ) : (
                                <Image
                                    style={{ width: "100%", borderRadius: 14 }}
                                    source={fallbackImages[item.category ?? "other"]}
                                />
                            )}
                            <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "400", color: "#606060" }}>
                                {item.title}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: "700" }}>{priceText}</Text>
                        </Pressable>
                    );
                })
            )}
        </View>
    )
}

export default ProductsList;