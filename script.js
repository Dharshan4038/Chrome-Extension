const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
let myLeads = [];
let oldLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");


if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


tabBtn.addEventListener("click",function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        console.log("save tab");
    });
});

function render(leads) {
    let listItems = " ";
    for(let i=0;i<leads.length;i++)
    {
        listItems += 
        `<li>
            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click",function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})


