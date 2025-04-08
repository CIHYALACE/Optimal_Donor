import Card1 from "./Card1"
import Card2 from "./Card2"

export default function TopicsSection() {
    const cardData = [ 
        {
            title: "Palistine _ Gaza",
            text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            imgSrc: "/palistine_card.jpg",
            action: "Donate Now",
        },
        {
            title: "Donoers Profile",
            text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            imgSrc: "/profile_card.jpg",
            action: "Learn More",
        },
        {
            title: "Helping debtors",
            text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            imgSrc: "/prison_card.jpg",
            action: "Donate Now",
        },
        {
            title: "Cancer patients",
            text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            imgSrc: "cancer_card.jpg",
            action: "Donate Now",
        },
        {
            title: "Pediatric surgeries",
            text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            imgSrc: "/children_card.jpg",
            action: "Donate Now",
        }
    ]// Array of card data
    return(
        <>
            <div className="container mb-5 mt-5 mt-md-0">
                <div className="row">
                    <h2 className="text-start">Featured Topics</h2>
                    <p className="text-start">Find your cause and start a campaign</p>
                </div>
                <div className="row d-flex justify-content-center align-items-center gap-0 flex-wrap">
                    <Card1 title={cardData[0].title} text={cardData[0].text} imgSrc={cardData[0].imgSrc} action={cardData[0].action} />
                    <Card2 title={cardData[1].title} text={cardData[1].text} imgSrc={cardData[1].imgSrc} action={cardData[1].action} />
                    <Card2 title={cardData[2].title} text={cardData[2].text} imgSrc={cardData[2].imgSrc} action={cardData[2].action} />
                    <Card2 title={cardData[3].title} text={cardData[3].text} imgSrc={cardData[3].imgSrc} action={cardData[3].action} />
                    <Card2 title={cardData[4].title} text={cardData[4].text} imgSrc={cardData[4].imgSrc} action={cardData[4].action} />
                </div>    
            </div>
        </>
    )
}