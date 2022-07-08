import React from "react";

export default function Input({label, type, name, error, placeHolder, register}){
    return (
        <div className="relative mt-1">
            <label htmlFor={name} className="text-sm font-medium">{label}</label>
            <div className="mt-2">
                <input
                    {...register}
                    type={type}
                    name={name}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder={placeHolder}
                />
                {error && <p className="text-red-600 text-xs italic mt-2">{error.message}</p>}
            </div>
        </div>
    )
}