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

// Add record button
let addRecordButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("addRecord");
addRecordButton.addEventListener("click", addRecord);

// Delete record button
let deleteRecordButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
deleteRecordButton.addEventListener("click", deleteRecord);

// FILTER
let filterRecordButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButton");
filterRecordButton.addEventListener("click", filterRecords);

(()=> {

    showAllRecords();

})();


function showAllRecords(): void {
axios.get<IRecord[]>(baseUri)
        .then(function (response: AxiosResponse<IRecord[]>): void {
            response.data.forEach((record: IRecord) => {
            
            let result: string = "";
            
            var node = document.createElement("DIV");
            contentOfAllRecords.appendChild(node);
            node.setAttribute("class", "panel panel-default");
            var childElement = document.createElement("DIV");
            node.appendChild(childElement);
            childElement.setAttribute("class", "panel-body");

            result += "<br>" + record.id + " <br>Artist: " + record.artist + "<br> Title: " + record.title + "<br> Duration: " + record.duration + " <br>Production Year: " + record.yearOfPublication + "<br>";
            
            childElement.innerHTML = result;
            });
            
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                contentOfAllRecords.innerHTML = error.message;

            } else { // something went wrong in the .then block?
                contentOfAllRecords.innerHTML = error.message;
            }
        });
        
    }



    function addRecord(): void {
        let addArtistElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addArtist");
        let addTitleElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addTitle");
        let addYearElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addYear");
        let addDurationElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addDuration");

        let divResponse: HTMLDivElement = <HTMLDivElement>document.getElementById("postResponse");
        
        axios.post<IRecord>(baseUri, { artist: addArtistElement.value, title: addTitleElement.value, duration: addDurationElement.value, yearOfPublication: addYearElement.value})
            .then((response: AxiosResponse) => {
                let message: string = "Record added";
                divResponse.innerHTML = message;
                addArtistElement.value = "";
                addTitleElement.value = "";
                addYearElement.value = "";
                addDurationElement.value = "";
                showAllRecords();
            })
            .catch((error: AxiosError) => {
                divResponse.innerHTML = error.message;
            });
    }

    function deleteRecord(): void {
        let divResponse: HTMLDivElement = <HTMLDivElement>document.getElementById("deleteResponse");
        let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
        
        let uri: string = baseUri + "/" + inputElement.value;
        axios.delete<IRecord>(uri)
            .then(function (response: AxiosResponse<IRecord>): void {
                

                let message: string = "Record deleted";
                divResponse.innerHTML = message;
                inputElement.value = "";
                showAllRecords();
            })
            .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
                if (error.response) { 
                    divResponse.innerHTML = error.message;
                } else { // something went wrong in the .then block?
                    divResponse.innerHTML = error.message;
                }
            });
    }


    function filterRecords(): void {

        // GET INFO FROM INPUT ELEMENT
        let inputFilterElement: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
    
        let uri: string = baseUri + "/" + "Item?artist=" + inputFilterElement.value + "&title=" + inputFilterElement.value +  "&yearOfPublication=" +  inputFilterElement.value;
        
        let result: string = "<ul>";

        if (inputFilterElement.value == "") 
        {
         showAllRecords();   
        }
        else{
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
    }
