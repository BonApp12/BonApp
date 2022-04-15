export default function ({confirmCallBack, cancelCallBack, message}) {
    return (
        <>
            <div>
                <div>
                    <span className="text-sm flex">
                        {message}
                    </span>
                </div>
                <div className="flex">
                    <button className="btn btn-xs btn-outline btn-info mr-3" onClick={confirmCallBack}>
                        Confirmer
                    </button>
                    <button className="btn btn-xs btn-outline btn-error" onClick={cancelCallBack}>
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
}
