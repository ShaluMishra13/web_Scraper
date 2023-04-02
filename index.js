const axios = require('axios');
var cheerio = require('cheerio');
var baseUrl = 'https://www.1mg.com/all-diseases?wpsrc=Google+Organic+Search';
        (async () => {      
            try 
            {
                let homePageLinks = await getLinksFromURL(baseUrl)
                console.log(homePageLinks);
            } catch (e) { console.log(e); }
        })();
        async function getLinksFromURL(url) {
            try {
                let links = [];
                let httpResponse = await axios.get(url);

                let $ = cheerio.load(httpResponse.data);
                let linkObjects = $('a'); // get all hyperlinks

                linkObjects.each((index, element) => {
                    links.push({
                        text: $(element).text(), // get the text
                        href: $(element).attr('href'), // get the href attribute
                    });
                });
                return links;
            } catch (e) { console.log(e) }
        }