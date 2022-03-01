import React from "react";

export default function Input({type,name,register,placeHolder,error=null,label=null}){
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} {...register} className="input input-bordered" placeholder={placeHolder} name={name} />
            {
                error !== null && (
                    <span className="flex text-sm text-red-500">{error}*</span>
                )
            }
        </div>
    )
}