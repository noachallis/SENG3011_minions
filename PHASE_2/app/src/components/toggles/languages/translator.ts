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
        'gdp_vs_time': 'Real GDP Growth Rate vs. Time',
        'death_vs_time': 'Deaths vs. Time',
        'unemployment_vs_time': 'Unemployment Rate vs. Time',
        'stringency_time':'Stringency Index vs. Time',
        'covid_time':'COVID-19 Cases vs. Time',
        'case_comparison':'COVID-19 Country Case Comparison',
        'death_comparison':'COVID-19 Country Number of Deaths Comparison',
        'vaccinated_vs_time': 'Fully Vaccinated Persons vs. Time',
        'global_cases_vs_time': 'Global Cases vs. Time',
        'global_vaccinated_vs_time': 'Global Cases vs. Time',
        'global_deaths_vs_time': 'Global Cases vs. Time',
        'regional_comparisons': 'Regional Comparisons',
        'cases_continents':'Cases By Continents',
        'deaths_continents':'Deaths By Continents'
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
        'gdp_vs_time': '实际 GDP 增长率与时间',
        'death_vs_time': '死亡与时间',
        'unemployment_vs_time': '失业率与时间',
        'stringency_time':'严格性指数与时间',
        'covid_time':'COVID-19 病例与时间',
        'case_comparison':'COVID-19 国家案例比较',
        'death_comparison':'COVID-19 国家死亡人数比较',
        'vaccinated_vs_time': '完全接种疫苗的人与时间',
        'global_cases_vs_time': '全球案例与时间',
        'global_vaccinated_vs_time': '全球病例与时间',
        'global_deaths_vs_time': '全球病例与时间',
        'regional_comparisons': '区域比较',
        'cases_continents':'大洲案例',
        'deaths_continents':'大陆的死亡'
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
        'gdp_vs_time': 'Tasa de crecimiento del PIB real frente al tiempo',
        'death_vs_time': 'Muerte y Tiempo',
        'unemployment_vs_time': 'Tasa de Desempleo vs. Tiempo',
        'stringency_time':'Índice de astringencia vs. tiempo',
        'covid_time':'Casos de COVID-19 versus tiempo',
        'case_comparison':'Comparación de casos de países de COVID-19',
        'death_comparison':'COVID-19 Número de países de comparación de muertes',
        'vaccinated_vs_time': 'Personas completamente vacunadas versus tiempo',
        'global_cases_vs_time': 'Casos Globales vs. Tiempo',
        'global_vaccinated_vs_time': 'Casos Globales vs. Tiempo',
        'global_deaths_vs_time': 'Casos Globales vs. Tiempo',
        'regional_comparisons': 'Comparaciones regionales',
        'cases_continents':'Casos Por Continentes',
        'deaths_continents':'Muertes Por Continentes'
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
        'gdp_vs_time' : 'Taux de croissance du PIB réel en fonction du temps',
        'death_vs_time' : 'La mort et le temps',
        'unemployment_vs_time' : 'Taux de chômage en fonction du temps',
        'stringency_time':'Indice de stringence en fonction du temps',
        'covid_time':'Cas de COVID-19 par rapport au temps',
        'case_comparison':'Comparaison des cas de COVID-19 par pays',
        'death_comparison':'Comparaison du nombre de décès par pays COVID-19',
        'vaccinated_vs_time' : 'Personnes entièrement vaccinées par rapport au temps',
        'global_cases_vs_time' : 'cas globaux par rapport au temps',
        'global_vaccinated_vs_time' : 'Cas globaux par rapport au temps',
        'global_deaths_vs_time' : 'Cas mondiaux par rapport au temps',
        'regional_comparisons' : 'Comparaisons régionales',
        'cases_continents':'Cas par continents',
        'deaths_continents':'Décès par continents'
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
        'gdp_vs_time': 'Reale BIP-Wachstumsrate vs. Zeit',
        'death_vs_time': 'Tod und Zeit',
        'unemployment_vs_time': 'Arbeitslosenquote vs. Zeit',
        'stringency_time':'Stringenzindex vs. Zeit',
        'covid_time': 'COVID-19-Fälle vs. Zeit',
        'case_comparison':'COVID-19 Länderfallvergleich',
        'death_comparison':'COVID-19-Ländervergleich der Zahl der Todesfälle',
        'vaccinated_vs_time': 'Vollständig geimpfte Personen vs. Zeit',
        'global_cases_vs_time': 'Globale Fälle vs. Zeit',
        'global_vaccinated_vs_time': 'Globale Fälle vs. Zeit',
        'global_deaths_vs_time': 'Globale Fälle vs. Zeit',
        'regional_comparisons': 'Regionale Vergleiche',
        'cases_continents': 'Fälle nach Kontinenten',
        'deaths_continents': 'Todesfälle nach Kontinenten'
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
        'gdp_vs_time': '실질 GDP 성장률 대 시간',
        'death_vs_time': '죽음과 시간',
        'unemployment_vs_time': '실업률 대 시간',
        'stringency_time': '엄격도 지수 대 시간',
        'covid_time': 'COVID-19 사례 대 시간',
        'case_comparison': 'COVID-19 국가 사례 비교',
        'death_comparison': 'COVID-19 국가 사망자 수 비교',
        'vaccinated_vs_time': '완전히 예방접종을 받은 사람과 시간',
        'global_cases_vs_time': '글로벌 케이스 대 시간',
        'global_vaccinated_vs_time': '글로벌 사례 대 시간',
        'global_deaths_vs_time': '글로벌 사례 대 시간',
        'regional_comparisons': '지역 비교',
        'cases_continents': '대륙별 사례',
        'deaths_continents': '대륙별 죽음' 
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
        'gdp_vs_time': '実質GDP成長率対時間',
        'death_vs_time': '死と時間',
        'unemployment_vs_time': '失業率と時間',
        'stringency_time': 'ストリンジェンシーインデックスと時間',
        'covid_time':'COVID-19ケースvs.時間',
        'case_comparison':'COVID-19カントリーケース比較',
        'death_comparison':'COVID-19国の死亡数の比較',
        'vaccinated_vs_time': '完全にワクチン接種された人と時間',
        'global_cases_vs_time': 'グローバルケースと時間',
        'global_vaccinated_vs_time': 'グローバルケースと時間',
        'global_deaths_vs_time': 'グローバルケースvs.時間',
        'regional_comparisons': '地域比較',
        'cases_continents':'地域別のケース',
        'deaths_continents':'地域別の死亡'
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
        'gdp_vs_time': 'वास्तविक जीडीपी विकास दर बनाम समय',
        'death_vs_time': 'डेथ बनाम टाइम',
        'unemployment_vs_time': 'बेरोजगारी दर बनाम समय',
        'stringency_time': 'स्ट्रिंगेंसी इंडेक्स बनाम टाइम',
        'covid_time':'COVID-19 मामले बनाम समय',
        'case_comparison':'COVID-19 देश के मामले की तुलना',
        'death_comparison':'COVID-19 देश में हुई मौतों की संख्या की तुलना',
        'vaccinated_vs_time': 'पूरी तरह से टीकाकरण वाले व्यक्ति बनाम समय',
        'global_cases_vs_time': 'वैश्विक मामले बनाम समय',
        'global_vaccinated_vs_time': 'वैश्विक मामले बनाम समय',
        'global_deaths_vs_time': 'वैश्विक मामले बनाम समय',
        'regional_comparisons': 'क्षेत्रीय तुलना',
        'cases_continents':'केस बाय कॉन्टिनेंट्स',
        'deaths_continents':'डेथ बाय कॉन्टिनेंट्स'
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
    case 'gdp_vs_time':
      return phrases?.gdp_vs_time
    case 'death_vs_time':
        return phrases?.death_vs_time    
    case 'unemployment_vs_time':
      return phrases?.unemployment_vs_time
    case 'stringency_time':
      return phrases?.stringency_time
    case 'covid_time':
        return phrases?.covid_time    
    case 'case_comparison':
      return phrases?.case_comparison
    case 'death_comparison':
      return phrases?.death_comparison
    case 'vaccinated_vs_time':
        return phrases?.vaccinated_vs_time    
    case 'global_cases_vs_time':
      return phrases?.global_cases_vs_time
    case 'global_vaccinated_vs_time':
      return phrases?.global_vaccinated_vs_time
    case 'global_deaths_vs_time':
        return phrases?.global_deaths_vs_time    
    case 'regional_comparisons':
      return phrases?.regional_comparisons
    case 'cases_continents':
      return phrases?.cases_continents
    case 'deaths_continents':
        return phrases?.deaths_continents    
  }
};