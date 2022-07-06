import React from "react";

export default function MainTab({libelleFirstTab, libelleSecondtab, firstContent, secondContent}) {

    const [showtab, setShowtab] = React.useState(1);
    return (
        <>
            <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="tabs">
                    <a className={`tab text-black tab-bordered ${showtab === 1 ? "tab-active bg-primary text-white rounded-tl-lg text-black font-semibold" : ""}`}
                       onClick={() => setShowtab(1)}>
                        {libelleFirstTab}
                    </a>
                    <a className={`tab text-black tab-bordered ${showtab === 2 ? "tab-active bg-primary text-white rounded-tr-lg text-black font-semibold" : ""}`}
                       onClick={() => setShowtab(2)}>
                        {libelleSecondtab}
                    </a>
                </div>
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            {showtab === 1 ? libelleFirstTab : libelleSecondtab}
                        </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {showtab === 1 && firstContent}
                    {showtab === 2 && secondContent}
                </div>
            </div>
        </>
    );
}
