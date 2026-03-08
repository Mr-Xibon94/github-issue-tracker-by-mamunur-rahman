// calling all buttons is 
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");

let issuesArr = [];

// all cards sectin 
const displayCard = document.getElementById("displayCard");

// total issues section 
const totalIssues = document.getElementById("totalIssues");

function issuesNumber(totalIssue) {
    totalIssues.innerText = totalIssue;

}
// fetching all issues from Server 
async function allIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ");
    const data = await res.json();
    displayAllCards(data.data);

    btnAll.click()

}

function displayAllCards(issues) {


}

function displayAllCards(issues) {

    // its btnAll 
    btnAll.addEventListener('click', () => {
        btnOpen.classList.remove("btnColor")
        btnClosed.classList.remove("btnColor")
        
        btnAll.classList.add("btnColor")
        btnOpen.classList.add("textColor")
        btnClosed.classList.add("textColor")

        const totalIs = issues.length;
        issuesNumber(totalIs)

        displayCard.innerHTML = "";

        issues.forEach((issue) => {
            const divCard = document.createElement("div")
            divCard.className = `p-6 shadow-md rounded-xl border-t-3 ${issue.status === "open"? "border-t-green-600" : "border-t-[#A855F7]"}  `;

            divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/${issue.status == "open"? "Open-Status.png":"Closed- Status .png"}" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "high"?"bg-red-200" : issue.priority == "medium"? " bg-yellow-200" : "bg-gray-200"} rounded-xl">
                                <p class="${issue.priority == "high"? "text-red-400" : issue.priority =="medium"?  " text-yellow-500" : "text-gray-500"} text-xs font-semibold">${issue.priority=="high"?"HIGH":issue.priority=="medium"?"MEDIUM":"LOW"}</p>
                             </div>
                        </div>
        
                        <!-- here is card header  -->
                         <div class="space-y-3">
                            <h2 class="text-sm font-medium">
                               ${issue.title}
                            </h2>
        
                            <p class="line-clamp-2 text-xs text-[#64748B]">${issue.description}</p>
                         </div>
        
                         <!-- BUG & HELP WANTED Section  -->
                          <div class="flex flex-col gap-2 lg:flex-row lg:justify-between mt-6 mb-6">
                            <!-- bug logo/sign  -->
                             <div class="logo-2 py-1 px-3 bg-red-200 rounded-xl">
                                <p class="text-red-400 text-xs font-semibold"><i class="fa-solid fa-bug"></i> BUG</p>
                             </div>
        
                             <!-- help wanted logo/sign  -->
                              <div class="logo-2 py-1 px-3 bg-yellow-100 rounded-xl">
                                <p class="text-yellow-500 text-xs font-semibold">HELP WANTED</p>
                             </div>
                          </div>
        
                          <!-- LINE BREAK  -->
                           <hr class="opacity-15 shadow-sm mb-6">
        
                           <!-- POSTED BY NAME & DATE  -->
                            <div class="space-y-2">
                                <p class="text-[12px] text-[#64748B]"><span>#${issue.id}</span> by ${issue.author}</p>
                                <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                            </div>
                `;
            displayCard.appendChild(divCard)
        })
    })
    // Its btnOpen 
    btnOpen.addEventListener('click', () => {
        
        displayCard.innerHTML = " ";
        
        let countIssue = 0;
        
        btnAll.classList.remove("btnColor")
        btnClosed.classList.remove("btnColor")
        
        btnOpen.classList.add("btnColor")
        btnAll.classList.add("textColor")
        btnClosed.classList.add("textColor")
        
        issues.forEach((issue)=>{
            if (issue.status == "open") {

            countIssue ++;

            const divCard = document.createElement("div")
            divCard.className = "p-6 shadow-md rounded-xl border-t-2 border-t-green-600"

            // console.log(issue);
            divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/Open-Status.png" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "high"? "bg-red-200" :  " bg-yellow-200"} rounded-xl">
                                <p class="${issue.priority == "high"? "text-red-400" :  " text-yellow-500"} text-xs font-semibold">${issue.priority == "high"? "HIGH": "MEDIUM"}</p>
                             </div>
                        </div>
        
                        <!-- here is card header  -->
                         <div class="space-y-3">
                            <h2 class="text-sm font-medium">
                               ${issue.title}
                            </h2>
        
                            <p class="line-clamp-2 text-xs text-[#64748B]">${issue.description}</p>
                         </div>
        
                         <!-- BUG & HELP WANTED Section  -->
                          <div class="flex flex-col gap-2 lg:flex-row lg:justify-between mt-6 mb-6">
                            <!-- bug logo/sign  -->
                             <div class="logo-2 py-1 px-3 bg-red-200 rounded-xl">
                                <p class="text-red-400 text-xs font-semibold"><i class="fa-solid fa-bug"></i> BUG</p>
                             </div>
        
                             <!-- help wanted logo/sign  -->
                              <div class="logo-2 py-1 px-3 bg-yellow-100 rounded-xl">
                                <p class="text-yellow-500 text-xs font-semibold">HELP WANTED</p>
                             </div>
                          </div>
        
                          <!-- LINE BREAK  -->
                           <hr class="opacity-15 shadow-sm mb-6">
        
                           <!-- POSTED BY NAME & DATE  -->
                            <div class="space-y-2">
                                <p class="text-[12px] text-[#64748B]"><span>#${issue.id}</span> by ${issue.author}</p>
                                <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                            </div>
                `;
                    displayCard.appendChild(divCard)
        }
        })
        

        issuesNumber(countIssue);
    })

    // its btnClosed 
    btnClosed.addEventListener('click', () => {
        
        displayCard.innerHTML = " ";
        
        let countIssue = 0;
        
        btnAll.classList.remove("btnColor")
        btnOpen.classList.remove("btnColor")
        
        btnClosed.classList.add("btnColor")
        btnAll.classList.add("textColor")
        btnOpen.classList.add("textColor")
        
        issues.forEach((issue)=>{
            if (issue.status == "closed") {

            countIssue ++;

            const divCard = document.createElement("div")
            divCard.className = "p-6 shadow-md rounded-xl border-t-3 border-[#A855F7] "

            // console.log(issue);
            divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/Closed- Status .png" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "medium"? "bg-yellow-200" : "bg-gray-200"} rounded-xl">
                                <p class="${issue.priority == "medium"? " text-yellow-500" :  "text-gray-500"} text-xs font-semibold">${issue.priority == "medium"? "MEDIUM":"LOW"}</p>
                             </div>
                        </div>
        
                        <!-- here is card header  -->
                         <div class="space-y-3">
                            <h2 class="text-sm font-medium">
                               ${issue.title}
                            </h2>
        
                            <p class="line-clamp-2 text-xs text-[#64748B]">${issue.description}</p>
                         </div>
        
                         <!-- BUG & HELP WANTED Section  -->
                          <div class="flex flex-col gap-2 lg:flex-row lg:justify-between mt-6 mb-6">
                            <!-- bug logo/sign  -->
                             <div class="logo-2 py-1 px-3 bg-red-200 rounded-xl">
                                <p class="text-red-400 text-xs font-semibold"><i class="fa-solid fa-bug"></i> BUG</p>
                             </div>
        
                             <!-- help wanted logo/sign  -->
                              <div class="logo-2 py-1 px-3 bg-yellow-100 rounded-xl">
                                <p class="text-yellow-500 text-xs font-semibold">HELP WANTED</p>
                             </div>
                          </div>
        
                          <!-- LINE BREAK  -->
                           <hr class="opacity-15 shadow-sm mb-6">
        
                           <!-- POSTED BY NAME & DATE  -->
                            <div class="space-y-2">
                                <p class="text-[12px] text-[#64748B]"><span>#${issue.id}</span> by ${issue.author}</p>
                                <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                            </div>
                `;
                    displayCard.appendChild(divCard)
                
        }
        })
        

        issuesNumber(countIssue);
    })


} //its displayAllCards fuction end point 

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },


// calling allIssues function
allIssues();