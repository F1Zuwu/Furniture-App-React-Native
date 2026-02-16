import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getServiceById, resolveMediaUrl, type Service } from "@/lib/api";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const Product = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
        const [item, setItem] = useState<Service | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [carouselWidth, setCarouselWidth] = useState<number>(0);
        const [activeIndex, setActiveIndex] = useState<number>(0);
        const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

        useEffect(() => {
                let mounted = true;
                (async () => {
                        if (!id) return;
                        setLoading(true);
                        setError(null);
                        try {
                                const data = await getServiceById(id);
                                if (mounted) setItem(data);
                        } catch (e: any) {
                                if (mounted) setError(e?.message ?? "Failed to load");
                        } finally {
                                if (mounted) setLoading(false);
                        }
                })();
                return () => {
                        mounted = false;
                };
        }, [id]);

        const imageUrls = useMemo(() => {
            const urls = (item?.images ?? [])
                .map((img) => resolveMediaUrl(img.url))
                .filter((u) => typeof u === "string" && u.length > 0);
            return urls;
        }, [item]);

        useEffect(() => {
            if (!carouselWidth || imageUrls.length === 0) return;

            let cancelled = false;
            for (const url of imageUrls) {
                if (imageHeights[url]) continue;

                Image.getSize(
                    url,
                    (w, h) => {
                        if (cancelled) return;
                        if (!w || !h) return;
                        const computed = clamp((carouselWidth * h) / w, 240, 520);
                        setImageHeights((prev) => ({ ...prev, [url]: computed }));
                    },
                    () => {
                        // ignore failures; fall back to default height
                    }
                );
            }

            return () => {
                cancelled = true;
            };
        }, [carouselWidth, imageUrls, imageHeights]);

        const dotCount = Math.max(1, imageUrls.length);
        const carouselHeight = useMemo(() => {
            const defaultHeight = 441;
            const activeUrl = imageUrls[activeIndex];
            if (!activeUrl) return defaultHeight;
            return imageHeights[activeUrl] ?? defaultHeight;
        }, [activeIndex, imageHeights, imageUrls]);
        const priceText = useMemo(() => {
                if (!item) return "$ 0";
                return `$ ${Number(item.price).toFixed(0)}`;
        }, [item]);

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF"}}>
            <View>
                <View
                    onLayout={(e) => setCarouselWidth(e.nativeEvent.layout.width)}
                    style={{ height: carouselHeight, width: "100%" }}
                >
                    {loading ? (
                        <View style={{ height: carouselHeight, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator />
                        </View>
                    ) : error ? (
                        <View style={{ height: carouselHeight, width: "100%", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
                            <Text style={{ color: "#606060", textAlign: "center" }}>{error}</Text>
                        </View>
                    ) : imageUrls.length > 0 ? (
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={(e) => {
                                const w = carouselWidth || 1;
                                const idx = Math.round(e.nativeEvent.contentOffset.x / w);
                                if (Number.isFinite(idx)) setActiveIndex(idx);
                            }}
                            scrollEventThrottle={16}
                        >
                            {imageUrls.map((u, idx) => (
                                <Image
                                    key={`${u}-${idx}`}
                                    style={{ height: imageHeights[u] ?? carouselHeight, width: carouselWidth || undefined }}
                                    resizeMode="cover"
                                    source={{ uri: u }}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Image
                            style={{ height: carouselHeight, width: "100%" }}
                            resizeMode="cover"
                            source={require("@/assets/content/template_products/stand_big.png")}
                        />
                    )}

                    {/* Dots */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 32,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            flexDirection: "row",
                        }}
                    >
                        {Array.from({ length: dotCount }).map((_, i) => (
                            <View
                                key={i}
                                style={{
                                    height: 4,
                                    width: i === activeIndex ? 30 : 15,
                                    backgroundColor: i === activeIndex ? "#303030" : "#F0F0F0",
                                    borderRadius: 4,
                                }}
                            />
                        ))}
                    </View>
                </View>
            </View>

            <SafeAreaView style={{position:"absolute", top:0, left: 14}}>
                <Pressable onPress={() => router.back()} style={{width: 40, height: 40, backgroundColor: "#FFFFFF", borderRadius: 6, justifyContent: "center", alignItems: "center", margin: 16, boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)"}}>
                    <Image style={{ width: 20, height: 20 }} source={require("@/assets/icons/back.png")}></Image>
                </Pressable>
            </SafeAreaView>

            <View style={{borderRadius: 14, width: "100%", height: 34 , backgroundColor: "#FFFFFF", transform: [{ translateY: -20 }]}}></View>
            <View style={{padding: 24}}>
                <Text style={{fontSize: 24, marginBottom: 18, fontFamily: "Gelasio", fontWeight: "500"}}>{item?.title ?? ""}</Text>
                <Text style={{fontSize: 30, marginBottom: 24, fontWeight: "700"}}>{priceText}</Text>
                <Text style={{fontSize: 14, fontWeight: "300"}}>{item?.description ?? ""}</Text>
            </View>

            <View style={{flexDirection: "row", alignItems:"center", paddingHorizontal: 25, position: "absolute", bottom: 30, width: "100%", justifyContent: "space-between"}}>
                <Pressable style={{borderRadius: 8, backgroundColor: "#F0F0F0", width: 60, height: 60, justifyContent: "center", alignItems: "center", marginRight: 16}}>
                    <Image style={{width: 28, height: 28}} source={require("@/assets/icons/TabNavbar/favorites.png")}></Image>
                </Pressable>
                <Pressable style={{backgroundColor: "#4F63AC", paddingVertical: 18, borderRadius: 8, height: 60, width: "80%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#FFFFFF", fontWeight: "700"}}>Contact seller</Text>
                </Pressable>
            </View>

        </View>
    )
}
export default Product;