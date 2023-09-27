

const api_key="f90806f617b84ed2a1ca8f4aac18a23e";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
 
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);

    function bindData(articles){
        const cardsContainer=document.getElementById("cards-container");
        const newsCardTemplate=document.getElementById("templete-card");

        cardsContainer.innerHTML = "";//empty sati refresh kelavr

        articles.forEach((article) => {
            if(!article.urlToImage) return;  
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone,article);
            cardsContainer.appendChild(cardClone);
            
        });
    }

        function fillDataInCard(cardClone,article){
            const newsImg=cardClone.querySelector("#news-Img");
            const newsTitle=cardClone.querySelector("#news-Title");
            const newsSource=cardClone.querySelector("#news-Source");
            const newsDesc=cardClone.querySelector("#news-Desc");

            newsImg.src = article.urlToImage;
            newsTitle.innerHTML = article.title;
            newsDesc.innerHTML  = article.description;

            const date = new Date(article.publishedAt).toLocaleString("en-US",{
                 timeZone: "Asia/Jakarta",
             });
        
 newsSource.innerHTML = `${article.source.name} . ${date}`; 
cardClone.firstElementChild.addEventListener("click", () =>{
    window.open(article.url,"_blank");
});

        }
    }
