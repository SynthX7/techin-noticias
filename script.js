  // URL da API de notícias (substitua pelo seu endpoint real)
  const apiKey = 'de1e002fc2de46ed889a194efff5cd03';
  const url = `https://newsapi.org/v2/everything?q=technology&from=2024-06-01&sortBy=publishedAt&language=pt&apiKey=${apiKey}`;

  // Função para buscar e exibir as notícias
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Seleciona o elemento onde os artigos serão adicionados dinamicamente
      const articleList = document.getElementById('article-list');

      // Exibe a manchete principal
      const headlineArticle = document.getElementById('headline-article');
      headlineArticle.querySelector('h3').textContent = data.articles[0].title;
      headlineArticle.querySelector('.article-image').style.backgroundImage = `url('${data.articles[0].urlToImage}')`;
      headlineArticle.querySelector('.article-image a').href = data.articles[0].url;
      headlineArticle.querySelector('.article-content p').textContent = data.articles[0].description;

      // Itera sobre os artigos restantes e adiciona dinamicamente
      for (let i = 1; i < data.articles.length; i++) {
        const article = data.articles[i];
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const articleImage = document.createElement('div');
        articleImage.classList.add('article-image');
        articleImage.style.backgroundImage = `url('${article.urlToImage}')`;

        const articleLink = document.createElement('a');
        articleLink.textContent = 'Ver notícia';
        articleLink.href = article.url;
        articleLink.target = '_blank'; // Abre o link em uma nova aba
        articleImage.appendChild(articleLink);

        const articleContent = document.createElement('div');
        articleContent.classList.add('article-content');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        articleContent.appendChild(title);
        articleContent.appendChild(description);

        articleDiv.appendChild(articleImage);
        articleDiv.appendChild(articleContent);

        articleList.appendChild(articleDiv);
      }
    })
    .catch(error => {
      console.error('Erro ao buscar notícias:', error);
    });