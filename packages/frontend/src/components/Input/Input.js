import React from "react";

export default function Input({type,name,register,placeHolder,error=null,label=null}){
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                {...register}
                type={type}
                className="input input-bordered"
                placeholder={placeHolder}
                name={name}
                autoComplete={"off"}
            />
            {
                error !== null && (
                    <span className="mt-1 text-left text-sm text-red-500">{error}*</span>
                )
            }
        </div>
    )
}
