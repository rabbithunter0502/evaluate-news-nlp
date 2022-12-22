export default function handleSubmit(event, url = 'http://localhost:8080/processData') {
    event.preventDefault()

    const inputText = document.getElementById('name')?.value;
    if (!checkForName(inputText)) {
        alert('Please input text to search!');
        return;
    }

    console.log("::: Form Submitted :::")
    requestMeanCloudData(inputText, url).then(value => {
        renderResult(value);
        document.getElementById('nlp-form')?.reset();
    });
}

const createResultElement = (value) => {
    const element = document.createElement("div");
    element.classList.add('result-item');
    element.innerHTML = `<b>${Object.keys(value)}:</b> ${Object.values(value)}`;
    return element;
}

const renderResult = (data) => {
   const resultElement = document.getElementById('results');
    if (!data) {
        resultElement.innerHTML = `<p>Unable to load data!</p>`;
        return;
    }
    const {agreement, confidence, irony, model} = data;
    if (!agreement && !confidence && !irony && !model) {
        resultElement.innerHTML = `<p>Unable to load data!</p>`;
        return;
    }
    const dataArray = [{agreement}, {confidence}, {irony}, {model}]
    resultElement.replaceChildren();
    for(let ele of dataArray) {
        resultElement.appendChild(createResultElement(ele));
    }
}

const requestMeanCloudData = async (inputText, url) => {
    const payload = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: inputText})
    }
    console.log(url);
    const response = await fetch(url, payload);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('client error', error);
    }

}



