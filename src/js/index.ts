import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IRecord {
    id: number;
    Artist: string;
    Title: string;
    Duration: number;
    YearOfProduction: string;
}

let baseUri:string = "";
let contentOfAllRecords : HTMLDivElement = <HTMLDivElement>document.getElementById("allRecords");

axios.get<IRecord[]>(baseUri)
        .then(function (response: AxiosResponse<IRecord[]>): void {
            let result: string = "<ul id='recordList'>";
            response.data.forEach((record: IRecord) => {
                result += "<li>" + car.id + " " + car.model + " " + car.vendor + "<br>Pris: " + car.price + "</li><br>";
            });
            result += "</ul>";
            contentOfAllRecords.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                outputElement.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                outputElement.innerHTML = error.message;
            }
        });


function greeter(person: Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user: Person = { firstName: "John", lastName: "Doe" };

let element: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
element.innerHTML = greeter(user);