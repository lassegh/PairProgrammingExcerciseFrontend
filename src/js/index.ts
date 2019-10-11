import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IRecord {
    id: number;
    artist: string;
    title: string;
    duration: number;
    yearOfPublication: string;
}

let baseUri: string = "http://pairprogrammingrest.azurewebsites.net/api/Records";

let contentOfAllRecords : HTMLDivElement = <HTMLDivElement>document.getElementById("allRecords");

// FILTER
let buttonFilterElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButton");
buttonFilterElement.addEventListener("click", filterRecords);


(()=> {
axios.get<IRecord[]>(baseUri)
        .then(function (response: AxiosResponse<IRecord[]>): void {
            let result: string = "";
            response.data.forEach((record: IRecord) => {
                result += "<li>" + record.id + " <br>Artist: " + record.artist + "<br> Title: " + record.title + "<br> Duration: " + record.duration + " <br>Production Year: " + record.yearOfPublication + "</li><br>";
                
            });
            contentOfAllRecords.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                contentOfAllRecords.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                contentOfAllRecords.innerHTML = error.message;
            }
        });
        
    })();

    function filterRecords(): void {

        // GET INFO FROM INPUT ELEMENT
        let inputFilterElement: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
    
        let uri: string = baseUri + "/" + "Item?artist=" + inputFilterElement.value + "&title=" + inputFilterElement.value +  "&yearOfPublication=" +  inputFilterElement.value;
        
        let result: string = "<ul>";
        axios.get<IRecord[]>(uri)
            .then(function (response: AxiosResponse<IRecord[]>): void {
                response.data.forEach((record: IRecord) => { // foreach car in list lav et listItem med propertys vendor, model og price
                    result += "<li>" + record.id + " <br>Artist: " + record.artist + "<br> Title: " + record.title + "<br> Duration: " + record.duration + " <br>Production Year: " + record.yearOfPublication + "</li><br>";
                });
                result += "</ul>";
                contentOfAllRecords.innerHTML = result;  
            })
            .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
    
                contentOfAllRecords.innerHTML = "Error: " + error.message+" " + uri;
            });
    }
