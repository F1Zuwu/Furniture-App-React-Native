import { Pressable, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      style={[styles.row, disabled && styles.rowDisabled]}
      hitSlop={8}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <Svg width={12} height={9} viewBox="0 0 12 9" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.17232 6.89991L10.9661 0L12 1.05004L4.17232 9L0 4.76251L1.03389 3.71247L4.17232 6.89991Z"
              fill="white"
            />
          </Svg>
        ) : null}
      </View>

      {label ? <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowDisabled: {
    opacity: 0.6,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#8D9BB5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  boxChecked: {
    borderColor: "#8D9BB5",
    backgroundColor: "#8D9BB5",
  },
  label: {
    color: "#4F63AC",
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "600",
  },
  labelDisabled: {
    color: "#4F63AC",
  },
});
