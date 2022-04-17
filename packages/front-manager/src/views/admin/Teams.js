import React from "react";
import {RiTeamLine} from "react-icons/ri";
import {AiOutlinePlusCircle} from "react-icons/ai";
import MainTab from "../../layouts/MainTab";
import ShowTeamMember from "../../components/Team/ShowTeamMember";
import CreateTeamMember from "../../components/Team/CreateTeamMember";

export default function Teams() {
    return (
        <>
            <MainTab libelleFirstTab={<>Mon équipe <RiTeamLine className={'inline-block'}/> </>}
                     libelleSecondtab={<>Créer un nouvel équipier <AiOutlinePlusCircle
                         className={'inline-block'}/></>}
                     firstContent={<ShowTeamMember/>}
                     secondContent={<CreateTeamMember/>}/>
        </>
    );
}
