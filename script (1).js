let pessoas = [
    { rm: "11111", nome: "Pietro Henrique Cordeiro Costa", ocupacao: "Aluno", turma: "1MDS", livros: ["Dom Casmurro", "O Cortiço"] },
    { rm: "22222", nome: "Chrystian Aquino Ribeiro", ocupacao: "Aluno", turma: "2MDS", livros: ["O Alquimista"] },
    { rm: "33333", nome: "Lindenberg Henrique Tavares Ribeiro", ocupacao: "Aluno", turma: "1MDS", livros: ["1984", "Revolução dos Bichos"] },
    { rm: "44444", nome: "Kawã Luis Oliveira de Deus", ocupacao: "Aluno", turma: "2MDS", livros: ["A Culpa é das Estrelas", "O Senhor dos Anéis"] },
    { rm: "55555", nome: "Danilo Gaspar", ocupacao: "Aluno", turma: "3MDS", livros: ["Odisseia", "A Divina Comédia"] },
    { rm: "66666", nome: "Vinicius Teixeira Pardal", ocupacao: "Aluno", turma: "3JODI", livros: ["O Paraíso Perdido", "Eneida"] },
    { rm: "77777", nome: "Lucas Pessoa Cardeiro Rodrigues dos Santos", ocupacao: "Aluno", turma: "3JODI", livros: ["As Mil e Uma Noites", "Gilgamesh"] },
    { rm: "88888", nome: "Ágata Marie Bombaha", ocupacao: "Aluno", turma: "3MAD", livros: ["Decamerão", "Ilíada", "O Pequeno Príncipe"] },
    { rm: "99999", nome: "Geovana Franco Muniz", ocupacao: "Aluno", turma: "3MAD", livros: ["Livro de Receitas"] },
    { rm: "12345", nome: "Maria Silva", ocupacao: "Professor", turma: "Docente", livros: ["Didática", "Pedagogia"] }
];
let livros = [
    { codigo: "1111111111111", nome: "Novas Palavras" },
    { codigo: "2222222222222", nome: "O Alienista" }
];
let emprestimos = [

];
const estadoInicialQuadrado = document.getElementById("quadrado").innerHTML;
function salvarPessoas() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
}
function carregarPessoas() {
    const dados = localStorage.getItem("pessoas");
    if (dados) pessoas = JSON.parse(dados);
    migrarLivrosAntigos(); // 🔥 MIGRAÇÃO AUTOMÁTICA
}
function migrarLivrosAntigos() {
    pessoas.forEach(pessoa => {
        pessoa.livros = pessoa.livros.map(l => {
            if (typeof l === "string") {
                return {
                    codigo: "OLD-" + Math.random().toString(36).substring(2, 10),
                    nome: l
                };
            }
            return l;
        });
    });
    salvarPessoas();
}
carregarPessoas();
const form = document.getElementById("formRM");
const input = document.getElementById("rmInput");
const quadrado = document.getElementById("quadrado");
const sugestoes = document.getElementById("sugestoes");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const rm = input.value.trim();
    if (!rm) {
        quadrado.innerHTML = `<h3 style="color:#990000;">Digite um RM para buscar</h3>`;
        return;
    }
    const pessoa = pessoas.find(p => p.rm === rm);
    if (!pessoa) {
        quadrado.innerHTML = `<h2 style="color:red;">RM não encontrado</h2>`;
        return;
    }
    const cor = pessoa.ocupacao === "Professor" ? "#003366" : "#990000";
    document.getElementById("areaBusca").innerHTML = `
    <div class="aluno-container">
        <div class="bordadoaluno">
            <h2 style="color:${cor};">👤 Perfil</h2>
            <p><strong>Nome:</strong> ${pessoa.nome}</p>
            <p><strong>RM:</strong> ${pessoa.rm}</p>
            <p><strong>Ocupação:</strong> ${pessoa.ocupacao}</p>
            <p><strong>Turma:</strong> ${pessoa.turma}</p>
        </div>
        <div class="livrosaluno">
            <h2>📚 Livros</h2>
            ${pessoa.livros.map(l => `
                <p>📖 ${l.nome}</p>
            `).join("")}
        </div>
        <div class="livrosaluno">
            <h2>📦 Empréstimos</h2>
            ${mostrarEmprestimos(pessoa.rm)}
        </div>
    </div>
    `;
});
function salvarEmprestimos() {
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}
function carregarEmprestimos() {
    const dados = localStorage.getItem("emprestimos");
    if (dados) emprestimos = JSON.parse(dados);
}
carregarEmprestimos();
function calcularPrazo(frequencia) {
    return frequencia >= 75 ? 30 : 15;
}
function registrarEmprestimo(pessoa, livro) {
    const hoje = new Date();
    const dias = calcularPrazo(pessoa.frequencia || 80);
    const devolucao = new Date();
    devolucao.setDate(hoje.getDate() + dias);
    const emprestimo = {
        codigoLivro: livro.codigo,
        nomeLivro: livro.nome,
        rmAluno: pessoa.rm,
        dataEmprestimo: hoje.toISOString(),
        dataDevolucaoPrevista: devolucao.toISOString(),
        renovacoes: 0,
        status: "ativo"
    };
    emprestimos.push(emprestimo);
    salvarEmprestimos();
}
function mostrarEmprestimos(rm) {
    const lista = emprestimos.filter(e =>
        e.rmAluno === rm && e.status === "ativo"
    );
    if (lista.length === 0) {
        return "<p>Nenhum empréstimo ativo</p>";
    }
    return lista.map(e => `
        <p>
            📦 ${e.nomeLivro} <br>
            📅 Devolução: ${new Date(e.dataDevolucaoPrevista).toLocaleDateString()}
        </p>
    `).join("");
}
function renovarEmprestimo(codigoLivro, rm) {
    const emprestimo = emprestimos.find(e =>
        e.codigoLivro === codigoLivro &&
        e.rmAluno === rm &&
        e.status === "ativo"
    );
    if (!emprestimo) return;
    if (emprestimo.renovacoes >= 2) {
        emprestimo.status = "penalizado";
        alert("Limite de renovações atingido!");
        salvarEmprestimos();
        return;
    }
    const novaData = new Date(emprestimo.dataDevolucaoPrevista);
    novaData.setDate(novaData.getDate() + 7);
    emprestimo.dataDevolucaoPrevista = novaData.toISOString();
    emprestimo.renovacoes++;
    salvarEmprestimos();
}
function verificarAtrasos() {
    const hoje = new Date();
    emprestimos.forEach(e => {
        const prazo = new Date(e.dataDevolucaoPrevista);
        if (hoje > prazo && e.status === "ativo") {
            e.status = "atrasado";
        }
    });
    salvarEmprestimos();
}
setInterval(verificarAtrasos, 60000);
input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 5);
    const valor = this.value;
    sugestoes.innerHTML = "";
    if (!valor) return;
    const filtrados = pessoas.filter(p => p.rm.startsWith(valor));
    filtrados.forEach(pessoa => {
        const item = document.createElement("div");
        item.classList.add("list-group-item");
        item.textContent = `${pessoa.rm} - ${pessoa.nome} (${pessoa.ocupacao})`;
        item.onclick = () => {
            input.value = pessoa.rm;
            sugestoes.innerHTML = "";
            form.dispatchEvent(new Event("submit"));
        };
        sugestoes.appendChild(item);
    });
});
document.addEventListener("click", (e) => {
    if (!document.querySelector(".input-group").contains(e.target)) {
        sugestoes.innerHTML = "";
    }
});
const btnRegistrarLivro = document.getElementById("btnRegistrarLivro");
if (btnRegistrarLivro) {
    btnRegistrarLivro.addEventListener("click", () => {
        const codigo = document.getElementById("codigoLivro").value.trim();
        const rm = document.getElementById("rmLeitor").value.trim();
        const resultado = document.getElementById("resultadoRegistro");
        const pessoa = pessoas.find(p => p.rm === rm);
        const livro = livros.find(l => l.codigo === codigo);
        if (!pessoa) {
            resultado.innerHTML = `<p style="color:red;">Pessoa não encontrada</p>`;
            return;
        }
        if (!livro) {
            resultado.innerHTML = `<p style="color:red;">Livro não encontrado</p>`;
            return;
        }
        if (!validarDados(codigo, rm)) return;
        const jaExiste = pessoa.livros.some(l => l.codigo === codigo);
        if (jaExiste) {
            resultado.innerHTML = `<p style="color:orange;">Livro já registrado</p>`;
            return;
        }
        pessoa.livros.push({
        codigo: livro.codigo,
        nome: livro.nome
});
registrarEmprestimo(pessoa, livro);
salvarPessoas();
        resultado.innerHTML = `
            <p style="color:green;">
                Livro "${livro.nome}" registrado para ${pessoa.nome}
            </p>
        `;
    });
}
function removerLivro(rm, codigo) {
    const pessoa = pessoas.find(p => p.rm === rm);

    if (!pessoa) return;

    if (!confirm("Deseja remover este livro?")) return;

    pessoa.livros = pessoa.livros.filter(l => l.codigo !== codigo);

    salvarPessoas();

    document.getElementById("formRM").dispatchEvent(new Event("submit"));
}
document.getElementById("rmLeitor")?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 5);
});
document.getElementById("codigoLivro")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("btnRegistrarLivro").click();
    }
});
document.getElementById("codigoLivro")?.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 13);
});
function validarDados(codigo, rm) {
    if (rm.length !== 5) {
        alert("RM inválido (precisa ter 5 dígitos)");
        return false;
    }
    if (codigo.length !== 13) {
        alert("Código de barras inválido (precisa ter 13 dígitos)");
        return false;
    }
    return true;
}
function voltarInicio() {

    document.querySelectorAll("input").forEach(i => i.value = "");

    if (sugestoes) sugestoes.innerHTML = "";

    // limpa resultado da busca
    document.getElementById("areaBusca").innerHTML = `
        <div style="text-align:center;">
            <h3>🔍 Digite um RM para buscar</h3>
        </div>
    `;

    // limpa resultado do registro
    document.getElementById("resultadoRegistro").innerHTML = "";
    document.getElementById("codigoLivro").value = "";
    document.getElementById("rmLeitor").value = "";
}