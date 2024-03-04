import { ChangeEvent } from "react";


interface InputTypes {
    label: string,
    placeholder: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void;
}

const InputBox = ({label, placeholder,type, onChange}: InputTypes) => {
  return (
    <div className="px-2 py-2 w-[360px]">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input type={type} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
  )
}

export default InputBox
