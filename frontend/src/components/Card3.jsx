export default function Card3({name, icon}) {
    return (
        <>
            <div className="col-2 text-center d-flex flex-column align-items-center">
                <a href="#" className="icon text-dark fs-3 p-2 p-md-5 catigory-card rounded"><i className={icon}></i></a>
                <p className="text-center">{name}</p>
            </div>
        </>
    )
}
