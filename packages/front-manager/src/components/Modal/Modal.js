export default function Modal({button, buttonClass, modalClass, children}) {
    return (
        <>
            {button && <a href="#{my-modal-2}" className={"btn " + buttonClass}>{button}</a>}
            <div className="modal" id="my-modal-2">
                <div className={"modal-box " + modalClass}>
                    {children}
                </div>
            </div>
        </>
    );
}
