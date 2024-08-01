export const setImgBook = (data) => {
    
    if (!data || !data.subject || !data.subject[1]) return "default.png";

    let subject = data.subject[1].name;
    let url= "";


    switch (subject) {
        case "Anglais" :
            url ="ang.png"
            break;

        case "Mathématique" :
            url ="math.png"
            break;

        case "Français" :
            url ="fr.jpeg"
            break;

        case "Physique-Chimie" :
            url ="phy-chi.png"
            break;

        case "Sciences" :
        case "Sciences de la vie et de la Terre" :
            url ="svt.png"
            break;

        case "Histoire-Géographie-EMC" :
            url ="hg.png"
            break;
        
        case "Espagnol" :
            url ="esp.png"
            break;
        
        default :
            url ="lesmiserables.png"

            
    }

    return url;
}