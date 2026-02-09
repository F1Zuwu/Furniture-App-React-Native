import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    type ViewStyle,
} from "react-native";

export type DropdownItem<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  placeholder?: string;
  items: DropdownItem<T>[];
  value?: T;
  onChange: (value: T) => void;
  containerStyle?: ViewStyle;
};

export default function Dropdown<T extends string>({
  label,
  placeholder = "Select...",
  items,
  value,
  onChange,
  containerStyle,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    if (!value) return undefined;
    return items.find((item) => item.value === value)?.label;
  }, [items, value]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={() => setOpen(true)} style={styles.input}>
        <Text style={[styles.valueText, !selectedLabel && styles.placeholderText]}>
          {selectedLabel ?? placeholder}
        </Text>
        <Image source={require("@/assets/icons/down.png")}></Image>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <Text style={styles.sheetTitle}>{label}</Text>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    style={styles.optionRow}
                  >
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {item.label}
                    </Text>
                    {isSelected ? <Text style={styles.check}>✓</Text> : null}
                  </Pressable>
                );
              }}
            />

            <Pressable onPress={() => setOpen(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 9,
  },
  label: {
    color: "#4F63AC",
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#8D9BB5",
    borderRadius: 14,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  valueText: {
    fontSize: 14,
    fontFamily: "Montserrat",
    fontWeight: "500",
    color: "#303030",
  },
  placeholderText: {
    color: "#C5C5C5",
  },
  chevron: {
    fontSize: 16,
    color: "#8D9BB5",
    marginLeft: 12,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 24,
    justifyContent: "center",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    maxHeight: "70%",
  },
  sheetTitle: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "700",
    color: "#303030",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#EEF1F6",
  },
  optionRow: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "500",
    color: "#303030",
  },
  optionTextSelected: {
    color: "#4F63AC",
    fontWeight: "700",
  },
  check: {
    fontSize: 16,
    color: "#4F63AC",
    fontWeight: "900",
  },
  cancelBtn: {
    marginTop: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3F5FA",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "700",
    color: "#4F63AC",
  },
});
