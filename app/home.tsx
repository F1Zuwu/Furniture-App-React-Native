import Titlebar from "@/components/Titlebar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView>
            <Titlebar Title="Find All You Need" search_shown={true}></Titlebar>
        </SafeAreaView>
    )
}