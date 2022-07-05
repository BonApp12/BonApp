import React from "react"


export const Asker = ({ needSomething }) => {
    return (
        <div className="float-left fixed z-10 right-1">
            <div className="flex items-center -space-x-12 hover:space-x-1 -mt-44">
                <button
                    className="z-10 block rounded-full border-2 border-white bg-green-100 p-4 text-green-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
                    type="button"
                    onClick={() => needSomething("BREAD")}>🥖
                </button>
                <button
                    className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                    type="button"
                    onClick={() => needSomething("WATER")}>💧
                </button>
                <button
                    className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                    type="button"
                    onClick={() => needSomething("HELP")}>🙋‍
                </button>
                <button
                    className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                    type="button">🚨
                </button>
            </div>
        </div>
    )
}