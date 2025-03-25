export function extractTopItems(data, key, count = 5) {
  if (!data || data.length === 0) return [];
  const counts = data.reduce((acc, item) => {
      if (item[key]) {
          const items = item[key].split(',').map(i => i.trim());
          items.forEach(val => {
              acc[val] = (acc[val] || 0) + 1;
          });
      }

      return acc;
  }, {});

  const sorted = Object.entries(counts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([item, count]) => ({ [key]: item, "Total Count": count }));

  return sorted.slice(0, count);
}

export function groupAndCount(data, key1, key2) {
  if (!data || data.length === 0) return [];

  const groupedData = data.reduce((acc, item) => {
      const k1 = item[key1];
      const k2 = item[key2];
      if (k1 && k2) {
          const key = `${k1}-${k2}`;
          acc[key] = (acc[key] || { [key1]: k1, [key2]: k2, 'Total Count': 0 });
          acc[key]['Total Count']++;
      }
      return acc;
  }, {});
  return Object.values(groupedData);
}

export function extractGenreWithYear(data){
      if(!data || data.length === 0) return [];

      const result = data.reduce((acc, item) => {
           if (item.listed_in) {
             const genres = item.listed_in.split(',').map(i => i.trim());
             genres.forEach(genre => {
                acc.push({
                     'Release Year': item.release_year,
                     'Genre': genre
                  })
             })
           }
         return acc
       }, []);
      return result;
}

export function analyzeDescriptionSentiment(data) {
  if (!data || data.length === 0) return [];

    const results = data.map(item => {
      const description = item.description;
         let sentiment = 'Neutral'
          if (description) {
              // Simulate textblob sentiment
              const polarity = simpleSentimentAnalysis(description)
                if (polarity > 0) {
                  sentiment = 'Positive'
                } else if (polarity < 0) {
                    sentiment = 'Negative'
                  }

          }

          return {
               'Release Year': item.release_year,
              'Sentiment': sentiment,
               };
    })
     const groupedResults = results.reduce((acc, item) => {
          const key = `${item['Release Year']}-${item['Sentiment']}`;
          acc[key] = (acc[key] || { 'Release Year': item['Release Year'], 'Sentiment': item['Sentiment'], 'Total Count': 0 });
          acc[key]['Total Count']++;
          return acc;
          }, {});

         return Object.values(groupedResults);
}


export function simpleSentimentAnalysis(text) {

const words = text.toLowerCase().split(/\s+/);

const positiveWords = ['good', 'great', 'excellent', 'amazing', 'happy', 'love', 'best'];
const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'hate', 'worst'];
  let score = 0;
words.forEach(word => {
  if (positiveWords.includes(word)) {
    score++;
  } else if (negativeWords.includes(word)) {
    score--;
  }
});
  return score;
}


export function extractDuration(data) {
  if (!data || data.length === 0) return [];
  return data.reduce((acc, item)=>{
      if(item.duration){
            const durations = item.duration.split(",").map(i => i.trim());
            durations.forEach(val =>{
               acc.push({'Duration': val});
          })
       }

      return acc;
  }, []);

}
export function filterDataByYear(data, key, year){
if(!data || data.length === 0) return [];
  if(year === 'all') return data;
 return data.filter(item => item[key] === year);

}