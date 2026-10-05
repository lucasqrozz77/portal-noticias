// "#" = quadrado preto
const solucao = ["MUNDO", "O#O#B", "ELITE", "D#V#S", "AMADO"];
const numeros = { "0-0": 1, "0-2": 2, "0-4": 3, "2-0": 4, "4-0": 5 };

const grade = document.getElementById("crossword");
const mensagem = document.getElementById("gameMessage");
const celulas = [];

solucao.forEach((linha, r) => {
    [...linha].forEach((letra, c) => {
        const div = document.createElement("div");

        if (letra === "#") {
            div.className = "cell black";
        } else {
            div.className = "cell";

            const num = numeros[r + "-" + c];
            if (num) {
                const span = document.createElement("span");
                span.className = "num";
                span.textContent = num;
                div.appendChild(span);
            }

            const input = document.createElement("input");
            input.maxLength = 1;
            input.dataset.r = r;
            input.dataset.c = c;
            input.dataset.resposta = letra;
            input.setAttribute("aria-label", "Linha " + (r + 1) + ", coluna " + (c + 1));
            div.appendChild(input);
            celulas.push(input);
        }

        grade.appendChild(div);
    });
});

function achar(r, c) {
    return celulas.find((i) => +i.dataset.r === r && +i.dataset.c === c);
}

celulas.forEach((input, i) => {
    input.addEventListener("input", () => {
        input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "");
        input.parentElement.classList.remove("correct", "wrong");
        if (input.value && celulas[i + 1]) celulas[i + 1].focus();
    });

    input.addEventListener("focus", () => input.select());

    input.addEventListener("keydown", (e) => {
        const r = +input.dataset.r;
        const c = +input.dataset.c;
        let alvo = null;

        if (e.key === "Backspace" && !input.value && celulas[i - 1]) {
            celulas[i - 1].focus();
        } else if (e.key === "ArrowRight") alvo = achar(r, c + 1);
        else if (e.key === "ArrowLeft") alvo = achar(r, c - 1);
        else if (e.key === "ArrowDown") alvo = achar(r + 1, c);
        else if (e.key === "ArrowUp") alvo = achar(r - 1, c);

        if (alvo) {
            e.preventDefault();
            alvo.focus();
        }
    });
});

document.getElementById("checkBtn").addEventListener("click", () => {
    let acertos = 0;
    let vazias = 0;

    celulas.forEach((input) => {
        const pai = input.parentElement;
        pai.classList.remove("correct", "wrong");

        if (!input.value) {
            vazias++;
        } else if (input.value === input.dataset.resposta) {
            pai.classList.add("correct");
            acertos++;
        } else {
            pai.classList.add("wrong");
        }
    });

    if (acertos === celulas.length) {
        mensagem.textContent = "🎉 Parabéns! Você completou as palavras cruzadas!";
    } else if (vazias > 0) {
        mensagem.textContent = "Ainda faltam " + vazias + " letra(s) para preencher.";
    } else {
        mensagem.textContent = "Tem letras erradas, confira as marcadas em vermelho.";
    }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    celulas.forEach((input) => {
        input.value = "";
        input.parentElement.classList.remove("correct", "wrong");
    });
    mensagem.textContent = "";
    celulas[0].focus();
});