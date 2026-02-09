import type { ComponentProps } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TextInputProps = ComponentProps<typeof TextInput>;

type Props = {
  label: string;
  containerGap?: number;
  minHeight?: number;
} & Pick<
  TextInputProps,
  | "placeholder"
  | "placeholderTextColor"
  | "value"
  | "onChangeText"
  | "autoCapitalize"
  | "autoCorrect"
  | "maxLength"
>;

export function LabeledTextArea({
  label,
  containerGap = 9,
  minHeight = 140,
  placeholder,
  placeholderTextColor = "#C5C5C5",
  value,
  onChangeText,
  autoCapitalize,
  autoCorrect,
  maxLength,
}: Props) {
  return (
    <View style={[styles.container, { gap: containerGap }]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline
        textAlignVertical="top"
        scrollEnabled={false}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        maxLength={maxLength}
        style={[styles.input, { minHeight }]}
      />
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
    borderWidth: 1,
    borderColor: "#8D9BB5",
    borderRadius: 14,
    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 14,
    fontFamily: "Montserrat",
    fontWeight: "500",
  },
});
