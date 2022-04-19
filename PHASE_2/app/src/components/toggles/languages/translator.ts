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
  }
};