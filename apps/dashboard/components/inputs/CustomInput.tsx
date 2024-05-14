/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  value: string | number;
  setValue: any;
  type?: string;
  placeholder: string;
};

const CustomInput = ({ value, setValue, placeholder, type }: Props) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={setValue}
        className="border border-slate-300/50 backdrop-blur-xl rounded-lg p-2 outline-none text-sm"
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomInput;
