const repoOwner = "SEU_USUARIO"; 
const repoName = "SEU_REPOSITORIO";
const filePath = "data.csv";
const token = "SEU_TOKEN"; // use repo privado

document.getElementById("facilitiesForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = {
        codigo: document.getElementById("codigo").value,
        locador: document.getElementById("locador").value,
        fornecedor: document.getElementById("fornecedor").value,
        mesReferencia: document.getElementById("mesReferencia").value,
        valor: document.getElementById("valor").value,
        status: document.getElementById("status").value,
        obs: document.getElementById("obs").value,
        dataLancamento: new Date().toISOString()
    };

    const line = `${formData.codigo},${formData.locador},${formData.fornecedor},${formData.mesReferencia},${formData.valor},${formData.status},${formData.obs},${formData.dataLancamento}\n`;

    // Buscar arquivo atual
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    let response = await fetch(url, {
        headers: {
            "Authorization": `token ${token}`
        }
    });

    let data = await response.json();

    let content = atob(data.content);
    content += line;

    const updatedContent = btoa(content);

    // Commit
    await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Novo registro via formulário",
            content: updatedContent,
            sha: data.sha
        })
    });

    document.getElementById("msg").innerText = "Registro salvo com sucesso!";
});
