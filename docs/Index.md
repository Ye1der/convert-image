# Como funciona el proyecto?

Todo el código del proyecto esta hecho con **TypeScript** en nodejs

El proyecto entero gira al rededor de la biblioteca **Sharp**, la cual es la que cambia el formato de las imágenes, en si el proyecto es un cli que facilita el uso de esa biblioteca.

En el proyecto también se usa **Inquirer** y **Ora**, las cuales son otras dos librerías importantes ya que son las encargadas de mostrar los menus al usuario (inquirer) junto a los momentos de carga y mensajes de error o éxito (ora)

El proyecto tiene dos opciones principales, convertir imágenes o convertir rodas las imágenes de una carpeta, esas funciones están en los archivos **files.ts** y **folder.ts**, las cuales hacen uso de la función convertImage que esta en el archivo **convertImage.ts** este es el archivo mas importante del proyecto, ya que es donde se convierten las imágenes

El proyecto también tiene algunas pruebas unitarias escritas con **ViTest** y **TypeScript** las cuales prueban las funciones de convertir varias imágenes, convertir todas las imágenes de una carpeta y la función de convertImage, el test más importante que pase es el de la función convertImage, los otros no son tan importantes ya que con algunos cambios simples en la estructura del proyecto se podrían romper.
