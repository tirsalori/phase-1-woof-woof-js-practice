document.addEventListener("DOMContentLoaded", () => {
    const filterBtn = document.getElementById("good-dog-filter")
    filterBtn.addEventListener("click", () => {
        document.getElementById("dog-info").innerHTML=""
        if (filterBtn.innerText === "Filter good dogs: OFF") {
            filterBtn.innerText = "Filter good dogs: ON"
        } else {
            filterBtn.innerText = "Filter good dogs: OFF"
        }})
    fetch("http://localhost:3000/pups")
        .then((response) => response.json())
        .then((data) => data.forEach(pupObj => {
            const span = document.createElement ("span")
            const div = document.getElementById("dog-bar")
            span.innerText = pupObj.name
            div.appendChild(span)
            span.addEventListener("click", () => {
                const img = document.createElement("img")
                const h2 = document.createElement("h2")
                const btn = document.createElement("button")
                const div2 = document.getElementById("dog-info")
                img.setAttribute("src", pupObj.image)
                h2.innerText = pupObj.name
                if(pupObj.isGoodDog) {
                    btn.innerText = "Good Dog!"
                } else {
                    btn.innerText = "Bad Dog!"
                }
                div2.innerHTML = ""
                div2.append(img, h2, btn)
                btn.addEventListener("click", () => {
                    if (pupObj.isGoodDog) {
                        btn.innerText = "Bad Dog!"
                        pupObj.isGoodDog = false
                        if (filterBtn.innerText === "Filter good dogs: ON") {
                            div2.innerHTML = ""
                            span.style.display = "none"
                        }
                    } else {
                        btn.innerText = "Good Dog!"
                        pupObj.isGoodDog = true
                    }
                    fetch(`http://localhost:3000/pups/${pupObj.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            "isGoodDog": pupObj.isGoodDog
                        })
                    })
                })
            })
            filterBtn.addEventListener("click", () => {
                if (filterBtn.innerText === "Filter good dogs: ON") {
                    if (pupObj.isGoodDog) {
                        span.style.display = ""
                    } else {
                        span.style.display = "none"
                    }
                } else {
                    span.style.display = ""
                }
            })
        }))
})

