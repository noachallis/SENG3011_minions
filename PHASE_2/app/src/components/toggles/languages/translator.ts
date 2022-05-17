const translator = [
    { 
      lan: 'en',
      phrases: {
        'total_cases' : 'Total Cases',
        'pop_vacced': 'Population Vaccinated',
        'total_vacced' : 'Total Vaccinated',
        'base_layer': 'Base Layer',
        'upper_layer': 'Upper Layer',
        'region_select': 'Region Select',
        'save_changes': 'Save Changes',
        'legend': 'legend',
        'stringency_index': 'Stringency Index',
        'total_deaths': 'Total Deaths',
        'gdp_growth_rate': 'GDP Growth Rate',
        'unemployment_rate': 'Unemployment Rate',
        'date': 'Date',
      }
    }, 
    {
      lan: 'cn',
      phrases: {
        'total_cases' : '总病例',
        'pop_vacced': '接种人群',
        'total_vacced' : '接种疫苗总数',
        'base_layer': '基层',
        'upper_layer': '上面那层',
        'region_select': '地区选择',
        'save_changes': '保存更改',
        'legend': '傳奇',
        'stringency_index': '嚴格指數',
        'total_deaths': '總死亡人數',
        'gdp_growth_rate': '國內生產總值增長率',
        'unemployment_rate': '失業率',
        'date':'日期',
      }
    },
    {
      lan: 'es',
      phrases: {
        'total_cases' : 'Casos totales',
        'pop_vacced': 'Población cacunada',
        'total_vacced' : 'Total vacunada',
        'base_layer': 'Capa base',
        'upper_layer': 'Capa superior',
        'region_select': 'Selección de región',
        'save_changes': 'Guardar cambios',
        'legend': 'leyenda',
        'stringency_index': 'Índice de rigurosidad',
        'total_deaths': 'Muertes Totales',
        'gdp_growth_rate': 'Tasa de crecimiento del PIB',
        'unemployment_rate': 'Tasa de desempleo',
        'date': 'Fecha',
      }
    },
    {
      lan: 'fr',
      phrases: {
        'total_cases' : 'Nombre total de cas',
        'pop_vacced': 'Population vaccinée',
        'total_vacced' : 'Total vacciné',
        'base_layer': 'Couche de base',
        'upper_layer': 'Couche supérieure',
        'region_select': 'Sélection de la région',
        'save_changes': 'Sauvegarder les modifications',
        'legend': 'Légende',
        'stringency_index': 'Indice de stringence',
        'total_deaths': 'Décès totaux',
        'gdp_growth_rate': 'Taux de croissance du PIB',
        'unemployment_rate': 'Taux de chômage',
        'date': 'Date',
      }
    },
    {
      lan: 'de',
      phrases: {
        'total_cases' : 'Fälle insgesamt',
        'pop_vacced': 'Bevölkerung geimpft',
        'total_vacced' : 'Totaal gevaccineerd',
        'base_layer': 'Basislaag',
        'upper_layer': 'Bovenste laag',
        'region_select': 'Regio selecteren',
        'save_changes': 'Wijzigingen opslaan',
        'legend': 'Legende',
        'stringency_index': 'Stringenzindex',
        'total_deaths': 'Totale Todesfälle',
        'gdp_growth_rate': 'BIP-Wachstumsrate',
        'unemployment_rate': 'Arbeitslosenrate',
        'date': 'Datum',
      }
    },
    { 
      lan: 'kr',
      phrases: {
        'total_cases' : '총 케이스',
        'pop_vacced': '예방접종을 받은 인구',
        'total_vacced' : '총 예방 접종',
        'base_layer': '기본 레이어',
        'upper_layer': '상층',
        'region_select': '지역 선택',
        'save_changes': '변경 사항을 저장하다',
        'legend': '전설',
        'stringency_index': '엄격성 지수',
        'total_deaths': '총 사망자 수',
        'gdp_growth_rate': 'GDP 성장률',
        'unemployment_rate': '실업률',
        'date': '날짜',
      }
    }, 
    {
      lan: 'jp',
      phrases: {
        'total_cases' : '総件数',
        'pop_vacced': 'ワクチン接種された人口',
        'total_vacced' : '総ワクチン接種',
        'base_layer': 'ベースレイヤー',
        'upper_layer': '上層',
        'region_select': '地域選択',
        'save_changes': '変更内容を保存',
        'legend': '전설',
        'stringency_index': 'ストリンジェンシーインデックス',
        'total_deaths': '総死亡数',
        'gdp_growth_rate': 'GDP成長率',
        'unemployment_rate': '失業率',
        'date': '日にち',
      }
    },
    {
      lan: 'hn',
      phrases: {
        'total_cases' : 'कुल मामले',
        'pop_vacced': 'जनसंख्या टीकाकरण',
        'total_vacced' : 'कुल टीकाकरण',
        'base_layer': 'बेस लेयर पोशाकें',
        'upper_layer': 'ऊपरी परत',
        'region_select': 'क्षेत्र चयन',
        'save_changes': 'परिवर्तनों को सुरक्षित करें',
        'legend': 'विख्यातव्यक्ति',
        'stringency_index': 'कठोरता सूचकांक',
        'total_deaths': 'कुल मौतें',
        'gdp_growth_rate': 'जीडीपी विकास दर',
        'unemployment_rate': 'बेरोजगारी की दर',
        'date': 'दिनांक',
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
    case 'total_vacced':
      return phrases?.total_vacced
    case 'base_layer':
      return phrases?.base_layer
    case 'upper_layer':
      return phrases?.upper_layer
    case 'region_select':
      return phrases?.region_select
    case 'save_changes':
      return phrases?.save_changes
    case 'legend':
      return phrases?.legend
    case 'stringency_index':
      return phrases?.stringency_index
    case 'total_deaths':
      return phrases?.total_deaths
    case 'gdp_growth_rate':
      return phrases?.gdp_growth_rate
    case 'unemployment_rate':
      return phrases?.unemployment_rate
    case 'COVID-19 Cases':
      return phrases?.total_cases
    case 'Vaccination Rates':
      return phrases?.pop_vacced
    case 'Unemployment Rate':
      return phrases?.unemployment_rate
    case 'Deaths':
      return phrases?.total_deaths
    case 'Stringency Index': 
      return phrases?.stringency_index
    case 'GDP Growth Rate':
      return phrases?.gdp_growth_rate
    case 'date':
      return phrases?.date
  }
};