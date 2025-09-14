import { labelCls, errCls, baseField } from "../../components/formcomponents/errorhandling";
function Input(props) {
    return <input {...props} className={`${baseField} ${props.className || ""}`} />;
}
function Field({ label, error, children }) {
    return (
        <div>
            <label className={labelCls}>{label}</label>
            {children}
            {error ? <div className={errCls}>{error}</div> : null}
        </div>
    );
}
export { Input, Field };