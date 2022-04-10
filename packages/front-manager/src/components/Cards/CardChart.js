import React from "react";
import Chart from "chart.js";

export default function CardChart({backgroundColor, titleColor, title, subTitleColor, subTitle, identifier, config}) {
  React.useEffect(() => {
    const ctx = document.getElementById(identifier).getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [config, identifier]);
  return (
      <>
        <div
            className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${backgroundColor || "bg-white"}`}>
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className={`uppercase ${titleColor} mb-1 text-xs font-semibold`}>
                  {title}
                </h6>
                <h2 className={`${subTitleColor} text-xl font-semibold`}>
                  {subTitle}
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id={identifier}/>
            </div>
          </div>
        </div>
      </>
  );
}
