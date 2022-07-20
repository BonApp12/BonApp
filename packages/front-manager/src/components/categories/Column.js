import {PlateItem} from "../PlateItem/PlateItem";
import {ImgIcon} from "../imgIcon/ImgIcon";
import {Draggable, Droppable} from "react-beautiful-dnd";

export const Column = ({titleColumn, columnId, plates, icon}) => {
    return (

        <Droppable droppableId={"" + columnId + ""}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    className="column-wrapper"
                    ref={provided.innerRef}
                >


                    <section className="">
                        <section className="title-category">
                            <h5>
                                <ImgIcon icon={icon}/> {titleColumn}
                            </h5>
                        </section>
                        <section className="category-drop">
                            {plates?.map((plate, index) => {
                                return (
                                    columnId === "mes-plats" ?
                                        <Draggable key={plate.id} draggableId={"" + plate.id + ""} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <PlateItem plate={plate}/>
                                                </div>
                                            )}
                                        </Draggable> : <PlateItem key={index} plate={plate}/>
                                );
                            })}
                        </section>
                    </section>
                </div>
            )}
        </Droppable>
    );
};
