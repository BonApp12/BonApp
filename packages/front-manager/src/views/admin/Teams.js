import React from "react";
import ShowTeamMember from "../../components/Team/ShowTeamMember";
import CreateTeamMember from "../../components/Team/CreateTeamMember";
import {RiTeamLine} from "react-icons/ri";
import {AiOutlinePlusCircle} from "react-icons/ai";

export default function Teams() {
    const [showtab, setShowtab] = React.useState(1);
    return (
        <>
            <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="tabs">
                    <a className={`tab tab-bordered ${showtab === 1 ? "tab-active" : ""}`}
                       onClick={() => setShowtab(1)}>
                        Mon équipe <RiTeamLine/>
                    </a>
                    <a className={`tab tab-bordered ${showtab === 2 ? "tab-active" : ""}`}
                       onClick={() => setShowtab(2)}>
                        Créer un nouvel équipier <AiOutlinePlusCircle/>
                    </a>
                </div>
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            {showtab === 1 ? "Mon équipe" : "Créer un nouvel équipier"}
                        </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {showtab === 1 && <ShowTeamMember/>}
                    {showtab === 2 && <CreateTeamMember/>}
                </div>
            </div>
        </>
    );
}
