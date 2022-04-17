import React from "react";

export default function Input({label, type, name, error, placeHolder, register}){
    return (
        <>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-5"
                    htmlFor="grid-password"
                >
                    {label}
                </label>
                <input
                    {...register}
                    type={type}
                    name={name}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm
                      shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={placeHolder}
                />
            </div>
            {error && <p className="text-red-600 text-xs italic">{error.message}</p>}
        </>
    )
}