import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";

export default function ComboBox({
  data = [],
  value,
  onChange,
  placeholder = "Select…",
  fields = { text: "label", value: "value" },
  enabled = true,
  ...rest
}) {
  return (
    <ComboBoxComponent
      dataSource={data}
      fields={fields}
      value={value ?? null}
      change={(e) => {
        // ✅ Correctly pass selected value to parent
        onChange?.(e.itemData?.value ?? null);
      }}
      placeholder={placeholder}
      popupHeight="240px"
      cssClass="w-full ct-sf"
      showClearButton={true}
      allowFiltering={true}
      allowCustom={false} 
      enabled={enabled}
      {...rest}
    />
  );
}
