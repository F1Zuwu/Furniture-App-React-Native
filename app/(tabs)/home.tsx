import Tags from "@/components/Tags";
import Titlebar from "@/components/Titlebar";
import ProductsList from "@/components/UI/ProductsList";
import TabNavbar from "@/components/UI/TabNavbar";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 24 + 75 }}
                showsVerticalScrollIndicator={false}
            >
                <Titlebar Title="Find All You Need" search_shown={true}></Titlebar>
                <Tags></Tags>
                <ProductsList></ProductsList>
            </ScrollView>

            <TabNavbar></TabNavbar>
        </SafeAreaView>
    )
}