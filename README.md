# Electron-Editor-De-Texto
 
Aplicação para editar textos contruida com Electron js integrado com TypeScript.

Para iniciar a aplicação , compilar os arquivos typeScript e rodar a aplicação temos que inserir os seguintes comandos:
  
    npm init 
    npm i electron && typescript && copyfiles
    
    npm start
    
O script start roda o comando compile que cria uma pasta chamada build , nela estaram os arquivos javascript , html e css,
 o outro comando executa o electron na pasta build.

    └───src
     ├───pages
     │   └───index
     └───scripts
     
Dentro da pasta src temos as pastas pages e scripts , em pages temos uma pasta relativa a cada pagina,
nesta pasta especifica temos arquivos css , html e typescript, ja na pasta scripts temos todo o codigo que ira rodar 
junto ao processo main do electron.

Meus agradecimentos, facam bom uso :)
