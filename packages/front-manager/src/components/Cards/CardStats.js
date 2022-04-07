import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statTitle,
  statValue,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statTitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statValue}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statTitle: "",
  statValue: "",
  statIconName: "",
  statIconColor: "",
};

CardStats.propTypes = {
  statTitle: PropTypes.string,
  statValue: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
};
