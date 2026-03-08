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

// fetching issue from id for modal 
async function loadModalDetails(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();
    const dataOfId = data.data;
    // its modal part 

    const detailsModal = document.getElementById("detailsModal");
    // detailsModal.innerHTML ="";
    detailsModal.innerHTML = `
      <h2 class="text-2xl font-bold">${dataOfId.title}</h2>
                <div class="flex gap-2">
                    <div>
                        <p class="${dataOfId.status == "open" ? "bg-green-400" : "bg-[#4A00FF]"} text-white py-1 px-2 text-[12px] rounded-full">${dataOfId.status}</p>
                    </div>
                    <div>
                        <p class="text-[14px] text-[#64748B]">. Opened by ${dataOfId.author} .</p>
                    </div>
                    <div class="">

                        <p class="text-[14px] text-[#64748B]">${dataOfId.createdAt}</p>

                    </div>
                </div>


                <div class="flex gap-2">
                    <div class="logo-2 py-1 px-3 bg-red-200 rounded-xl inline-block">
                        <p class="text-red-400 text-xs font-semibold"><i class="fa-solid fa-bug"></i> BUG</p>
                    </div>
                    <!-- help wanted logo/sign  -->
                    <div class="logo-2 py-1 px-3 bg-yellow-100 rounded-xl inline-block">
                        <p class="text-yellow-500 text-xs font-semibold">HELP WANTED</p>
                    </div>

                </div>

                <div>
                    <p class="text-[#64748B] text-2xl">The navigation menu doesn't collapse properly on mobile devices.
                        Need to fix the responsive behavior.</p>
                </div>

                <div class="bg-gray-200 rounded-md">
                    <div class="flex p-5">
                        <div class="flex-1 space-y-1">
                            <p class="text-[#64748B] font-semibold text-base">Assignee:</p>
                            <h2 class="text-base font-semibold">${dataOfId.assignee?dataOfId.assignee : "N/A"}</h2>
                        </div>

                        <div class="flex-1 space-y-1">
                            <p class="text-[#64748B] font-semibold text-base">Priority:</p>
                            <p class="text-[12px] font-medium text-white  py-1 px-3 bg-red-400 rounded-full inline-block">HIGH</p>
                        </div>
                    </div>
                </div>
    `;

    document.getElementById("wordModal").showModal();
}

// fetching all issues from Server 
async function allIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ");
    const data = await res.json();
    displayAllCards(data.data);

    btnAll.click()

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
            divCard.className = `p-6 shadow-md rounded-xl border-t-3 ${issue.status === "open" ? "border-t-green-600" : "border-t-[#A855F7]"}  `;

            divCard.onclick = () => loadModalDetails(issue.id);
            divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div>
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/${issue.status == "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "high" ? "bg-red-200" : issue.priority == "medium" ? " bg-yellow-200" : "bg-gray-200"} rounded-xl">
                                <p class="${issue.priority == "high" ? "text-red-400" : issue.priority == "medium" ? " text-yellow-500" : "text-gray-500"} text-xs font-semibold">${issue.priority == "high" ? "HIGH" : issue.priority == "medium" ? "MEDIUM" : "LOW"}</p>
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

        issues.forEach((issue) => {
            if (issue.status == "open") {

                countIssue++;

                const divCard = document.createElement("div")
                divCard.className = "p-6 shadow-md rounded-xl border-t-2 border-t-green-600"

                divCard.onclick = () => loadModalDetails(issue.id);

                // console.log(issue);
                divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/Open-Status.png" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "high" ? "bg-red-200" : " bg-yellow-200"} rounded-xl">
                                <p class="${issue.priority == "high" ? "text-red-400" : " text-yellow-500"} text-xs font-semibold">${issue.priority == "high" ? "HIGH" : "MEDIUM"}</p>
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

        issues.forEach((issue) => {
            if (issue.status == "closed") {

                countIssue++;

                const divCard = document.createElement("div")
                divCard.className = "p-6 shadow-md rounded-xl border-t-3 border-[#A855F7] "

                divCard.onclick = () => loadModalDetails(issue.id);

                // console.log(issue);
                divCard.innerHTML = `
                        <!-- here the card logo section  -->
                        <div class="cardLogo flex justify-between mb-3">
                            <!-- Card Logo-1  -->
                            <div class="logo-1">
                                <img src="./assets/Closed- Status .png" alt="">
                            </div>
                            <!-- card logo-2  -->
                             <div class="logo-2 py-1 px-3 ${issue.priority == "medium" ? "bg-yellow-200" : "bg-gray-200"} rounded-xl">
                                <p class="${issue.priority == "medium" ? " text-yellow-500" : "text-gray-500"} text-xs font-semibold">${issue.priority == "medium" ? "MEDIUM" : "LOW"}</p>
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