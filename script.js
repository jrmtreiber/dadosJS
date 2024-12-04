document.getElementById('btn-iniciar').addEventListener('click', function () {
    const class_a = document.getElementById("class_a");
    const class_b = document.getElementById("class_b");
    const confirmacao = document.getElementById("confirmacao");

    this.style.display = 'none';
    class_b.style.display = 'none';

    class_a.style.display = 'flex';
    confirmacao.style.display = 'flex';
});

// ARRASTE PARA CONFIRMAR + PERGUNTAS:

const slider = document.getElementById('slider');
const container = document.querySelector('.container');
const text = document.querySelector('.text');
let isDragging = false;
let respostas = [];

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    let startX = e.clientX;

    const onMouseMove = (e) => {
        if (!isDragging) return;

        let deltaX = e.clientX - startX;
        const newPosition = Math.min(Math.max(deltaX, 0), container.offsetWidth - slider.offsetWidth);
        slider.style.left = newPosition + 'px';

        if (newPosition >= container.offsetWidth - slider.offsetWidth) {
            slider.classList.add('success');
            text.textContent = 'Adicionando novas informações...';
        } else {
            slider.classList.remove('success');
            text.textContent = 'Arraste para confirmar';
        }
    };

    const onMouseUp = () => {
        isDragging = false;

        if (parseInt(slider.style.left) === container.offsetWidth - slider.offsetWidth) {
            let name = '';
            let age = '';
            let city = ''; 

            while (!name) {
                name = prompt("Qual o seu nome?");
                if (!name) {
                    alert("Por favor, insira o seu nome.");
                }
            }

            while (true) {
                age = prompt("Quantos anos você tem?");
                if (!age || isNaN(age) || age.trim() === "") {
                    alert("Por favor, insira uma idade válida.");
                } else {
                    break;
                }
            }

            while (!city) {
                city = prompt("De onde você é? (Cidade)");
                if (!city) {
                    alert("Por favor, insira a cidade.");
                }
            }

            respostas.push({ nome: name, idade: age, cidade: city });

            const newResultado = document.createElement('div');
            newResultado.classList.add('quad_resultados');
            newResultado.innerHTML = `
                <div class="pergunta">
                    <h1>Nome:</h1>
                    <p>${name}</p>
                </div>
                <div class="pergunta">
                    <h1>Idade:</h1>
                    <p>${age}</p>
                </div>
                <div class="pergunta">
                    <h1>Cidade:</h1>
                    <p>${city}</p>
                </div>
            `;
            document.getElementById('quad_resultados').appendChild(newResultado);

            document.getElementById('btn_enviar').style.display = 'flex';
        }

        slider.style.left = '0px';  
        slider.classList.remove('success');
        text.textContent = 'Arraste para confirmar';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

document.getElementById('btn_enviar').addEventListener('click', () => {
    document.getElementById('quad_resultados').style.display = 'flex';
    document.getElementById('btn-enviar').style.display = 'none';
    document.getElementById('confirmacao').style.display = 'none';
});