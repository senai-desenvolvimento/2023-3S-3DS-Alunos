Feature: Fluxo do Usuário na Aplicação de Música

  Scenario: Visualizar playlists e executar uma música
    Then eu vejo o header "Good morning"
    And eu vejo uma lista de playlists
    When eu clico na primeira playlist
    Then eu vejo uma lista de músicas
    And eu clico na primeira música
    Then a música começa a tocar

  Scenario: Navegar entre playlists e executar outra música
    When eu volto para a listagem de playlists
    And eu clico na segunda playlist
    Then eu vejo uma lista de músicas
    And eu clico na primeira música
    Then a música começa a tocar

  Scenario: Procurar e favoritar uma música
    Given que eu estou na tela de Pesquisa
    When eu procuro por uma música "Nome da Música"
    Then eu vejo uma lista de resultados de músicas
    When eu clico na primeira música dos resultados
    Then a música começa a tocar
    And eu clico para favoritar a música
    Then a música é adicionada à lista de favoritos

  Scenario: Verificar música favoritada na tela de Favoritos
    Given que eu estou na tela de Favoritos
    Then eu vejo uma lista de músicas favoritas
    And eu vejo a música favoritada na lista
    When eu clico na música favoritada
    Then a música começa a tocar
