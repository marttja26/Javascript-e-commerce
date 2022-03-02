const form = document.getElementById("form");
    
    async function handleSubmit(event) {
        event.preventDefault();
        const status = document.getElementById("form-status");
        let data = new FormData(event.target);
        fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
        }).then(response => {
        if (response.ok) {
            status.innerHTML = "Gracias por subir tu formulario!";
            form.reset()
        } else {
            response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.innerHTML = "Oops! Hubo un problema subiendo tu formulario"
            }
            })
        }
        }).catch(error => {
        status.innerHTML = "Oops! Hubo un problema subiendo tu formulario"
        });
    }
    form.addEventListener("submit", handleSubmit)