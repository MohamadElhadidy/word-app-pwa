
export const FetchWordApi = (word)=> {
     const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;  
     const RapidAPIKey = 'c19aa90661msh318568c4a3533e8p165238jsn12d0aad4e190';
     const RapidAPIHost = 'wordsapiv1.p.rapidapi.com';
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': RapidAPIKey,
               'X-RapidAPI-Host': RapidAPIHost
          }
     };

     return  fetch(url, options)
          .then(res => res.json())
          .then(json => json)
          .catch(err => err)

}

