Feature: Registration cinema
    
    Scenario: Should reserve ticket and get a code
        Given user is on page "https://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose movie time
        When user choose a seat
        When user click on the reserve button
        Then user get the text "Вы выбрали билеты:"
        When user click on the get code button
        Then user get the code and text "Электронный билет"
    
    Scenario: Should reserve 2 ticket and get a code
        Given user is on page "https://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose movie time
        When user choose a seat
        When user choose a seat
        When user click on the reserve button
        Then user get the text "Вы выбрали билеты:"
        When user click on the get code button
        Then user get the code and text "Электронный билет"    


    Scenario: Selecting a occupied seat
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose movie time
        When user choose an occupied place
        Then button for reserving is inactive "true"