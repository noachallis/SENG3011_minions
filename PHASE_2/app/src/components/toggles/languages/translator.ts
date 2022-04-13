const translator = [
    { 
      lan: 'en',
      phrases: {
        'total_cases' : 'Total Cases',
        'pop_vacced': 'Population Vaccinated',
      }
    }, 
    {
      lan: 'cn',
      phrases: {
        'total_cases' : '总病例',
        'pop_vacced': '接种人群'
      }
    },
    {
      lan: 'es',
      phrases: {
        'total_cases' : 'Casos totales',
        'pop_vacced': 'Población cacunada'
      }
    },
    {
      lan: 'fr',
      phrases: {
        'total_cases' : 'Nombre total de cas',
        'pop_vacced': 'Population vaccinée'
      }
    },
    {
      lan: 'de',
      phrases: {
        'total_cases' : 'Fälle insgesamt',
        'pop_vacced': 'Bevölkerung geimpft'
      }
    },
    { 
      lan: 'kr',
      phrases: {
        'total_cases' : '총 케이스',
        'pop_vacced': '예방접종을 받은 인구',
      }
    }, 
    {
      lan: 'jp',
      phrases: {
        'total_cases' : '総件数',
        'pop_vacced': 'ワクチン接種された人口'
      }
    },
    {
      lan: 'hn',
      phrases: {
        'total_cases' : 'कुल मामले',
        'pop_vacced': 'जनसंख्या टीकाकरण'
      }
    }
]

export const getWord = (word : string, language : string) => {
  let phrases = translator.find((c : any) => c.lan === language)?.phrases;
  switch(word){
    case 'total_cases':
    return phrases?.total_cases
  case 'pop_vacced':
    return phrases?.pop_vacced
  }
};