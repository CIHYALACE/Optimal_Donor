export default function Card3({name, icon, id}) {
    return (
        <div className="col-2 text-center d-flex flex-column align-items-center">
            <a 
                href={id} 
                className="icon text-dark fs-3 p-2 p-md-5 catigory-card rounded"
                onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id.substring(1));
                    element?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <i className={icon}></i>
            </a>
            <p className="text-center">{name}</p>
        </div>
    );
}