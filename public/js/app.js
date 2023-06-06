console.log('Client side js loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else
//         {
//             console.log(data.location)
//             console.log(data.Temperature)
                
//         }
//     })
// })


const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = '';
    messageTwo.textContent = '';

    messageOne.textContent = 'Loading.....';


        fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = data.error;
            }
            else
            {
                messageOne.textContent = data.location;
                messageTwo.textContent = "It is "+data.Temperature+ ' degree celsius temperature. Weather type is '+data.Weather_Description + ". The Humidity is " + data.humidity;
                console.log(data.Weather_Description)
                // console.log(data.Temperature)
                    
            }
        })
    })

})
