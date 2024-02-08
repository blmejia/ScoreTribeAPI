document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData(){
   const response = await fetch('http://localhost:4000/test',{method:'POST'})
   const json = await response.json();
   console.log(json);
}

